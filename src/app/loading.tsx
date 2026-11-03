export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center" role="status" aria-live="polite">
      <span className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-royal" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
