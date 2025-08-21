import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import SpecialHeader from "@components/common/SpecialHeader";

// shadcn UI (adjust paths if necessary)
import { Card, CardContent } from "@/components/ui/card";

// icons
import { Layout, Code, Server, Sparkles } from "lucide-react";

type Service = {
  id: string;
  title: string;
  subtitle: string;
  paragraph: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tag: string;
  gradient: string;
};

const SERVICES: Service[] = [
  {
    id: "uiux",
    title: "UI / UX Design",
    subtitle: "Beautiful interfaces that convert",
    paragraph:
      "User-focused interface design, wireframes and high-fidelity prototypes — ready for development.",
    Icon: Layout,
    tag: "Design",
    gradient: "from-[#6A198A] to-[#1A0623]",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Fast, accessible and maintainable",
    paragraph:
      "React / Next.js apps with a focus on performance, accessibility, and delightful interactions.",
    Icon: Sparkles,
    tag: "Frontend",
    gradient: "from-[#6A198A] to-[#1A0623]",
  },
  {
    id: "backend",
    title: "Backend & APIs",
    subtitle: "Scalable servers and APIs",
    paragraph:
      "Node.js, Express or serverless APIs, data modelling and secure authentication flows.",
    Icon: Server,
    tag: "Backend",
    gradient: "from-[#6A198A] to-[#1A0623]",
  },
  {
    id: "integrations",
    title: "Integrations & DevOps",
    subtitle: "Deploy with confidence",
    paragraph:
      "CI/CD, infra-as-code, third-party integrations, monitoring and backups — production-ready.",
    Icon: Code,
    tag: "Infra",
    gradient: "from-[#6A198A] to-[#1A0623]",
  },
];

const cardTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
};

/** chunk arr into rows of given size (2) */
const chunk = <T,>(arr: T[], size = 2): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

export default function ServicesRows() {
  // prepare rows first
  const rows = chunk<Service>(SERVICES, 2);

  // initial: even rows -> first item expanded, odd rows -> second item expanded (fallbacks guarded)
  const initialExpanded = rows.reduce<Record<number, string | null>>(
    (acc, row, i) => {
      acc[i] =
        i % 2 === 0 ? row[0]?.id ?? null : row[1]?.id ?? row[0]?.id ?? null;
      return acc;
    },
    {}
  );

  // expandedPerRow: a map of rowIndex -> serviceId | null
  const [expandedPerRow, setExpandedPerRow] =
    useState<Record<number, string | null>>(initialExpanded);

  const handleEnter = (rowIndex: number, id: string) =>
    setExpandedPerRow((s) => ({ ...s, [rowIndex]: id }));
  const handleLeave = (rowIndex: number) =>
    setExpandedPerRow((s) => ({ ...s, [rowIndex]: null }));
  const handleToggle = (rowIndex: number, id: string) =>
    setExpandedPerRow((s) => ({
      ...s,
      [rowIndex]: s[rowIndex] === id ? null : id,
    }));

  return (
    <section className="py-24">
      <SpecialHeader title="Services" />

      <div className="container mx-auto px-4 space-y-6">
        {rows.map((row, rowIndex) => {
          const expandedId = expandedPerRow[rowIndex] ?? null;

          return (
            // Row container: a flex row with 2 items; scoped hover handling so only this row animates.
            <div
              key={`row-${rowIndex}`}
              className="flex flex-col md:flex-row gap-6"
              // reset on leave of the whole row
              onMouseLeave={() => handleLeave(rowIndex)}
            >
              {row.map((s) => {
                const isExpanded = expandedId === s.id;

                return (
                  <motion.div
                    key={s.id}
                    layout
                    initial={false}
                    transition={cardTransition}
                    // change flex proportions inside the row only
                    style={{ flex: isExpanded ? 3 : 1, minWidth: 0 }}
                    className={`rounded-2xl overflow-hidden cursor-pointer shadow-lg transform-gpu`}
                    onMouseEnter={() => handleEnter(rowIndex, s.id)}
                    onClick={() => handleToggle(rowIndex, s.id)}
                  >
                    <Card
                      className="h-full bg-trasparent rounded-2xl p-0"
                    >
                      <motion.div
                        className={`p-6 ${
                          isExpanded
                            ? "h-36 items-center"
                            : "h-full items-center justify-center"
                        } flex gap-4 bg-gradient-to-r ${s.gradient}`}
                        layout
                        layoutId={`visual-${rowIndex}-${s.id}`} // scoped layoutId to avoid cross-row shared animations
                        initial={false}
                      >
                        <div
                          className={`${
                            isExpanded ? "" : "order-1"
                          } rounded-xl p-3 bg-white/20 backdrop-blur-sm`}
                        >
                          <s.Icon className="w-7 h-7 text-white" />
                        </div>

                        <div
                          className={`flex-1 min-w-0 text-white ${
                            isExpanded ? "" : "text-center"
                          }`}
                        >
                          <motion.h3
                            className={`text-lg font-semibold leading-tight truncate ${
                              isExpanded ? "" : "text-xl"
                            }`}
                            layoutId={`title-${rowIndex}-${s.id}`}
                          >
                            {s.title}
                          </motion.h3>
                          <p
                            className={`text-sm opacity-90 mt-1 truncate ${
                              isExpanded ? "" : "hidden"
                            }`}
                          >
                            {s.subtitle}
                          </p>
                        </div>
                      </motion.div>

                      {/* Only render content/footer when expanded so header can take the full collapsed card */}
                      {isExpanded && (
                        <>
                          <CardContent className="p-6">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={`${s.id}-expanded`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.18 }}
                              >
                                <p className="text-sm text-white mb-4">
                                  {s.paragraph}
                                </p>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-white">
                                  <li className="text-sm">
                                    • Component-driven UI (reusable)
                                  </li>
                                  <li className="text-sm">
                                    • Pixel-perfect mockups
                                  </li>
                                  <li className="text-sm">
                                    • Performance & SEO optimizations
                                  </li>
                                  <li className="text-sm">
                                    • Test coverage & CI/CD
                                  </li>
                                </ul>
                              </motion.div>
                            </AnimatePresence>
                          </CardContent>
                        </>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          );
        })}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Hover a card to expand it within its row. Tap a card to toggle on
          touch devices.
        </div>
      </div>
    </section>
  );
}
