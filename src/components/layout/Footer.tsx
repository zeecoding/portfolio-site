import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
        <div className="text-4xl headline-condensed text-white">KINETIC CURATOR</div>
        <div className="flex flex-wrap justify-center gap-16">
          <Link className="text-white/40 hover:text-primary transition-colors headline-condensed text-lg tracking-[0.2em]" href="#">Instagram</Link>
          <Link className="text-white/40 hover:text-primary transition-colors headline-condensed text-lg tracking-[0.2em]" href="#">LinkedIn</Link>
          <Link className="text-white/40 hover:text-primary transition-colors headline-condensed text-lg tracking-[0.2em]" href="#">Dribbble</Link>
          <Link className="text-white/40 hover:text-primary transition-colors headline-condensed text-lg tracking-[0.2em]" href="#">Read.cv</Link>
        </div>
        <p className="elegant-body text-xs uppercase tracking-[0.3em] opacity-30 text-center md:text-right leading-loose">
          © 2024 Kinetic Curator. <br/>Built for Editorial Intelligence.
        </p>
      </div>
    </footer>
  );
};
