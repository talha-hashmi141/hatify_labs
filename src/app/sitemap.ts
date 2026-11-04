import type { MetadataRoute } from "next";
import { projects, services, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("", 1),
    ...["/services", "/work", "/about", "/contact"].map((p) => entry(p, 0.8)),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.7)),
    ...projects.map((p) => entry(`/work/${p.slug}`, 0.7)),
  ];
}
