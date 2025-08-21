import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpecialHeader from "@components/common/SpecialHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  id: number;
  title: string;
  short: string;
  description: string;
  image: string;
  languages: string[]; // main languages
  tools: string[]; // frameworks/tools
  liveUrl?: string;
  github?: string;
  date?: string;
  role?: string;
  duration?: string;
  highlights?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "AI Website Maker",
    short: "Generate full websites from prompts",
    description:
      "An AI-driven website builder that turns text prompts into production-ready React + Tailwind websites with routing, forms and deploy scripts.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4dfc3d71a2d24a9f1d2a6a0c3f3d6a6d",
    languages: ["TypeScript", "HTML", "CSS"],
    tools: ["Next.js", "Tailwind", "OpenAI", "Vercel"],
    liveUrl: "https://example-ai-site.com/",
    github: "https://github.com/your-user/ai-website-maker",
    date: "2024-11-01",
    role: "Full Stack Engineer",
    duration: "6 months",
    highlights: [
      "Prompt-to-code pipeline (AST-based)",
      "Exportable project ZIP + deploy script",
      "Custom component library + UI editor",
    ],
  },
  {
    id: 2,
    title: "Clinic SaaS",
    short: "Clinic management (appointments, billing)",
    description:
      "Multi-tenant SaaS for clinics: patient records, appointments, invoicing, and pharmacy stock — built for easy white-labeling and integrations.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4dfc3d71a2d24a9f1d2a6a0c3f3d6a6d",
    languages: ["JavaScript", "SQL"],
    tools: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://clinic-saas.example/",
    github: "https://github.com/your-user/clinic-saas",
    date: "2025-03-15",
    role: "Lead Frontend",
    duration: "4 months",
    highlights: [
      "Multi-tenant auth",
      "POS integration",
      "Offline-first cashier",
    ],
  },
  {
    id: 3,
    title: "DataViz Studio",
    short: "Visual analytics for product teams",
    description:
      "A collaborative dashboard builder that lets product teams slice metrics, save views, and generate shareable reports with annotations.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b8a1b6f8d8a0b0b1f0a9a8b7c6d5e4f",
    languages: ["TypeScript", "Python"],
    tools: ["React", "D3", "FastAPI", "Postgres"],
    liveUrl: "https://dataviz-studio.example/",
    github: "https://github.com/your-user/dataviz-studio",
    date: "2024-06-20",
    role: "Frontend Engineer",
    duration: "3 months",
    highlights: [
      "Custom chart builder",
      "Streaming data support",
      "Shareable report urls",
    ],
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const autoSlideInterval = 6000; // 6s per slide

  const nextProject = () => setCurrentIndex((p) => (p + 1) % projects.length);
  const prevProject = () =>
    setCurrentIndex((p) => (p - 1 + projects.length) % projects.length);
  const selectProject = (index: number) => setCurrentIndex(index);

  useEffect(() => {
    setProgress(0);
    const step = 100 / (autoSlideInterval / 100);
    const t = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextProject();
          return 0;
        }
        return Math.min(100, +(prev + step).toFixed(2));
      });
    }, 100);

    return () => clearInterval(t);
  }, [currentIndex]);

  const current = projects[currentIndex];

  return (
    <section className="py-24">
      <SpecialHeader title="Projects" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* main card */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55 }}
                className="relative h-[460px] w-full rounded-xl overflow-hidden shadow-2xl"
              >
                {/* background image */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${current.image})` }}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.08 }}
                  transition={{ duration: 0.8 }}
                />

                {/* dark glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* content card */}
                <Card className="absolute inset-4 bg-black/40 backdrop-blur-md border border-white/6 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-3xl text-white">
                      {current.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {current.short}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 text-white/90 overflow-auto">
                    <p className="mb-4">{current.description}</p>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-white mb-2">
                        Built with
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {current.languages.map((l) => (
                          <Badge key={l}>{l}</Badge>
                        ))}
                        {current.tools.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {current.highlights && (
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-white mb-2">
                          Highlights
                        </h5>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {current.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      {current.liveUrl && (
                        <Button asChild>
                          <a
                            href={current.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live Demo{" "}
                            <ExternalLink className="ml-2 w-4 h-4 inline-block" />
                          </a>
                        </Button>
                      )}

                      {current.github && (
                        <Button variant="secondary" asChild>
                          <a
                            href={current.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Source{" "}
                            <Github className="ml-2 w-4 h-4 inline-block" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-white/90">
                      <div>{current.role}</div>
                      <div className="opacity-70">•</div>
                      <div>{current.duration}</div>
                      <div className="opacity-70">•</div>
                      <div>{current.date}</div>
                    </div>

                    <div className="flex items-center gap-2 w-48">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white"
                        onClick={() => prevProject()}
                      >
                        Prev
                      </Button>
                      <Button size="sm" onClick={() => nextProject()}>
                        Next
                      </Button>
                    </div>
                  </CardFooter>

                  {/* animated progress (left -> right) */}
                  <motion.div
                    key={`progress-${currentIndex}`}
                    className="absolute bottom-0 left-0 h-1 bg-amber-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* small-screen thumbnails */}
            <div className="mt-4 block lg:hidden">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    onClick={() => selectProject(i)}
                    whileHover={{ scale: 1.04 }}
                    className={`min-w-[160px] h-[90px] rounded-lg overflow-hidden border-2 ${
                      i === currentIndex
                        ? "border-amber-400"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundImage: `url(${p.image})`,
                      backgroundSize: "cover",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* sidebar (desktop) */}
          <aside className="hidden lg:block w-[320px]">
            <div className="flex flex-col gap-4 sticky top-36">
              {projects.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => selectProject(i)}
                  whileHover={{ scale: 1.02 }}
                  className={`group text-left rounded-lg overflow-hidden flex gap-3 p-2 items-center w-full transition-shadow ${
                    i === currentIndex
                      ? "shadow-2xl ring-2 ring-amber-400"
                      : "shadow-sm"
                  }`}
                >
                  <div
                    className="w-20 h-14 rounded-md bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />

                  <div className="flex-1">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {p.short}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {p.languages.slice(0, 2).map((l) => (
                        <Badge key={l} variant="secondary">
                          {l}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}

              <div className="mt-2 flex items-center gap-2">
                <Button variant="ghost" onClick={() => prevProject()}>
                  Prev
                </Button>
                <Button onClick={() => nextProject()}>Next</Button>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <strong>Tip:</strong> click thumbnails to jump to a project.
                Auto-advances every 6s.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
