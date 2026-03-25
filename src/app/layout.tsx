import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/big-shoulders-display/400.css";
import "@fontsource/big-shoulders-display/900.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinetic Curator | Portfolio",
  description: "Personal Portfolio - Editorial Style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark antialiased"
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
