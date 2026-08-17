export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill="#0c0c0d" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="15.25"
        fill="none"
        stroke="#bef264"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path d="M22 17v30M42 17v30M22 32h20" stroke="#bef264" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
