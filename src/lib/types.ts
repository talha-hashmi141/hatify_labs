export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface Service {
  slug: string;
  title: string;
  tag: string;
  icon: string;
  featured?: boolean;
  excerpt: string;
  description: string;
  features: ServiceFeature[];
  stack: string[];
  keywords: string[];
}

export interface ProjectOutcome {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  sector: string;
  summary: string;
  tags: string[];
  stack: string[];
  outcomes: ProjectOutcome[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface TrustBadge {
  icon: string;
  label: string;
}

export interface NextStep {
  step: string;
  title: string;
  desc: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  addressNote: string;
  founded: number;
  availability: string;
  keywords: string[];
  socials: SocialLink[];
  nav: NavLink[];
  trustBadges: TrustBadge[];
  nextSteps: NextStep[];
}
