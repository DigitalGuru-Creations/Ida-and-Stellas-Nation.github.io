import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Quote } from "lucide-react";

export default function History() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Our Roots"
        title="The History of Ida & Stella's Nation"
        description="A legacy of love and wisdom, carried forward by three women who became family."
        testIdSuffix="history"
      />

      <Section eyebrow="Our Story" title="In memory of Ida &amp; Estella">
        <div className="prose prose-neutral max-w-none">
          <p>
            Ida and Stella's Nation was founded by President &amp; Director{" "}
            <strong>Christina Dyer</strong> &mdash; a Chicago native &mdash; in
            memory of her grandmothers, <strong>Ida Dyer</strong> and{" "}
            <strong>Estella Burton</strong>, who helped raise Christina into the
            woman she is today.
          </p>
          <p>
            Throughout life, we all need someone to provide T.L.C. when we have
            experienced traumatic situations or life-changing events. Ida and
            Estella were the villagers in their communities who provided that
            T.L.C. to anyone in need. Christina remembered the love, knowledge,
            and wisdom that her grandmothers gave to their communities &mdash; and
            wanted to keep that same legacy going to help improve the
            communities of today.
          </p>
          <p>
            <strong>Tamara Barnes</strong>, Treasurer and Chicago native, is
            Christina's first cousin and also a granddaughter of Ida Dyer.{" "}
            <strong>Latoria Jones</strong>, Secretary and Georgia native, is a
            childhood friend of Christina's who became family over more than 30
            years.
          </p>
          <p>
            Three women came together to create Ida &amp; Stella's Nation
            &mdash; for the support and love of our community.
          </p>
        </div>
      </Section>

      <div className="h-8" />

      <Section className="bg-primary/8">
        <div className="flex flex-col items-center text-center gap-4">
          <Quote className="h-8 w-8 text-primary/70" />
          <p className="font-serif text-2xl sm:text-3xl text-foreground italic max-w-3xl">
            "Welcome to I.S.N, where there IS Love &amp; Restoration for our Nation."
          </p>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Mission Statement
          </p>
        </div>
      </Section>
    </Layout>
  );
}
