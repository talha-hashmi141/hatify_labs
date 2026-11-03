import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-dots fade-mask-b absolute inset-0 opacity-70" />
        <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-electric/15 blur-[120px]" />
      </div>
      <div className="container-x relative text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="display mt-5 text-[clamp(2.4rem,6vw,4.5rem)]">
          This page took a <span className="accent">different</span> route.
        </h1>
        <p className="lead mx-auto mt-6 max-w-lg">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-lg btn-primary">
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </Link>
          <Link href="/work" className="btn btn-lg btn-secondary">
            Browse case studies
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
