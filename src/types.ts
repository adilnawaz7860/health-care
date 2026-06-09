export interface Doctor {
  id: string;
  name: string;
  name_hi: string;
  role: string;
  role_hi: string;
  qualification: string;
  qualification_hi: string;
  department: string;
  department_hi: string;
  experience: string;
  experience_hi: string;
  image: string;
  rating: number;
  social: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  name_hi: string;
  desc: string;
  desc_hi: string;
  benefits: string[];
  benefits_hi: string[];
  procedure: string;
  procedure_hi: string;
  specialistId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  name_hi: string;
  rating: number;
  review: string;
  review_hi: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  category_hi: string;
  title: string;
  title_hi: string;
  image: string;
}

export interface NewsItem {
  id: string;
  category: string;
  category_hi: string;
  date: string;
  author: string;
  readTime: string;
  title: string;
  title_hi: string;
  excerpt: string;
  excerpt_hi: string;
}

export interface FAQItem {
  id: string;
  question: string;
  question_hi: string;
  answer: string;
  answer_hi: string;
}
