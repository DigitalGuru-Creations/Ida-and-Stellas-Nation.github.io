import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  testIdSuffix?: string;
}

export function PageHeader({ eyebrow, title, description, testIdSuffix }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-10 mx-auto max-w-3xl text-center rounded-3xl border border-white/40 bg-background/85 backdrop-blur-md shadow-xl px-6 py-8 sm:px-10 sm:py-10"
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-semibold">
        {eyebrow}
      </p>
      <h1
        className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-foreground"
        data-testid={testIdSuffix ? `text-${testIdSuffix}-title` : undefined}
      >
        {title}
      </h1>
      <div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-primary/70 to-accent/70" />
      {description && (
        <p className="mt-5 text-foreground/85 leading-relaxed">{description}</p>
      )}
    </motion.header>
  );
}

export default PageHeader;
