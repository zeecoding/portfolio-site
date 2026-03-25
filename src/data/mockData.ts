export interface Service {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  isExpanded?: boolean;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const mockData = {
  hero: {
    firstName: "Julian",
    lastName: "Vortex",
    tags: ["branding", "creative"],
    description: "Synthesizing editorial rigor with digital dynamism to craft interfaces that command attention and drive conversion.",
    highlights: [
      "7+ Years Experience",
      "Award-Winning Portfolio",
      "California, USA Based"
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6JnHTm4zboNtjTV6slg5FjMh_ludYe0LbbLHsmA6blfnrOP4fDs8OEyjVqmH1PfQyo9s7KcP2Hkf4OgHOLlwNZwRWp45fNYhWct4plTmRJBgDQyS8I0rOJ5jfhDRJ7VvNKNO6V0Sz4a7EFzj9mbSjR_5UJskScXAVMPhsG7IvFsFpwQFb_E6XRVudCKCs7NomCjXdI_Yx9M_9-VyPQtJp_eMqT1k_n0lXA1ERmbmw7ZurLrly7wYB1Q9-GUIgSXUJKThPTvZ6wAM"
  },
  services: [
    {
      id: "s1",
      title: "Branding",
      isExpanded: false
    },
    {
      id: "s2",
      title: "Design",
      description: "Crafting pixel-perfect user interfaces and cohesive design systems that scale. From low-fidelity wireframes to high-fidelity interactive prototypes.",
      tags: ["UI/UX", "Mobile First", "SaaS"],
      isExpanded: true
    },
    {
      id: "s3",
      title: "Marketing",
      isExpanded: false
    },
    {
      id: "s4",
      title: "Code",
      isExpanded: false
    }
  ],
  stats: [
    { id: "st1", value: "07", label: "Years Experience" },
    { id: "st2", value: "5.00", label: "Client Rating" },
    { id: "st3", value: "120+", label: "Projects Completed" },
    { id: "st4", value: "03", label: "Countries Served" }
  ],
  portfolio: [
    {
      id: "p1",
      title: "Aura Stream",
      category: "Mockup Design",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeBDJ5Y5uj6ZPSt34WiEJFcElXqf3FiB8zCo-Osphsr5_bdT3SIbiMTozFCoj4om4k3BRwTN_aCFuSbBmDLPO1XdW9nXdYBzcEZzhtO6RaS1C3KT45oZRfbcHjH-Pa7UFiXDNb6Bl_4k9Y5FEQfCx1JiIxfod8rl1qPXZ9aeMafpXrKEvhHktWyz2svGAgnoCck5etMQJ3gyjhHZ10wpEKtVYwoUjJ9nl0FL_55wNVgyonOOQvx_axFtvMboTl-5FZnv6xvb1RDOI"
    },
    {
      id: "p2",
      title: "Digital Monolith",
      category: "Book Cover",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVuLdTplBf2nszqsavnswSukn_n9yv6rdmbHTfe-pyFXm7CyB0eI6Lg7HC4kIfo5ZIZtQFqOY7RlS_pVbjj_5Rc3lSRam1PxtT3GGm2ghlMy9mF6jXkSViG-7-PRTJQ73X9EKp89SBx18cKnn4lWQwx1ptBYEzgNWUpojiLKo_lJxAiA52lhfrnWEsvV7sekOudVpnXQDG8yY1V3zRITBFOG0sISUU5CcVidopzl7uSsTZrRnehUQBK_McBgU2IWsT4mBDPkMEeSU"
    },
    {
      id: "p3",
      title: "Vortex Sans",
      category: "Font Design",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfagRNz1txEqEZB3MJDK4DwRnKvbn_EnbSRnLEL9BrCToPPSL1QAyNkPjakSS6mMs7IYH2tjkbR15MZzZiM659DiLPgYmT6HjqAjatfHlptUAms1-z3kDc7vgDpSmeeDXo9VyO_Jjptk68uUHpQIlzwGjVf1UtYAYH6lup_FqgCgc0fBFd7xRF6J0kQFKKIEiPoqWcQnFsiIfuaJGLboDdUeZo2rJvuwe04TAqO_PpP_0SxZVYx1PQsWL6sdPQF9_7vBjPr5W1Pro"
    }
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Julian transformed our brand from a startup into a market leader in months.",
      author: "Elena Rossi",
      role: "CEO, Modu Form",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC05hNuO7fX-gnD0pula1yrQKfd7BK9OiKp4pV9ZVUT95XaTsH-db9uYBndeQ_c-hSmxHOAxYZPJ7e2PgijTVYkLS269lQzTPFkoPeH0rZGTQ5yFhc91IfASCXdHThXtVyQfphaVhorjGY-x7myNjsi-gQaVGjFauwRhgCKjT4lJgsaRNSP5-1Nn8v2xm7ZVGELwl20qN6NzckPdre9j5ivB3oLoxr5goa3LU0E654s95hYJMxMcZA6eNJBe5BYwgv3ydaKD2VASQ"
    },
    {
      id: "t2",
      quote: "The technical insight and visual flair Julian brings is unmatched.",
      author: "Marcus Chen",
      role: "Director of Product",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIvqmaJXpVI0uf41K4RoWhELEDZVYhdkVLvkXNKm6IbyjMUg1WQu2xH8tN0y3qB4PNKSlLXOdkMff_Zzl7Fqqo8hHcIER3092cCipdmiI_G0bAdI-0kkyiZeuzsy6zydXYzY7BtvL_848TEEjYgiIOTS7WzkRMgdSME8aqtuJTITbyMsZPXlYbe1zGlso0dcU8YhTeLb_9DtdfudnJnV_bKAIzNJpaKQHXR5vuT-vs9zFPczd7KIfr9KWBa4vGReBuh9oyphdxqQ0"
    }
  ],
  faqs: [
    {
      id: "f1",
      question: "What is your typical project timeline?",
      answer: "Most branding and UI projects range from 4 to 8 weeks, depending on complexity and scope. We prioritize quality over speed, ensuring every pixel serves a purpose."
    },
    {
      id: "f2",
      question: "Do you provide full-stack development?",
      answer: "While my focus is UI/UX and Creative Direction, I work closely with a network of elite developers to bring complex digital products to life seamlessly."
    }
  ],
  contact: {
    status: "Open for select collaborations 2024",
    email: "hello@kineticcurator.design",
    location: "San Francisco, CA"
  }
};
