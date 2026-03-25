import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { EditorialContent } from "@/components/sections/EditorialContent";
import { mockData } from "@/data/mockData";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection heroData={mockData.hero} />
        <EditorialContent 
          servicesData={mockData.services} 
          statsData={mockData.stats} 
          testimonialsData={mockData.testimonials} 
          faqsData={mockData.faqs} 
          contactData={mockData.contact} 
        />
      </main>
      <Footer />
    </>
  );
}
