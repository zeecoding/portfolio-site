"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mockData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface HeroSectionProps {
  readonly heroData: typeof mockData.hero;
}

export const HeroSection = ({ heroData }: HeroSectionProps) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial states for animation bounds
    gsap.set(".hero-title-line", { yPercent: 120, autoAlpha: 0, rotateX: 20 });
    gsap.set(".hero-image", { scale: 1.3, autoAlpha: 0, filter: "grayscale(100%) blur(20px)" });
    gsap.set(".hero-fade-up", { y: 60, autoAlpha: 0 });

    tl.to(".hero-image", {
      scale: 1,
      autoAlpha: 0.4,
      filter: "grayscale(100%) blur(0px)",
      duration: 2.5,
      ease: "power2.out"
    })
    .to(".hero-title-line", {
      yPercent: 0,
      autoAlpha: 1,
      rotateX: 0,
      duration: 1.5,
      stagger: 0.2
    }, "-=2.0")
    .to(".hero-fade-up", {
      y: 0,
      autoAlpha: 1,
      duration: 1.2,
      stagger: 0.15
    }, "-=1.2");

  }, { scope: container });

  return (
    <header ref={container} className="relative min-h-screen lg:min-h-[1126px] flex items-center justify-center overflow-hidden py-32 px-6 bg-surface text-on-surface perspective-[1000px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[819px] z-0 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-image w-full h-full object-cover grayscale rounded-lg"
          alt="close-up studio portrait"
          src={heroData.heroImage}
        />
      </div>
      <div className="relative z-10 max-w-[1600px] w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 editorial-overlap">
          <h1 className="text-[25vw] md:text-[18vw] leading-[0.75] headline-condensed -mb-[4vw] perspective-[1000px]">
            <div className="overflow-hidden pb-4">
              <div className="hero-title-line origin-bottom">{heroData.firstName}</div>
            </div>
            <div className="overflow-hidden pb-4">
              <div className="hero-title-line origin-bottom inline-block ml-[4vw]">{heroData.lastName}</div>
            </div>
          </h1>
        </div>
        <div className="col-span-12 lg:col-start-7 lg:col-span-5 editorial-overlap mt-12 lg:-mt-12">
          <div className="floating-card space-y-8 hero-fade-up">
            <div className="flex gap-4">
              {heroData.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant={i === 0 ? "default" : "secondary"}
                  className={`px-5 py-1 text-xs headline-condensed tracking-[0.2em] rounded-full uppercase ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary-container text-white"
                    }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xl md:text-3xl elegant-body leading-relaxed text-white/90 italic">
              {heroData.description}
            </p>
            <button className="group flex items-center gap-6 bg-white text-black px-10 py-5 rounded-full headline-condensed text-xl md:text-2xl hover:bg-primary hover:text-white transition-all cursor-pointer">
              Let&apos;s Talk
              <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 mt-12 lg:mt-0 flex flex-col justify-end">
          <div className="border-l-4 border-primary pl-6 space-y-1 py-4 text-xs lg:text-sm headline-condensed tracking-[0.3em] opacity-60 uppercase hero-fade-up">
            {heroData.highlights.map((highlight, index) => (
              <p key={index}>{highlight}</p>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
