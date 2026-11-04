/* ──────────────────────────────────────────────────────────────────────────
   Content model
   ----------------------------------------------------------------------------
   Every piece of content that still needs to be supplied or verified by
   Hatify Labs is typed as `Pending<T>` (or carries `verified: false`).
   Components render those values as clearly marked placeholder slots, and
   `site.content.showPlaceholders` hides all of them at once for launch.
   ────────────────────────────────────────────────────────────────────────── */

/** A value that is either supplied (string) or still pending (null). */
export type Pending<T = string> = T | null;

export interface ServiceFeature {
  title: string;
  desc: string;
}

export type ServiceGroup = "AI & Intelligence" | "Engineering" | "Data & Security" | "Operations & Design";

export interface Service {
  slug: string;
  title: string;
  tag: ServiceGroup;
  icon: string;
  featured?: boolean;
  excerpt: string;
  description: string;
  features: ServiceFeature[];
  stack: string[];
  keywords: string[];
}

/** A metric only shows its value when `verified` is true and a value is set. */
export interface Metric {
  label: string;
  value: Pending;
  verified: boolean;
  /** Where the figure comes from (e.g. "Client analytics, Q3 2026"). Shown on hover/under the value. */
  source?: Pending;
  note?: string;
}

export interface ArchitectureLayer {
  name: string;
  nodes: string[];
}

export interface Architecture {
  summary: string;
  layers: ArchitectureLayer[];
  /** Short notes describing key decisions / data flow. */
  decisions: { title: string; desc: string }[];
}

export interface StackGroup {
  group: string;
  items: string[];
}

export interface ProjectMedia {
  /** Public path of a cover screenshot, e.g. "/work/erp/cover.png". null → branded placeholder. */
  cover: Pending;
  /** Captioned gallery slots. `src: null` renders a placeholder frame. */
  gallery: { src: Pending; caption: string }[];
}

export interface Project {
  slug: string;
  title: string;
  /** Client display name. null → "Client name pending". */
  client: Pending;
  /** True when the client has approved being named publicly. */
  clientApproved: boolean;
  sector: string;
  /** Short topic tags shown on project cards (e.g. "RBAC", "HIPAA"). */
  tags: string[];
  services: string[];
  year: Pending;
  engagement: Pending;
  featured?: boolean;
  summary: string;
  overview: string;
  problem: { summary: string; points: string[] };
  solution: { summary: string; points: string[] };
  architecture: Architecture;
  stack: StackGroup[];
  features: ServiceFeature[];
  results: Metric[];
  media: ProjectMedia;
  links: { live: Pending; caseStudyPdf?: Pending };
  testimonialId?: string;
}

export interface Testimonial {
  id: string;
  quote: Pending;
  author: Pending;
  role: Pending;
  company: Pending;
  projectSlug?: string;
  /** Must be true (written client approval on file) before it is shown as real. */
  approved: boolean;
}

export interface Client {
  name: Pending;
  sector: string;
  /** Public path to the logo file (SVG preferred). */
  logo: Pending;
  url?: Pending;
  approved: boolean;
}

export interface Achievement extends Metric {
  id: string;
}

export interface CapabilityGroup {
  title: string;
  icon: string;
  desc: string;
  items: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  deliverables: string[];
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
  /** null → link not verified yet; it is not rendered. */
  href: Pending;
}

export interface ContactChannel {
  label: string;
  value: Pending;
  href?: Pending;
  verified: boolean;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  headline: string;
  description: string;
  url: string;
  location: string;
  teamSize: string;
  /** Year the studio was founded, e.g. "2019". */
  founded: string;
  content: {
    /**
     * true  → unverified/pending content renders as visible placeholder slots
     *         (useful while content is being collected).
     * false → anything unverified is hidden entirely (use for public launch
     *         if real content has not arrived yet).
     */
    showPlaceholders: boolean;
  };
  contact: {
    email: ContactChannel;
    phone: ContactChannel;
    address: ContactChannel;
    responseTime: string;
  };
  socials: SocialLink[];
  nav: NavLink[];
  nextSteps: { step: string; title: string; desc: string }[];
  keywords: string[];
}
