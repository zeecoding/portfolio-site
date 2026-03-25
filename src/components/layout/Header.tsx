"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (isScrolled) {
      gsap.to(headerRef.current, {
        width: "90%",
        top: "20px",
        borderRadius: "100px",
        padding: "0 20px",
        borderColor: "rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        duration: 1.2,
        ease: "power4.inOut",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.7)",
      });
      gsap.to(containerRef.current, {
        paddingTop: "14px",
        paddingBottom: "14px",
        duration: 1.2,
        ease: "power4.inOut",
      });
    } else {
      gsap.to(headerRef.current, {
        width: "100%",
        top: "0px",
        borderRadius: "0px",
        padding: "0 0px",
        borderColor: "transparent",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        duration: 1.2,
        ease: "power4.inOut",
        boxShadow: "0 0px 0px rgba(0,0,0,0)",
      });
      gsap.to(containerRef.current, {
        paddingTop: "24px",
        paddingBottom: "24px",
        duration: 1.2,
        ease: "power4.inOut",
      });
    }
  }, [isScrolled]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav 
      ref={headerRef}
      className="fixed left-1/2 -translate-x-1/2 z-[100] backdrop-blur-xl border border-transparent overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1920px] mx-auto transition-all"
      >
        <Link href="/" className="text-2xl md:text-3xl headline-condensed text-on-surface hover:text-primary transition-colors">
          KINETIC CURATOR
        </Link>
        <div className="hidden lg:flex gap-12 lg:gap-16">
          <Link className="text-on-surface font-black headline-condensed text-lg hover:text-primary transition-all" href="#portfolio">Work</Link>
          <Link className="text-on-surface font-black headline-condensed text-lg hover:text-primary transition-all" href="#services">Services</Link>
          <Link className="text-on-surface font-black headline-condensed text-lg hover:text-primary transition-all" href="#about">About</Link>
          <Link className="text-on-surface font-black headline-condensed text-lg hover:text-primary transition-all" href="#faq">FAQ</Link>
          <Link className="text-on-surface font-black headline-condensed text-lg hover:text-primary transition-all" href="#contact">Contact</Link>
        </div>
        <div className="hidden lg:block">
          <Button className="rounded-full px-8 py-6 font-black headline-condensed text-lg hover:bg-white hover:text-black transition-all cursor-pointer">
            Hire Me
          </Button>
        </div>
        
        {/* Mobile menu */}
        <div className="lg:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="text-on-surface hover:text-primary p-2">
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface/95 backdrop-blur-2xl border-l-white/10 p-0 flex flex-col justify-center items-center gap-12">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <SheetDescription className="sr-only">Navigation links for mobile devices</SheetDescription>
              <div className="flex flex-col items-center gap-10">
                <Link onClick={closeMobileMenu} className="text-on-surface font-black headline-condensed text-4xl hover:text-primary transition-all" href="#portfolio">Work</Link>
                <Link onClick={closeMobileMenu} className="text-on-surface font-black headline-condensed text-4xl hover:text-primary transition-all" href="#services">Services</Link>
                <Link onClick={closeMobileMenu} className="text-on-surface font-black headline-condensed text-4xl hover:text-primary transition-all" href="#about">About</Link>
                <Link onClick={closeMobileMenu} className="text-on-surface font-black headline-condensed text-4xl hover:text-primary transition-all" href="#faq">FAQ</Link>
                <Link onClick={closeMobileMenu} className="text-on-surface font-black headline-condensed text-4xl hover:text-primary transition-all" href="#contact">Contact</Link>
              </div>
              <Button onClick={closeMobileMenu} className="rounded-full px-12 py-8 mt-4 font-black headline-condensed text-2xl hover:bg-white hover:text-black transition-all cursor-pointer">
                Hire Me
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
