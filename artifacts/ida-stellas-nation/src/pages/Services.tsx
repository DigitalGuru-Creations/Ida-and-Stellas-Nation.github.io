import { motion } from "framer-motion";
import {
  Users,
  Phone,
  HeartHandshake,
  Home as HomeIcon,
  Briefcase,
  Utensils,
  PartyPopper,
} from "lucide-react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";

const SERVICES = [
  {
    icon: Users,
    title: "Support Groups",
    body:
      "Safe, caring spaces for survivors of domestic violence and sexual abuse to share, heal, and grow together.",
  },
  {
    icon: Phone,
    title: "Counseling Referral Program",
    body:
      "Connections to licensed counselors and therapists matched to the needs of those we serve.",
  },
  {
    icon: HeartHandshake,
    title: "Emotional &amp; Spiritual Support",
    body:
      "Compassionate listening, encouragement, and faith-rooted care for the heart and soul.",
  },
  {
    icon: HomeIcon,
    title: "Housing Resources",
    body:
      "Guidance and connections to local housing programs that help families find safety and stability.",
  },
  {
    icon: Briefcase,
    title: "Job Resources",
    body:
      "Help with job leads, résumés, and skills referrals so people can build self-sufficient futures.",
  },
  {
    icon: Utensils,
    title: "Food &amp; Clothing Drives",
    body:
      "Recurring drives serving our elderly neighbors and anyone in need across the community.",
  },
  {
    icon: PartyPopper,
    title: "Community Family Events",
    body:
      "Gatherings that celebrate connection, culture, and the families that make our nation whole.",
  },
];

export default function Services() {
  return (
    <Layout>
      <PageHeader
        eyebrow="What We Do"
        title="Services Offered"
        description="From support groups to community drives, every program is designed to deliver T.L.C. — tender loving care — right where it is needed most."
        testIdSuffix="services"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="rounded-2xl border border-white/40 bg-card/90 backdrop-blur-md shadow-xl p-6 hover-elevate"
            data-testid={`card-service-${i}`}
          >
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
              <s.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-foreground"
                dangerouslySetInnerHTML={{ __html: s.title }} />
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed"
               dangerouslySetInnerHTML={{ __html: s.body }} />
          </motion.article>
        ))}
      </div>

      <div className="h-10" />

      <Section centered eyebrow="Need Support?" title="We're here to help.">
        <p className="text-center text-foreground/85 max-w-2xl mx-auto">
          If you or someone you love needs care, please reach out. Our team will
          listen with kindness and connect you with the right resources.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/contact"
            data-testid="button-contact-cta"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md ring-1 ring-primary-border hover-elevate"
          >
            Contact Us
          </a>
        </div>
      </Section>
    </Layout>
  );
}
