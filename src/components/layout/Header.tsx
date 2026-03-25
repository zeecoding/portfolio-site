import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-500 bg-surface/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1920px] mx-auto">
        <div className="text-3xl headline-condensed text-on-surface">KINETIC CURATOR</div>
        <div className="hidden lg:flex gap-16">
          <Link className="text-primary font-black headline-condensed text-xl hover:opacity-70 transition-opacity" href="#">Work</Link>
          <Link className="text-on-surface font-black headline-condensed text-xl hover:opacity-70 transition-opacity" href="#">Services</Link>
          <Link className="text-on-surface font-black headline-condensed text-xl hover:opacity-70 transition-opacity" href="#">About</Link>
          <Link className="text-on-surface font-black headline-condensed text-xl hover:opacity-70 transition-opacity" href="#">FAQ</Link>
          <Link className="text-on-surface font-black headline-condensed text-xl hover:opacity-70 transition-opacity" href="#">Contact</Link>
        </div>
        <div className="hidden lg:block">
          <Button className="rounded-full px-8 py-6 font-black headline-condensed text-lg hover:bg-white hover:text-black transition-all cursor-pointer">
            Hire Me
          </Button>
        </div>
        
        {/* Mobile menu */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger className="text-on-surface hover:text-primary p-2">
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface border-l-white/10 p-0 flex flex-col justify-center items-center gap-12">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <SheetDescription className="sr-only">Navigation links for mobile devices</SheetDescription>
              <div className="flex flex-col items-center gap-10">
                <Link className="text-primary font-black headline-condensed text-4xl hover:opacity-70 transition-opacity" href="#">Work</Link>
                <Link className="text-on-surface font-black headline-condensed text-4xl hover:opacity-70 transition-opacity" href="#">Services</Link>
                <Link className="text-on-surface font-black headline-condensed text-4xl hover:opacity-70 transition-opacity" href="#">About</Link>
                <Link className="text-on-surface font-black headline-condensed text-4xl hover:opacity-70 transition-opacity" href="#">FAQ</Link>
                <Link className="text-on-surface font-black headline-condensed text-4xl hover:opacity-70 transition-opacity" href="#">Contact</Link>
              </div>
              <Button className="rounded-full px-12 py-8 mt-4 font-black headline-condensed text-2xl hover:bg-white hover:text-black transition-all cursor-pointer">
                Hire Me
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
