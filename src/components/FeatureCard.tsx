import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { fadeUp } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  badge: BadgeCheck,
  truck: Truck,
};

const iconTone: Record<string, string> = {
  shield: "bg-navy-50 text-navy-600 ring-navy-100",
  badge: "bg-leaf-50 text-leaf-600 ring-leaf-100",
  truck: "bg-sky-50 text-sky-600 ring-sky-100",
};

export function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  const Icon = iconMap[icon] ?? ShieldCheck;
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="card-soft card-hover group h-full p-2.5 sm:p-5 flex flex-col justify-between"
    >
      <div>
        <span
          className={`mb-2 sm:mb-3 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${iconTone[icon]}`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </span>
        <h3 className="text-[12px] sm:text-[14.5px] leading-snug font-bold text-navy-950">{title}</h3>
        <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-[12.5px] leading-relaxed text-navy-900/60">{body}</p>
      </div>
    </motion.article>
  );
}
