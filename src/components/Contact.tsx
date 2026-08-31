import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { WaterAnimation } from "@/components/WaterAnimation";
import { Reveal, SectionHeading, fadeUp, staggerParent } from "@/components/ui/Reveal";
import { contactInfo } from "@/data/site";

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: contactInfo.phone,
    href: `tel:+91${contactInfo.phone}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contactInfo.whatsapp,
    href: `https://wa.me/91${contactInfo.whatsapp}`,
  },
];

const areas = [
  "Jubilee Hills",
  "Banjara Hills",
  "Madhapur",
  "Kondapur",
  "Gachibowli",
  "Hitec City",
  "Kukatpally",
  "Begumpet",
];

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Enter a valid 10-digit mobile number";
    if (form.message.trim().length < 5) next.message = "Tell us a little more";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      
      // Send message via WhatsApp
      const text = `Hi, I am ${form.name.trim()}.\nMy phone number is ${form.phone}.\n\n${form.message.trim()}`;
      const url = `https://wa.me/91${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");

      setTimeout(() => setSent(false), 5000);
      setForm({ name: "", phone: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-ice-50 to-white py-8 sm:py-12 md:py-20"
    >
      <WaterAnimation count={7} className="-z-10 opacity-60" seed={131} />
      <div className="shell">
        <SectionHeading
          eyebrow="Get in touch"
          title="We are here to"
          highlight="help"
          subtitle="Call or WhatsApp us at 9494913323. Our care team in Jubilee Hills, Hyderabad replies within minutes."
        />

        <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-[0.85fr_1fr]">
          <motion.div
            variants={staggerParent(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {/* 2 Contact channels: 2-column row on mobile, vertical stack on desktop */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:grid-cols-1 lg:gap-4">
              {channels.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="card-soft card-hover flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 p-3.5 sm:p-4 lg:p-5 text-center lg:text-left justify-center lg:justify-start"
                >
                  <span className="inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-navy-500 to-navy-700 text-white shadow-sm">
                    <c.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] xs:text-[11px] lg:text-[12px] font-semibold tracking-wide text-navy-900/50 uppercase">
                      {c.label}
                    </span>
                    <span className="block text-[12px] xs:text-[13.5px] lg:text-[15px] font-bold text-navy-900 truncate">
                      {c.value}
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.div variants={fadeUp} className="card-soft p-4 xs:p-5">
              <p className="flex items-center gap-2 text-[11px] xs:text-[12px] font-semibold tracking-wide text-navy-900/50 uppercase">
                <Clock className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-leaf-600" aria-hidden="true" />
                Working hours
              </p>
              <p className="mt-1.5 xs:mt-2 text-[13px] xs:text-[15px] font-bold text-navy-900">
                {contactInfo.hours}
              </p>
              <p className="mt-3 xs:mt-4 flex items-start gap-2 text-[11px] xs:text-[12px] font-semibold tracking-wide text-navy-900/50 uppercase">
                <MapPin className="mt-0.5 h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0 text-leaf-600" aria-hidden="true" />
                Service areas
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 xs:gap-2">
                {areas.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-ice-200 bg-ice-50 px-2.5 xs:px-3 py-0.5 xs:py-1 text-[11px] xs:text-[12px] font-medium text-navy-800"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              noValidate
              className="card-soft h-full p-6 sm:p-8"
              aria-label="Contact form"
            >
              <h3 className="text-xl font-bold text-navy-950">Send us a message</h3>
              <p className="mt-1.5 text-[13.5px] text-navy-900/60">
                Fill this in and we will call you back within 15 minutes.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="field-label">
                    Full name
                  </label>
                  <input
                    id="c-name"
                    className={`field ${errors.name ? "field-error" : ""}`}
                    placeholder="Ananya Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[12.5px] font-medium text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="c-phone" className="field-label">
                    Phone number
                  </label>
                  <input
                    id="c-phone"
                    inputMode="numeric"
                    className={`field ${errors.phone ? "field-error" : ""}`}
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-[12.5px] font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="c-msg" className="field-label">
                  How can we help?
                </label>
                <textarea
                  id="c-msg"
                  rows={5}
                  className={`field resize-none ${errors.message ? "field-error" : ""}`}
                  placeholder="I need a weekly wash & fold plan for a family of four..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && (
                  <p className="mt-1.5 text-[12.5px] font-medium text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-primary group">
                  Send Message
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-[13.5px] font-semibold text-leaf-700"
                    >
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      Message sent — we will call you shortly!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
