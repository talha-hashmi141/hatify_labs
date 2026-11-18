import siteJson from "@/data/site.json";
import servicesJson from "@/data/services.json";
import projectsJson from "@/data/projects.json";
import processJson from "@/data/process.json";
import faqJson from "@/data/faq.json";
import testimonialsJson from "@/data/testimonials.json";
import clientsJson from "@/data/clients.json";
import achievementsJson from "@/data/achievements.json";
import capabilitiesJson from "@/data/capabilities.json";
import type {
  Achievement,
  CapabilityGroup,
  Client,
  FaqItem,
  Metric,
  ProcessStep,
  Project,
  Service,
  ServiceGroup,
  SiteConfig,
  Testimonial,
} from "./types";

export const site = siteJson as SiteConfig;
export const services = servicesJson as Service[];
export const projects = projectsJson as Project[];
export const processSteps = processJson as ProcessStep[];
export const faqs = faqJson as FaqItem[];
export const testimonials = testimonialsJson as Testimonial[];
export const clients = clientsJson as Client[];
export const achievements = achievementsJson as Achievement[];
export const capabilities = capabilitiesJson as CapabilityGroup[];

/* ── Placeholder visibility ─────────────────────────────────────────────── */

export const showPlaceholders = site.content.showPlaceholders;

export const isVerifiedMetric = (m: Metric) => m.verified && Boolean(m.value);
export const isApprovedTestimonial = (t: Testimonial) => t.approved && Boolean(t.quote && t.author);
export const isApprovedClient = (c: Client) => c.approved && Boolean(c.name);

/** Items that should be rendered: verified ones always, pending ones only while placeholders are on. */
export function visible<T>(items: T[], isReal: (item: T) => boolean): T[] {
  return showPlaceholders ? items : items.filter(isReal);
}

/** Social links that have a verified URL. */
export const verifiedSocials = site.socials.filter((s): s is { label: string; href: string } => Boolean(s.href));

export const linkedin = verifiedSocials.find((s) => s.label === "LinkedIn")?.href ?? null;

export const contactEmail = site.contact.email.verified ? site.contact.email.value : null;

/* ── Services ───────────────────────────────────────────────────────────── */

export const serviceGroups: ServiceGroup[] = ["AI & Intelligence", "Engineering", "Data & Security", "Operations & Design"];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function relatedServices(slug: string, count = 3): Service[] {
  const current = getService(slug);
  const sameGroup = services.filter((s) => s.slug !== slug && s.tag === current?.tag);
  const others = services.filter((s) => s.slug !== slug && s.tag !== current?.tag);
  return [...sameGroup, ...others].slice(0, count);
}

/* ── Projects ───────────────────────────────────────────────────────────── */

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

export function projectsForService(slug: string): Project[] {
  return projects.filter((p) => p.services.includes(slug));
}

export function adjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function getTestimonial(id?: string): Testimonial | undefined {
  return id ? testimonials.find((t) => t.id === id) : undefined;
}

export function clientLabel(p: Project): string | null {
  return p.clientApproved && p.client ? p.client : null;
}
