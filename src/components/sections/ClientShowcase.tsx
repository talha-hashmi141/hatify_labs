import Image from "next/image";
import { clients, isApprovedClient, visible } from "@/lib/data";
import { PlaceholderBadge } from "@/components/ui/Placeholder";

/** Client logo wall. Only approved clients render as real; others are placeholder slots (or hidden). */
export default function ClientShowcase() {
  const list = visible(clients, isApprovedClient);
  if (list.length === 0) return null;

  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-white/60 py-12 md:py-14">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h2 id="clients-title" className="mono-label">
            Client showcase
          </h2>
          <p className="text-sm text-muted">Teams we have built for, across government, healthcare, enterprise and SaaS</p>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {list.map((c, i) => {
            const real = isApprovedClient(c);
            return (
              <li key={c.name ?? `slot-${i}`}>
                {real ? (
                  <div className="flex h-20 items-center justify-center rounded-xl border border-line bg-white px-5">
                    {c.logo ? (
                      <Image src={c.logo} alt={c.name!} width={140} height={40} className="h-9 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                    ) : (
                      <span className="text-sm font-semibold text-ink">{c.name}</span>
                    )}
                  </div>
                ) : (
                  <div data-placeholder className="placeholder-slot flex h-20 flex-col items-center justify-center gap-1.5 px-3">
                    <PlaceholderBadge>Client logo</PlaceholderBadge>
                    <span className="text-[11px] font-medium text-muted">{c.sector}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
