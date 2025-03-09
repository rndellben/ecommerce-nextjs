export interface Testimonial {
  name: string;
  location: string;
  text: string;
  avatar: string;
}

export interface HeroSection {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
}

export interface SpecialOffer {
  text: string;
  code: string;
  discount: string;
}

export interface NewsletterSection {
  title: string;
  description: string;
  buttonText: string;
  placeholder: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "The quality of products is outstanding. I'm a regular customer and never been disappointed.",
    avatar: "/avatar1.jpg"
  },
  {
    name: "Mark Thompson",
    location: "London, UK",
    text: "Excellent customer service and fast shipping. Highly recommended!",
    avatar: "/avatar2.jpg"
  },
  {
    name: "Emily Chen",
    location: "Toronto, Canada",
    text: "Love the variety of products and the user-friendly website. Will shop again!",
    avatar: "/avatar3.jpg"
  }
];

export const heroSection: HeroSection = {
  title: "Discover Your Style",
  description: "Explore our curated collection of premium products designed for those who appreciate quality and style.",
  buttonText: "Shop Now",
  backgroundImage: "/hero.jpg"
};

export const specialOffer: SpecialOffer = {
  text: "Special Offer: Get 20% off on your first purchase with code",
  code: "WELCOME20",
  discount: "20%"
};

export const newsletterSection: NewsletterSection = {
  title: "Stay Updated",
  description: "Subscribe to our newsletter for exclusive offers and updates.",
  buttonText: "Subscribe",
  placeholder: "Enter your email"
}; 