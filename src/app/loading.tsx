export default function Loading() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <div className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-lime-300" />
      <p className="label-mono">Loading /</p>
    </div>
  );
}
