import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const BOARD_EMAILS = [
  { name: "Christina Dyer", role: "President &amp; Director", email: "CDBidanstellas@gmail.com" },
  { name: "Latoria Jones", role: "Secretary", email: "LJones.IdaNStellas@gmail.com" },
  { name: "Tamara Barnes", role: "Treasurer", email: "TBarnes.IdaNStellasNation@gmail.com" },
];

export default function Contact() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Reach Out"
        title="Contact I.S.N."
        description="We would love to hear from you — whether you need support, want to volunteer, or are looking to give back."
        testIdSuffix="contact"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: MapPin,
            title: "Office Address",
            lines: ["732 S 6th Street, #5976", "Las Vegas, NV 89101"],
          },
          {
            icon: Phone,
            title: "Office Phone",
            lines: ["(775) 242-3734"],
            href: "tel:+17752423734",
          },
          {
            icon: Mail,
            title: "Office Email",
            lines: ["IdaNStellasNationInc@gmail.com"],
            href: "mailto:IdaNStellasNationInc@gmail.com",
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/40 bg-card/95 backdrop-blur-md shadow-xl p-7"
            data-testid={`card-contact-${i}`}
          >
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
              <c.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
              {c.title}
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-foreground/90 break-words">
              {c.href ? (
                <a href={c.href} className="hover:text-primary">
                  {c.lines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </a>
              ) : (
                c.lines.map((l) => <div key={l}>{l}</div>)
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-8" />

      <Section eyebrow="Direct Lines" title="Email a Board Member">
        <div className="grid gap-4 md:grid-cols-3">
          {BOARD_EMAILS.map((b) => (
            <a
              key={b.email}
              href={`mailto:${b.email}`}
              data-testid={`link-board-email-${b.name.split(" ")[0].toLowerCase()}`}
              className="block rounded-xl border border-border bg-background/95 p-5 hover-elevate"
            >
              <p className="font-serif text-base font-semibold">{b.name}</p>
              <p className="text-xs text-primary mb-2"
                 dangerouslySetInnerHTML={{ __html: b.role }} />
              <p className="text-sm text-muted-foreground break-all">{b.email}</p>
            </a>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
