import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-b" />
      <p className="label-mono relative">[ ERROR — SIGNAL LOST ]</p>
      <h1 aria-label="404" className="display relative mt-4 text-[clamp(8rem,30vw,20rem)]">
        <span className="text-outline">4</span>
        <span className="text-accent">0</span>
        <span className="text-outline">4</span>
      </h1>
      <p className="relative mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
        The page you are looking for does not exist or has been moved. Let us get you back to solid ground.
      </p>
      <Link href="/" className="btn-primary relative mt-10">
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
    </section>
  );
}
