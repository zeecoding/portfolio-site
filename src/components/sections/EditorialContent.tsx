"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { mockData } from "@/data/mockData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface EditorialContentProps {
  readonly servicesData: typeof mockData.services;
  readonly statsData: typeof mockData.stats;
  readonly testimonialsData: typeof mockData.testimonials;
  readonly faqsData: typeof mockData.faqs;
  readonly contactData: typeof mockData.contact;
}

export const EditorialContent = ({
  servicesData,
  statsData,
  testimonialsData,
  faqsData,
  contactData,
}: EditorialContentProps) => {
  const container = useRef<HTMLDivElement>(null);
  const magneticButton = useRef<HTMLButtonElement>(null);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setFormStatus("error");
      } else {
        setFormStatus("success");
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
      setFormStatus("error");
    }
  };

  useGSAP(() => {
    // 1. Service Cards Reveal
    const serviceCards = gsap.utils.toArray(".service-card");
    serviceCards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 2. Stat Counters
    const statCounters = gsap.utils.toArray(".stat-counter");
    statCounters.forEach((counter: any) => {
      const target = parseFloat(counter.getAttribute("data-target")) || 0;
      const isDecimal = target % 1 !== 0;

      gsap.fromTo(counter,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: isDecimal ? 0.1 : 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          onUpdate() {
            if (isDecimal) {
              counter.innerHTML = Number(counter.innerHTML).toFixed(1);
            }
          }
        }
      );
    });

    // 3. Testimonial Reveals
    const testimonials = gsap.utils.toArray(".testimonial-item");
    testimonials.forEach((item: any) => {
      gsap.fromTo(item,
        { x: -50, opacity: 0, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: container });

  // Magnetic Button Effect
  useEffect(() => {
    const btn = magneticButton.current;
    if (!btn) return;

    const moveNode = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const resetNode = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener("mousemove", moveNode);
    btn.addEventListener("mouseleave", resetNode);

    return () => {
      btn.removeEventListener("mousemove", moveNode);
      btn.removeEventListener("mouseleave", resetNode);
    };
  }, []);

  return (
    <div ref={container}>
      {/* Services Section */}
      <section id="services" className="relative py-48 px-6 bg-surface-container-lowest overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover" alt="architectural portrait" src="/assets/skills-bg.png" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto">
          <div className="flex items-baseline gap-12 mb-32">
            <h2 className="text-[12vw] headline-condensed leading-none">Capabilities</h2>
            <p className="headline-condensed text-xl opacity-20 hidden md:block">04 / SERVICES</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                className={`editorial-overlap service-card ${idx === 0
                  ? "md:col-span-6 md:mt-24"
                  : idx === 1
                    ? "md:col-start-8 md:col-span-5 md:-mt-12"
                    : idx === 2
                      ? "md:col-span-5 md:-mt-24"
                      : "md:col-start-7 md:col-span-6 md:mt-12"
                  }`}
              >
                {service.isExpanded ? (
                  <div className="bg-primary p-12 md:p-16 rounded-[3rem] text-primary-foreground">
                    <h3 className="text-7xl md:text-9xl headline-condensed mb-8">{service.title}</h3>
                    <p className="text-xl md:text-2xl elegant-body leading-relaxed mb-10 opacity-90">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {service.tags?.map((tag, i) => (
                        <span key={i} className="border border-primary-foreground/30 px-5 py-2 rounded-full text-xs headline-condensed">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`floating-card p-12 transition-colors cursor-pointer group !rounded-none ${service.title === 'Branding' ? 'hover:bg-primary/10' :
                    service.title === 'Marketing' ? 'hover:bg-secondary-container/10' :
                      'hover:bg-white/10'
                    }`}>
                    <div className="flex justify-between items-center">
                      <h3 className={`text-7xl md:text-9xl headline-condensed transition-colors ${service.title === 'Branding' ? 'group-hover:text-primary' :
                        service.title === 'Marketing' ? 'group-hover:text-secondary-container' :
                          'group-hover:text-white'
                        }`}>{service.title}</h3>
                      <span className="material-symbols-outlined text-5xl group-hover:rotate-45 transition-transform">add</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-48 px-6 bg-white text-black relative overflow-hidden ">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12">
          <div className="col-span-12 md:col-span-10">
            <h2 className="text-[15vw] min-[768px]:text-[6vw]  min-[375px]:text-[11vw] headline-condensed leading-[0.9] mb-32">
              UI/UX Designer crafting intuitive, user-friendly experiences through{" "}
              <span className="text-primary italic">wireframing</span>,{" "}
              <span className="text-secondary italic">prototyping</span>, & visual design.
            </h2>
          </div>
          <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-12 pt-24 border-t border-black/10">
            {statsData.map((stat) => (
              <div key={stat.id} className="space-y-4">
                <span
                  className="text-8xl md:text-[10rem] headline-condensed leading-none stat-counter inline-block"
                  data-target={stat.value.replace(/[^0-9.]/g, '')}
                >
                  0
                </span>
                <span className="text-4xl md:text-[6rem] headline-condensed">{stat.value.replace(/[0-9.]/g, '')}</span>
                <span className="headline-condensed text-sm tracking-[0.4em] opacity-40 block uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section Interleaved */}
      <PortfolioGrid portfolioData={mockData.portfolio} />

      {/* Testimonials Section */}
      <section className="relative py-48 px-6 bg-surface-container overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4 mb-24 md:mb-0">
            <h2 className="headline-condensed text-xl tracking-[0.6em] opacity-40 mb-12 uppercase">Client Feedback</h2>
            <div className="w-32 h-[1px] bg-primary"></div>
          </div>
          <div className="col-span-12 md:col-start-5 md:col-span-8 space-y-48">
            {testimonialsData.map((testimonial, i) => (
              <div key={testimonial.id} className={`testimonial-item relative editorial-overlap ${i % 2 !== 0 ? "md:-ml-24" : ""}`}>
                <blockquote className="text-[2rem] max-w-[18.5rem] min-[375px]:max-w-[22rem] min-[425px]:text-[2.5rem] min-[425px]:max-w-[24rem] sm:text-3xl sm:max-w-4xl md:text-6xl headline-condensed leading-tight mb-16">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center gap-8">
                  <div className={`w-24 h-24 rounded-full overflow-hidden grayscale border-2 ${i === 0 ? "border-primary" : "border-secondary"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" alt={testimonial.author} src={testimonial.imageUrl} />
                  </div>
                  <div>
                    <span className="block headline-condensed text-3xl tracking-wider">{testimonial.author}</span>
                    <span className="elegant-body opacity-50 text-sm tracking-[0.2em] uppercase">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-48 px-6 bg-white text-black">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-9xl md:text-[15rem] headline-condensed text-center mb-32">Q&amp;A</h2>
          <Accordion className="w-full border-t border-black/10">
            {faqsData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-black/10 px-8 hover:bg-black/5 transition-all">
                <AccordionTrigger className="text-3xl md:text-5xl headline-condensed py-12 hover:no-underline [&[data-state=open]>svg]:rotate-45">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-12 text-xl md:text-2xl elegant-body opacity-70 max-w-3xl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen py-48 px-6 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover grayscale brightness-[0.15]" alt="contact background" src="/assets/skills-bg.png" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-7 editorial-overlap">
            <h2 className="text-[18vw] headline-condensed leading-[0.7] tracking-[-0.05em] mb-12 text-foreground">CONTACT</h2>
            <div className="space-y-4 elegant-body text-[0.85rem] max-w-[18rem] min-[375px]:max-w-[22rem] min-[425px]:text-base min-[425px]:max-w-[24rem] sm:text-xl sm:max-w-full opacity-60 tracking-[0.3em] uppercase">
              <p>{contactData.status}</p>
              <p>{contactData.email}</p>
              <p>{contactData.location}</p>
            </div>
          </div>
          <div className="col-span-8 col-start-1 left-[-8px] min-[375px]:col-span-8 min-[375px]:col-start-1 min-[425px]:col-span-9 min-[425px]:col-start-1 md:col-span-12 md:col-start-1 md:ml-0 lg:col-span-5 lg:col-start-auto lg:-ml-24 editorial-overlap">
            <div className="bg-white p-8 sm:p-12 md:p-20 rounded-[2rem] sm:rounded-[3rem] text-surface">
              <h3 className="text-5xl sm:text-6xl headline-condensed mb-8 sm:mb-16">Let&apos;s Talk</h3>
              {formStatus === "success" ? (
                <div className="py-16 text-center space-y-4">
                  <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
                  <p className="headline-condensed text-3xl text-surface">Message sent!</p>
                  <p className="elegant-body text-surface/60">I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-8 underline elegant-body text-surface/50 hover:text-surface transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-8 sm:space-y-12">
                  <div className="relative">
                    <Input
                      className="w-full border-0 border-b-2 border-black/10 py-4 sm:py-8 px-0 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-black/30 headline-condensed text-2xl sm:text-3xl bg-transparent"
                      placeholder="Full Name"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      maxLength={100}
                      required
                      disabled={formStatus === "sending"}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      className="w-full border-0 border-b-2 border-black/10 py-4 sm:py-8 px-0 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-black/30 headline-condensed text-2xl sm:text-3xl bg-transparent"
                      placeholder="Email"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      maxLength={254}
                      required
                      disabled={formStatus === "sending"}
                    />
                  </div>
                  <div className="relative">
                    <Textarea
                      className="w-full border-0 border-b-2 border-black/10 py-4 px-0 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-black/30 headline-condensed text-2xl sm:text-3xl bg-transparent resize-none min-h-[100px] sm:min-h-[120px]"
                      placeholder="Your Message"
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      maxLength={2000}
                      required
                      disabled={formStatus === "sending"}
                    />
                  </div>
                  {formError && (
                    <p className="elegant-body text-red-500 text-sm">{formError}</p>
                  )}
                  <button
                    ref={magneticButton}
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full bg-primary text-white py-6 sm:py-10 rounded-full headline-condensed tracking-[0.2em] sm:tracking-[0.4em] text-xl sm:text-2xl hover:bg-black transition-all shadow-2xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending" ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
