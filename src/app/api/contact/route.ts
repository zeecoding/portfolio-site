import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── In-memory rate limiter: 3 requests per IP per 10 minutes ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // blocked
  }

  record.count += 1;
  return true; // allowed
}

// ── Strip HTML/script tags from a string ──
function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

// ── Basic email format validation ──
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Content-Type guard
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 }
    );
  }

  // 2. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  // 3. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("message" in body)
  ) {
    return NextResponse.json(
      { error: "name, email, and message are required." },
      { status: 400 }
    );
  }

  const { name, email, message } = body as Record<string, unknown>;

  // 4. Type checks
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "name, email, and message must be strings." },
      { status: 400 }
    );
  }

  // 5. Validation
  if (!name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (name.length > 100) {
    return NextResponse.json(
      { error: "Name must be 100 characters or fewer." },
      { status: 400 }
    );
  }
  if (!email.trim()) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json(
      { error: "Email must be 254 characters or fewer." },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!message.trim()) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 }
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "Message must be 2000 characters or fewer." },
      { status: 400 }
    );
  }

  // 6. Sanitize inputs
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safeMessage = sanitize(message);

  // 7. Send email via Nodemailer + Gmail SMTP
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: safeEmail,
      subject: `New message from ${safeName}`,
      text: [
        `Name    : ${safeName}`,
        `Email   : ${safeEmail}`,
        `Message : ${safeMessage}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    // Never expose raw error to the client
    return NextResponse.json(
      { error: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
}
