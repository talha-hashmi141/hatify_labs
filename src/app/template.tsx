"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Soft cross-fade between routes (opacity only, so no layout shift). */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
