import siteJson from "@/data/site.json";
import servicesJson from "@/data/services.json";
import projectsJson from "@/data/projects.json";
import processJson from "@/data/process.json";
import statsJson from "@/data/stats.json";
import techJson from "@/data/tech.json";
import faqJson from "@/data/faq.json";
import type { FaqItem, ProcessStep, Project, Service, SiteConfig, Stat } from "./types";

export const site = siteJson as SiteConfig;
export const services = servicesJson as Service[];
export const projects = projectsJson as Project[];
export const processSteps = processJson as ProcessStep[];
export const stats = statsJson as Stat[];
export const tech = techJson as { row1: string[]; row2: string[] };
export const faqs = faqJson as FaqItem[];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function relatedServices(slug: string, count = 3): Service[] {
  const idx = services.findIndex((s) => s.slug === slug);
  if (idx === -1) return services.slice(0, count);
  const out: Service[] = [];
  for (let i = 1; out.length < count && i <= services.length; i++) {
    out.push(services[(idx + i) % services.length]);
  }
  return out;
}
