"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

/**
 * Optimizing Sports – One-Page Website (DE)
 * - Schwarz/Weiß, clean & modern
 * - Podcast-Link
 * - Blogeinträge (local data, erweiterbar)
 * - Instagram-Link
 *
 * So passt du es an:
 * 1) Ersetze PODCAST_URL und INSTAGRAM_URL
 * 2) Lege dein Logo unter /public/logo.png ab (oder ändere LOGO_SRC)
 * 3) Ergänze BLOG_POSTS (Titel/Datum/Teaser/Inhalt)
 */

const PODCAST_URL = "https://example.com/podcast";
const INSTAGRAM_URL = "https://www.instagram.com/optimizingsports/";
const LOGO_SRC = "/logo.png"; // Lege dein Logo in den public-Ordner als logo.png

const BLOG_POSTS = [
  {
    id: "post-1",
    title: "Schneller werden ohne mehr Training: 3 Stellschrauben",
    date: "2025-01-12",
    tags: ["Speed", "Fußball"],
    teaser:
      "Wenn du öfter sprintest, wirst du nicht automatisch schneller. Diese drei Stellschrauben bringen dir sofort messbare Fortschritte.",
    content: [
      "**1) Qualität vor Volumen.** 4–8 echte Maximalsprints mit voller Pause schlagen 20 halbe Sprints.",
      "**2) Technik-Checks.** Rumpfspannung, Hüftstreckung, Fußaufsatz unter dem Körperschwerpunkt – jede Woche kurz prüfen.",
      "**3) Kraft als Fundament.** Kniebeugen-/Hinge-Pattern + Waden/Sehnenarbeit stabilisieren die Beschleunigung.",
      "\n**Mini-Plan (10–15 min, 2×/Woche):**\n- 2×20 m Antritte\n- 2×30 m Beschleunigung\n- 2×20 m Flying (10 m Anlauf + 20 m schnell)\nVolle Pausen (2–3 min).",
    ],
  },
  {
    id: "post-2",
    title: "Plyos im Fußball: Weniger ist mehr",
    date: "2025-02-03",
    tags: ["Plyometrie", "Athletik"],
    teaser:
      "Plyos wirken – aber nur, wenn du sie dosierst. So integrierst du Sprünge, ohne deine Beine zu zerstören.",
    content: [
      "**Regel:** Max. 30–60 hochwertige Bodenkontakte pro Einheit (je nach Level).",
      "**Start:** 3–4 Übungen, 2–3 Sätze, lange Pausen. Fokus auf Landung & Steifigkeit.",
      "**Beispiel:**\n- Pogos 3×15\n- Skater Jumps 3×6/Seite\n- Box Jump 4×3\n- Drop Jump 4×2 (nur wenn sauber)",
    ],
  },
  {
    id: "post-3",
    title: "Erholung ist Training: Schlaf, Schritte, Stress",
    date: "2025-03-09",
    tags: ["Recovery", "Lifestyle"],
    teaser:
      "Deine Leistung steigt nicht im Training – sondern in der Erholung. Drei Basics, die du sofort umsetzen kannst.",
    content: [
      "**Schlaf:** Ziel 7,5–9 h. Gleiche Einschlafzeit an 5–6 Tagen/Woche.",
      "**Alltag:** 7–10k Schritte/Tag für Regeneration & Körperkomposition.",
      "**Stress:** 5 Minuten Atem-Downregulation nach harten Einheiten (z.B. 4–6 Atmung).",
    ],
  },
];

function formatDateDE(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function TagPill({ children }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

export default function OptimizingSportsOnePager() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(BLOG_POSTS[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => {
      const hay = `${p.title} ${p.teaser} ${(p.tags || []).join(" ")} ${p.content.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-white/5">
              {/* Logo: lege /public/logo.png ab */}
              <img
                src={LOGO_SRC}
                alt="Optimizing Sports Logo"
                className="h-full w-full object-cover"
                onError={(e) => {
                  // fallback: simple mark if no logo
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">OPTIMIZING SPORTS</div>
              <div className="text-xs text-white/60">Podcast • Blog • Instagram</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a className="text-white/70 hover:text-white" href="#podcast">
              Podcast
            </a>
            <a className="text-white/70 hover:text-white" href="#blog">
              Blog
            </a>
            <a className="text-white/70 hover:text-white" href="#instagram">
              Instagram
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PODCAST_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Zum Podcast <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="mx-auto max-w-6xl px-4">
        <section className="relative py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid items-center gap-10 md:grid-cols-2"
          >
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Schwarz. Klar. Performance.
              </h1>
              <p className="mt-4 max-w-prose text-base text-white/70 md:text-lg">
                Optimizing Sports bündelt Podcast, Blog und Socials an einem Ort – clean,
                modern und ohne Schnickschnack.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#podcast"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                >
                  Podcast entdecken
                </a>
                <a
                  href="#blog"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Blog lesen
                </a>
              </div>
                         </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Schnellzugriffe</div>
                <div className="text-xs text-white/60">1 Seite • DE • B/W</div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickCard
                  title="Podcast"
                  desc="Neue Folgen, Gäste, Deep Dives"
                  href={PODCAST_URL}
                />
                <QuickCard title="Blog" desc="Artikel & Notizen" href="#blog" />
                <QuickCard
                  title="Instagram"
                  desc="Clips, Reels & Updates"
                  href={INSTAGRAM_URL}
                  external
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Podcast */}
        <section id="podcast" className="scroll-mt-24 py-12 md:py-16">
          <SectionHeader
            eyebrow="Podcast"
            title="Direkt zur aktuellen Folge"
            subtitle="Ein Klick und du bist drin."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Podcast öffnen</div>
                           <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={PODCAST_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                >
                  Podcast öffnen <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#blog"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Erst Blog lesen
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Was dich erwartet</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Athletik & Fußball-Performance</li>
                <li>• Speed, Sprungkraft, Belastungssteuerung</li>
                <li>• Praxisnah, kurz & umsetzbar</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="scroll-mt-24 py-12 md:py-16">
          <SectionHeader
            eyebrow="Blog"
            title="Artikel & Notizen"
            subtitle="Kurze, klare Beiträge – filterbar per Suche."
          />

          <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Blog durchsuchen (z.B. Speed, Plyometrie…)"
                className="w-full rounded-2xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
                aria-label="Blog durchsuchen"
              />
            </div>
            <div className="text-xs text-white/60">
              {filtered.length} Beitrag{filtered.length === 1 ? "" : "e"}
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {filtered.map((post) => {
              const isOpen = openId === post.id;
              return (
                <article
                  key={post.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <button
                    className="flex w-full items-start justify-between gap-4 text-left"
                    onClick={() => setOpenId(isOpen ? null : post.id)}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold leading-snug md:text-xl">
                          {post.title}
                        </h3>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-white/60">
                          {formatDateDE(post.date)}
                        </span>
                        <span className="text-white/25">•</span>
                        <div className="flex flex-wrap gap-2">
                          {(post.tags || []).map((t) => (
                            <TagPill key={t}>{t}</TagPill>
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-white/70">{post.teaser}</p>
                    </div>
                    <div className="mt-1 shrink-0 rounded-2xl border border-white/15 bg-white/5 p-2 text-white/80">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-5 border-t border-white/10 pt-5"
                    >
                      <div className="prose prose-invert max-w-none prose-p:my-3 prose-strong:text-white">
                        {post.content.map((line, idx) => (
                          <p key={idx} dangerouslySetInnerHTML={{ __html: md(line) }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </article>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/70">
                Kein Treffer. Versuch’s mit einem anderen Begriff.
              </div>
            )}
          </div>
        </section>

        {/* Instagram */}
        <section id="instagram" className="scroll-mt-24 py-12 md:py-16">
          <SectionHeader
            eyebrow="Instagram"
            title="Clips, Reels & Updates"
            subtitle="Ein Klick führt dich zu Instagram."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Zum Profil</div>
            
              <div className="mt-5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                >
                  Instagram öffnen <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Kontakt</div>
              <p className="mt-2 text-sm text-white/70">
                Schreib mir über Instagram oder verlinke hier später eine Mail-Adresse.
              </p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs text-white/60">Optional</div>
                <div className="mt-1 text-sm text-white/80">
                  hello@optimizing-sports.de
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Optimizing Sports</div>
            <div className="flex flex-wrap gap-4">
              <a className="hover:text-white" href="#podcast">
                Podcast
              </a>
              <a className="hover:text-white" href="#blog">
                Blog
              </a>
              <a
                className="hover:text-white"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function QuickCard({ title, desc, href, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group rounded-3xl border border-white/10 bg-black/20 p-5 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-sm text-white/70">{desc}</div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-2 text-white/80 group-hover:bg-white/10">
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-widest text-white/60">
        {eyebrow.toUpperCase()}
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * Minimaler Markdown-zu-HTML Helper (nur **bold** und Zeilenumbrüche).
 * Für echte Markdown-Unterstützung kann man später eine Library nutzen.
 */
function md(input) {
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const bolded = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return bolded.replace(/\n/g, "<br/>");
}
