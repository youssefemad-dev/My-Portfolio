import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import goEfficientImg from "@/assets/go-efficient.JPG";
import aiResumeImg from "@/assets/ai-resume-analyzer.JPG";
import algoBuddyImg from "@/assets/algoBuddy.JPG";
import egyptImg from "@/assets/egypt.JPG";
import redBullImg from "@/assets/rebull motion.JPG";

const projects = [
  {
    title: "AlgoBuddy - Open Source Contribution",
    description:
      "Fixed dark mode UI/UX bug in AlgoBuddy, a Next.js/React educational platform. Implemented theme-aware styling for button components ensuring consistent visual design across light/dark modes.",
    image: algoBuddyImg,
    link: "https://github.com/Pankajtiwari034/AlgoBuddy/pull/20",
    tags: ["React", "Next.js", "Open Source", "UI/UX"],
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.35)",
    nebulaColor: "rgba(16,185,129,0.09)",
  },
  {
    title: "AI Resume Analyzer",
    description:
      "An AI-powered tool that analyzes resumes and provides actionable feedback, keyword matching scores, and improvement suggestions.",
    image: aiResumeImg,
    link: "ai-resume-analyzer-mvk89rseo-youssef-988e.vercel.app",
    tags: ["React", "Integrated AI", "Tailwind CSS", "TypeScript"],
    accentColor: "#fb923c",
    glowColor: "rgba(251,146,60,0.35)",
    nebulaColor: "rgba(251,146,60,0.09)",
  },
  {
    title: "Go Efficient",
    description:
      "A productivity-focused web app that helps users streamline daily workflows with intuitive tools and a sleek, distraction-free interface.",
    image: goEfficientImg,
    link: "goefficient-5edaxnyzo-youssef-988e.vercel.app",
    tags: ["React", "BootStrap CSS", "Vite"],
    accentColor: "#38bdf8",
    glowColor: "rgba(56,189,248,0.35)",
    nebulaColor: "rgba(14,165,233,0.12)",
  },
  {
    title: "RedBull Motion Experience",
    description:
      "The Red Bull Motion website is a high-performance marketing experience built to promote the new Red Bull Motion product. The site features advanced scroll animations, seamless transitions, and a modern, immersive design that captures the high-energy identity of the Red Bull brand.",
    image: redBullImg,
    link: "redbull-motion-2gawgyen6-youssef-988e.vercel.app",
    tags: ["React", "Tailwind", "TypeScript"],
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.35)",
    nebulaColor: "rgba(99,40,220,0.12)",
  },
];

/* ── Purely CSS-driven rocket button — zero JS state ── */
function RocketLinkButton({ href, accentColor, glowColor }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rocket-btn"
      style={{ "--accent": accentColor, "--glow": glowColor }}
      aria-label="Launch project"
    >
      <span className="rocket-icon">🚀</span>
      <span className="rocket-label">Launch</span>
    </a>
  );
}

function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // animate only once → no re-calc on scroll-back
      throttleDelay: 99,
      offset: 60,
    });
  }, []);

  return (
    <section
      id="projects"
      className="projects-section relative w-full min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* ── Static nebula blobs (CSS-animated, GPU composited) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="nebula-blob blob-1" />
        <div className="nebula-blob blob-2" />
        {/* Shooting stars */}
        <div className="shooting-star" />
        <div className="shooting-star star-2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            ✦ Explore the Universe ✦
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5">
            My <span className="projects-title-gradient">Projects</span>
          </h2>
          <div className="w-28 h-[2px] mx-auto rounded-full projects-divider" />
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
            A constellation of real-world apps built and launched into orbit.
          </p>
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="project-card"
              style={{
                "--card-accent": project.accentColor,
                "--card-glow": project.glowColor,
                "--card-nebula": project.nebulaColor,
              }}
            >
              {/* Image */}
              <div className="proj-img-wrap">
                <div className="proj-img-overlay" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="proj-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="proj-body">
                <div className="proj-header">
                  <h3 className="proj-title">{project.title}</h3>
                  <RocketLinkButton
                    href={project.link}
                    accentColor={project.accentColor}
                    glowColor={project.glowColor}
                  />
                </div>

                <p className="proj-desc">{project.description}</p>

                <div className="proj-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="project-tag"
                      style={{ "--tag-color": project.accentColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner star */}
              <span className="corner-star" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom accent ── */}
        <div className="text-center mt-20" data-aos="fade-up">
          <p className="text-gray-500 text-sm">
            More projects launching soon
            <span className="inline-block ml-2 text-cyan-400 animate-pulse">
              🛸
            </span>
          </p>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ─────────────────────────────────────────
           Nebula background blobs
           Uses transform/opacity only → compositor thread, no layout
        ───────────────────────────────────────── */
        .nebula-blob {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
          pointer-events: none;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(99,40,220,0.16) 0%, transparent 70%);
          filter: blur(72px);
          top: -80px; left: -160px;
          animation: driftA 20s ease-in-out infinite alternate;
        }
        .blob-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 70%);
          filter: blur(72px);
          bottom: 40px; right: -100px;
          animation: driftB 24s ease-in-out infinite alternate-reverse;
        }
        @keyframes driftA {
          from { transform: translate(0, 0); }
          to   { transform: translate(36px, 28px); }
        }
        @keyframes driftB {
          from { transform: translate(0, 0); }
          to   { transform: translate(-30px, 22px); }
        }

        /* ─────────────────────────────────────────
           Shooting stars — transform only
        ───────────────────────────────────────── */
        .shooting-star {
          position: absolute;
          top: 12%; left: 0;
          width: 160px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #a78bfa 60%, transparent);
          border-radius: 2px;
          will-change: transform, opacity;
          animation: shoot 8s linear infinite;
        }
        .star-2 {
          top: 58%;
          animation-delay: 4s;
          animation-duration: 11s;
          background: linear-gradient(90deg, transparent, #38bdf8 60%, transparent);
        }
        @keyframes shoot {
          0%   { transform: translateX(-10px) rotate(-15deg); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(110vw) rotate(-15deg); opacity: 0; }
        }

        /* ─────────────────────────────────────────
           Title gradient
        ───────────────────────────────────────── */
        .projects-title-gradient {
          background: linear-gradient(135deg, #a78bfa, #38bdf8, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .projects-divider {
          background: linear-gradient(90deg, #a78bfa, #38bdf8, #34d399);
        }

        /* ─────────────────────────────────────────
           Project card
           NO backdrop-filter → eliminates the biggest paint cost.
           Uses a solid semi-transparent bg instead.
        ───────────────────────────────────────── */
        .project-card {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(10,10,35,0.92) 0%,
            color-mix(in srgb, var(--card-nebula, rgba(99,40,220,0.12)) 100%, rgba(10,10,35,0.88)) 100%
          );
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem;
          padding: 1.5rem;
          will-change: transform;
          transition: transform 0.3s cubic-bezier(0.34,1.3,0.64,1), border-color 0.3s ease;
        }

        /* ── GPU-accelerated glow pseudo-element ── */
        .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow:
            0 8px 40px var(--card-glow, rgba(167,139,250,0.3)),
            0 2px 12px var(--card-glow, rgba(167,139,250,0.15));
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }

        .project-card:hover {
          transform: translateY(-5px) scale(1.008);
          border-color: var(--card-accent, #a78bfa);
        }

        .project-card:hover::before {
          opacity: 1;
        }

        /* ── Image wrapper ── */
        .proj-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .proj-img-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: 0.75rem;
          background: linear-gradient(to bottom, transparent 55%, rgba(10,10,35,0.88) 100%);
        }
        .proj-img {
          display: block;
          width: 100%;
          height: 210px;
          object-fit: cover;
          border-radius: 0.75rem;
          transition: transform 0.45s ease, filter 0.45s ease;
          filter: brightness(0.82) saturate(1.1);
          will-change: transform;
        }
        .project-card:hover .proj-img {
          transform: scale(1.04);
          filter: brightness(0.98) saturate(1.2);
        }

        /* ── Card body ── */
        .proj-body { position: relative; z-index: 2; }
        .proj-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .proj-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          transition: color 0.25s ease;
        }
        .project-card:hover .proj-title {
          color: var(--card-accent, #a78bfa);
        }
        .proj-desc {
          color: #9ca3af;
          font-size: 0.85rem;
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        /* ── Tags ── */
        .project-tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--tag-color, #a78bfa);
          border: 1px solid color-mix(in srgb, var(--tag-color, #a78bfa) 60%, transparent);
          background: color-mix(in srgb, var(--tag-color, #a78bfa) 10%, transparent);
        }

        /* ── Corner star ── */
        .corner-star {
          position: absolute;
          top: 1rem; right: 1rem;
          color: var(--card-accent, #a78bfa);
          font-size: 0.65rem;
          opacity: 0.3;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .project-card:hover .corner-star {
          opacity: 0.9;
          transform: rotate(90deg) scale(1.4);
        }

        /* ─────────────────────────────────────────
           Rocket button — pure CSS animation, no React state
        ───────────────────────────────────────── */
        .rocket-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent, #a78bfa);
          border: 1px solid color-mix(in srgb, var(--accent, #a78bfa) 70%, transparent);
          background: color-mix(in srgb, var(--accent, #a78bfa) 10%, transparent);
          text-decoration: none;
          flex-shrink: 0;
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.2s ease;
          will-change: transform;
        }
        .rocket-btn:hover {
          background: color-mix(in srgb, var(--accent, #a78bfa) 20%, transparent);
          box-shadow: 0 0 14px var(--glow, rgba(167,139,250,0.5));
          transform: scale(1.06);
        }

        /* Rocket icon — CSS-only animation on parent hover */
        .rocket-icon {
          display: inline-block;
          font-size: 1rem;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .rocket-btn:hover .rocket-icon {
          transform: translateY(-5px) rotate(-35deg) scale(1.25);
        }
        .rocket-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
      `}</style>
    </section>
  );
}

export default Projects;
