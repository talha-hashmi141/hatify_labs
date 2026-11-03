import { services } from "@/lib/data";
import { LogoMark } from "@/components/brand/Logo";
import Icon from "@/components/ui/Icon";

/** The 11 practice areas orbiting the Hatify Labs mark. Rings rotate slowly; icons stay upright. */
function Ring({ items, radius, duration, reverse }: { items: typeof services; radius: number; duration: number; reverse?: boolean }) {
  const spin = reverse ? "reverse" : "normal";
  const counter = reverse ? "normal" : "reverse";
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-royal/25"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        animation: `spin ${duration}s linear infinite ${spin}`,
      }}
    >
      {items.map((s, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={s.slug}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` }}
          >
            <div style={{ animation: `spin ${duration}s linear infinite ${counter}` }}>
              <span
                title={s.title}
                className="-ml-5 -mt-5 flex size-10 items-center justify-center rounded-xl border border-line bg-white text-royal shadow-[var(--shadow-soft)]"
              >
                <Icon name={s.icon} className="size-[18px]" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceOrbit() {
  const outer = services.slice(0, 6);
  const inner = services.slice(6);
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[380px] lg:block" aria-hidden>
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-electric/20 via-cyan/10 to-transparent blur-2xl" />
      <Ring items={outer} radius={165} duration={60} />
      <Ring items={inner} radius={100} duration={45} reverse />
      <div className="absolute left-1/2 top-1/2 -ml-11 -mt-11 flex size-22 items-center justify-center rounded-3xl border border-line bg-white shadow-[var(--shadow-glow)]">
        <LogoMark className="size-12" />
      </div>
    </div>
  );
}
