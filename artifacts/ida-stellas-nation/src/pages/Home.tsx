import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, Users, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";

export default function Home() {
  return (
    <Layout panel={false}>
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-5xl rounded-3xl border border-white/40 bg-background/85 backdrop-blur-md shadow-2xl p-8 sm:p-12"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-semibold mb-4">
              Non-Profit Organization &middot; Las Vegas, Nevada
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05] flex-1"
                data-testid="text-hero-title"
              >
                Ida &amp; Stella's Nation
                <span className="block text-primary mt-2">Incorporated</span>
              </h1>
              <motion.img
                src={logo}
                alt="Ida & Stella's Nation Inc. logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="mt-6 md:mt-0 h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 shrink-0 object-contain drop-shadow-md self-center md:self-auto"
                data-testid="img-hero-logo"
              />
            </div>
            <p className="mt-6 text-lg sm:text-xl text-foreground/85 italic font-serif leading-relaxed">
              "Welcome to I.S.N, where there IS Love &amp; Restoration for our Nation."
            </p>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We aid and assist in restoring lives within our community and beyond.
              Everyone needs love and support through any trials and tribulations in
              life &mdash; and we are here to walk alongside you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                data-testid="button-explore-services"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md ring-1 ring-primary-border hover-elevate active-elevate-2"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                data-testid="button-get-in-touch"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-6 py-3 text-sm font-semibold text-foreground hover-elevate"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: HeartHandshake,
              title: "Love &amp; Support",
              body: "Walking with survivors of domestic violence and sexual abuse through every step of restoration.",
            },
            {
              icon: Users,
              title: "Community Care",
              body: "Honoring our elders and neighbors with food, clothing, and family-centered events.",
            },
            {
              icon: Sparkles,
              title: "Restoration",
              body: "Building bridges to counseling, housing, and jobs &mdash; helping lives rise again.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl border border-white/40 bg-card/90 backdrop-blur-md shadow-xl p-7"
              data-testid={`card-pillar-${i}`}
            >
              <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <card.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-foreground"
                  dangerouslySetInnerHTML={{ __html: card.title }} />
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: card.body }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl border border-white/40 bg-card/90 backdrop-blur-md shadow-xl p-8 sm:p-10 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary/80 font-semibold">
            This IS Ida &amp; Stella's Nation
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold">
            Founded in love. Built for our community.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            Three women came together to honor a legacy of T.L.C. &mdash; tender
            loving care &mdash; passed down by Ida Dyer and Estella Burton.
            Together, we keep that legacy alive in Las Vegas, with plans to grow
            nationwide.
          </p>
          <div className="mt-7">
            <Link
              href="/history"
              data-testid="button-our-story"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md ring-1 ring-primary-border hover-elevate"
            >
              Read Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
