import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function Section({ title, eyebrow, children, className = "", centered = false }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`rounded-2xl border border-white/40 bg-card/90 backdrop-blur-md shadow-xl p-6 sm:p-10 ${className}`}
    >
      {(eyebrow || title) && (
        <div className={`mb-6 ${centered ? "text-center" : ""}`}>
          {eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary/80 font-semibold mb-2">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
              {title}
            </h2>
          )}
          <div className={`mt-4 h-px w-20 bg-gradient-to-r from-primary/70 to-accent/70 ${centered ? "mx-auto" : ""}`} />
        </div>
      )}
      <div className="text-foreground/90 leading-relaxed">{children}</div>
    </motion.section>
  );
}

export default Section;
