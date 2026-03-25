"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { mockData } from "@/data/mockData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface PortfolioGridProps {
  readonly portfolioData: typeof mockData.portfolio;
}

export const PortfolioGrid = ({ portfolioData }: PortfolioGridProps) => {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const articles = gsap.utils.toArray(".portfolio-article");
    
    articles.forEach((article: any) => {
      const content = article.querySelector(".portfolio-content");
      const img = article.querySelector(".portfolio-img");

      if (img) {
        gsap.fromTo(img,
          { scale: 1.15, transformOrigin: "center" },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: article,
              start: "top bottom",
              end: "top top",
              scrub: true
            }
          }
        );
      }

      if (content) {
        gsap.fromTo(content,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: article,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-surface pb-48" id="portfolio">
      {portfolioData.map((item, index) => {
        const isLeftAligned = index % 2 === 0;
        return (
          <article
            key={item.id}
            className="sticky top-0 min-h-screen py-32 px-6 flex items-center justify-center bg-surface overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
          >
            {index % 3 === 0 ? (
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="portfolio-img w-full h-full object-cover grayscale brightness-50"
                  alt={item.title}
                  src={item.imageUrl}
                />
              </div>
            ) : (
              <div
                className={`absolute z-0 overflow-hidden rounded-lg ${index % 3 === 1 ? "w-[40vw] h-[614px] right-[5vw] top-[102px]" : "left-0 bottom-0 w-full h-[819px] grayscale opacity-30"
                  }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="portfolio-img w-full h-full object-cover" alt={item.title} src={item.imageUrl} />
              </div>
            )}

            <div
              className={`portfolio-content relative z-10 max-w-[1600px] w-full grid grid-cols-12 items-center ${index % 3 === 2 ? "items-end" : ""
                }`}
            >
              <div
                className={`col-span-12 editorial-overlap ${index % 3 === 0 ? "md:col-span-7" : index % 3 === 1 ? "md:col-start-2 md:col-span-8" : "md:col-start-4 md:col-span-8 text-right"
                  }`}
              >
                <span
                  className={`px-8 py-2 rounded-full headline-condensed text-lg tracking-[0.2em] mb-8 inline-block ${index % 3 === 1 ? "bg-secondary text-white" : "bg-primary text-white"
                    }`}
                >
                  {item.category}
                </span>
                <h3 className={`text-[12vw] md:text-[14vw] headline-condensed leading-[0.7] text-white ${index % 3 === 2 ? "mb-12" : ""}`}>
                  {item.title.split(" ").map((word, i) => (
                    <span key={i} className={index % 3 === 1 && i === 1 ? "inline-block ml-[4vw]" : ""}>
                      {word}
                      {i !== item.title.split(" ").length - 1 && <br />}
                    </span>
                  ))}
                </h3>
              </div>
              <div
                className={`col-span-12 mt-12 md:mt-24 ${index % 3 === 0 ? "md:col-start-9 md:col-span-4" : index % 3 === 1 ? "md:col-start-2 md:col-span-8" : "md:col-start-4 md:col-span-8 flex justify-end"
                  }`}
              >
                <button className={`flex items-center gap-8 group text-white cursor-pointer ${index % 3 === 2 ? "flex-row-reverse" : ""}`}>
                  <span
                    className={`w-32 h-32 rounded-full border-2 border-white flex items-center justify-center transition-all ${index % 3 === 1
                        ? "group-hover:bg-secondary group-hover:border-secondary"
                        : index % 3 === 2
                          ? "group-hover:bg-white group-hover:text-black"
                          : "group-hover:bg-primary group-hover:border-primary"
                      }`}
                  >
                    <span className="material-symbols-outlined text-5xl">north_east</span>
                  </span>
                  <span className={`text-3xl headline-condensed tracking-widest ${index % 3 === 2 ? "text-right" : "text-left"}`}>
                    View
                    <br />
                    Case Study
                  </span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};
