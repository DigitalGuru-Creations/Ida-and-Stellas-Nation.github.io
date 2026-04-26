import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";

const BOARD = [
  {
    name: "Christina Dyer",
    role: "President &amp; Director",
    email: "CDBidanstellas@gmail.com",
    initials: "CD",
  },
  {
    name: "Latoria Jones",
    role: "Secretary",
    email: "LJones.IdaNStellas@gmail.com",
    initials: "LJ",
  },
  {
    name: "Tamara Barnes",
    role: "Treasurer",
    email: "TBarnes.IdaNStellasNation@gmail.com",
    initials: "TB",
  },
];

export default function About() {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Us"
        title="Meet the Women Behind I.S.N."
        description="A board of directors built on family, friendship, and a shared commitment to love, restoration, and community."
        testIdSuffix="about"
      />

      <Section eyebrow="Board of Directors" title="Our Leadership">
        <div className="grid gap-6 md:grid-cols-3">
          {BOARD.map((m, i) => (
            <motion.article
              key={m.email}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background/95 p-6 shadow-sm hover-elevate"
              data-testid={`card-board-${i}`}
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-semibold shadow-md">
                  {m.initials}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {m.name}
                  </h3>
                  <p className="text-sm text-primary"
                     dangerouslySetInnerHTML={{ __html: m.role }} />
                </div>
              </div>
              <a
                href={`mailto:${m.email}`}
                data-testid={`link-email-${m.initials.toLowerCase()}`}
                className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary break-all"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>{m.email}</span>
              </a>
            </motion.article>
          ))}
        </div>
      </Section>

      <div className="h-8" />

      <Section eyebrow="Our Goal" title="Restoring lives, one neighbor at a time">
        <p className="text-lg leading-relaxed">
          Our goal at Ida &amp; Stella's Nation is to aid and assist in restoring
          lives within our community and beyond. Everyone needs love and support
          through any trials and tribulations in life. Ida &amp; Stella's Nation
          plans to expand to different states as well, to provide love and
          support nationwide.
        </p>
      </Section>
    </Layout>
  );
}
