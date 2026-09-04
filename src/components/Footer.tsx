import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { contactInfo, services } from "@/data/site";
import { navLinks } from "@/components/Navbar";
import { Link } from "react-router-dom";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socials = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/91${contactInfo.whatsapp}`,
  },
];

export function Footer({
  onNavigate,
  onBook,
}: {
  onNavigate: (id: string) => void;
  onBook: () => void;
}) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-[#06122d] to-[#03081a] text-navy-100">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(53,109,235,0.22),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-leaf-500/10 blur-3xl"
      />

      <div className="shell relative px-4 sm:px-8 pt-8 sm:pt-16 pb-6 sm:pb-10">
        {/* ========================================================= */}
        {/* MOBILE FOOTER (< 768px)                                   */}
        {/* ========================================================= */}
        <div className="block md:hidden space-y-6">
          {/* 1. Logo, Description & Socials */}
          <div className="space-y-3.5">
            <Logo light />
            <p className="text-[13px] leading-relaxed text-navy-200/80">
              Hyderabad&apos;s trusted garment care specialist. Hygienic washing, hospital-grade sanitisation, premium steam ironing, and on-time doorstep pickup &amp; delivery.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-navy-200 transition-all active:scale-95 hover:border-leaf-400 hover:bg-leaf-500/20 hover:text-white shadow-sm"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-white/10" aria-hidden="true" />

          {/* 2. Four Columns in Mobile: Quick Links | Services | Areas | Contact */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-2 xs:gap-x-3 sm:gap-x-4">
            {/* Col 1: Quick Links */}
            <nav aria-label="Quick links" className="min-w-0">
              <h3 className="font-display text-[10.5px] xs:text-[11.5px] font-bold tracking-wider text-white uppercase flex items-center gap-1 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf-400 shrink-0" />
                <span className="truncate">Quick Links</span>
              </h3>
              <ul className="space-y-1.5">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(l.id)}
                      className="text-left text-[10px] xs:text-[11.5px] sm:text-[12.5px] text-navy-200/75 transition-colors hover:text-white active:text-leaf-300 py-0.5 leading-snug block w-full truncate"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 2: Services */}
            <div className="min-w-0">
              <h3 className="font-display text-[10.5px] xs:text-[11.5px] font-bold tracking-wider text-white uppercase flex items-center gap-1 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                <span className="truncate">Services</span>
              </h3>
              <ul className="space-y-1.5">
                {services.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={onBook}
                      className="text-left text-[10px] xs:text-[11.5px] sm:text-[12.5px] text-navy-200/75 transition-colors hover:text-white active:text-sky-300 py-0.5 leading-snug block w-full truncate"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Areas */}
            <div className="min-w-0">
              <h3 className="font-display text-[10.5px] xs:text-[11.5px] font-bold tracking-wider text-white uppercase flex items-center gap-1 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate">Areas</span>
              </h3>
              <ul className="space-y-1.5">
                {[
                  { name: "Madhapur", slug: "madhapur" },
                  { name: "Gachibowli", slug: "gachibowli" },
                  { name: "Kukatpally", slug: "kukatpally" },
                  { name: "Banjara Hills", slug: "banjara-hills" }
                ].map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/areas/${a.slug}`}
                      className="text-left text-[10px] xs:text-[11.5px] sm:text-[12.5px] text-navy-200/75 transition-colors hover:text-white py-0.5 leading-snug block w-full truncate"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/areas"
                    className="text-[10px] xs:text-[11.5px] sm:text-[12.5px] font-bold text-white transition-colors hover:text-purple-300 py-0.5 mt-1 block w-full truncate"
                  >
                    View All Areas →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div className="min-w-0">
              <h3 className="font-display text-[10.5px] xs:text-[11.5px] font-bold tracking-wider text-white uppercase flex items-center gap-1 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">Contact</span>
              </h3>
              <ul className="space-y-2 text-[10px] xs:text-[11.5px] sm:text-[12.5px]">
                {/* Phone */}
                <li>
                  <a
                    href={`tel:+91${contactInfo.phone}`}
                    className="flex items-center gap-1.5 text-navy-100 font-semibold transition-colors hover:text-leaf-300 py-0.5 truncate"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-leaf-500/20 text-leaf-400">
                      <Phone className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="truncate">+91 {contactInfo.phone}</span>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href={`https://wa.me/91${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-navy-100 font-semibold transition-colors hover:text-leaf-300 py-0.5 truncate"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-leaf-500/20 text-leaf-400">
                      <MessageCircle className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="truncate">WhatsApp</span>
                  </a>
                </li>

                {/* Address */}
                <li>
                  <div className="flex items-start gap-1.5 text-navy-200/75 py-0.5 leading-snug">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-sky-500/20 text-sky-400 mt-0.5">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="line-clamp-2 xs:line-clamp-3">Jubilee Hills Rd 5, Hyderabad</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP / LAPTOP FOOTER (>= 768px)                        */}
        {/* ========================================================= */}
        <div className="hidden md:grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1.1fr]">
          {/* Brand & Bio */}
          <div className="flex flex-col justify-between">
            <div>
              <Logo light />
              <p className="mt-4 max-w-sm text-[13px] sm:text-[14px] leading-relaxed text-navy-200/80">
                Hyderabad&apos;s trusted garment care specialist. Hygienic washing, hospital-grade sanitisation, premium steam ironing, and on-time doorstep pickup &amp; delivery.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-navy-200 transition-all duration-300 hover:scale-110 hover:border-leaf-400 hover:bg-leaf-500/20 hover:text-white shadow-sm"
                >
                  <s.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-[12px] sm:text-[13px] font-bold tracking-[0.18em] text-white uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
              Quick Links
            </h3>
            <ul className="mt-3.5 sm:mt-5 space-y-2 sm:space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(l.id)}
                    className="group inline-flex items-center gap-1 text-[13px] sm:text-[14px] text-navy-200/70 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-leaf-300"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="font-display text-[12px] sm:text-[13px] font-bold tracking-[0.18em] text-white uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Services
            </h3>
            <ul className="mt-3.5 sm:mt-5 space-y-2 sm:space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={onBook}
                    className="text-left text-[13px] sm:text-[14px] text-navy-200/70 transition-colors hover:text-white"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-display text-[12px] sm:text-[13px] font-bold tracking-[0.18em] text-white uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Areas
            </h3>
            <ul className="mt-3.5 sm:mt-5 space-y-2 sm:space-y-2.5">
              {[
                { name: "Madhapur", slug: "madhapur" },
                { name: "Gachibowli", slug: "gachibowli" },
                { name: "Kukatpally", slug: "kukatpally" },
                { name: "Banjara Hills", slug: "banjara-hills" },
                { name: "Miyapur", slug: "miyapur" }
              ].map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/areas/${a.slug}`}
                    className="text-left text-[13px] sm:text-[14px] text-navy-200/70 transition-colors hover:text-white"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/areas"
                  className="inline-flex items-center gap-1 text-[13px] sm:text-[14px] font-bold text-white transition-colors hover:text-purple-300"
                >
                  View All Areas <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-display text-[12px] sm:text-[13px] font-bold tracking-[0.18em] text-white uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Contact
            </h3>
            <ul className="mt-3.5 sm:mt-5 space-y-3 text-[13px] sm:text-[14px] text-navy-200/80">
              <li>
                <a
                  className="inline-flex items-center gap-2 text-white font-semibold transition-colors hover:text-leaf-300"
                  href={`tel:+91${contactInfo.phone}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-leaf-400">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  +91 {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-white font-semibold transition-colors hover:text-leaf-300"
                  href={`https://wa.me/91${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-leaf-400">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin className="h-4 w-4 shrink-0 text-navy-400 mt-0.5" aria-hidden="true" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-navy-400" aria-hidden="true" />
                <span>{contactInfo.hours}</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={onBook}
              className="btn-green mt-5 w-full sm:w-auto px-5 py-2.5 text-xs font-bold shadow-md hover:shadow-lg"
            >
              Book Pickup Now →
            </button>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 sm:pt-6 text-[12px] sm:text-[13px] text-navy-300/60 sm:flex-row text-center sm:text-left">
          <p>© {new Date().getFullYear()} Universal Laundry Services. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="h-1 w-1 rounded-full bg-navy-300/40" />
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="h-1 w-1 rounded-full bg-navy-300/40" />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-leaf-400 hover:text-leaf-300 font-semibold transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
