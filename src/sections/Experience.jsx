import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
  {
    title: "React Front-End Development Trainee",
    company: "DEPI Program",
    period: "July 2025 - December 2025",
    description:
      "Completed 6-month front-end development program, delivering 2 production-ready web projects using React, JavaScript, and TypeScript.",
    highlights: [
    "Led a team of 3 developers using Git workflows to build a collaborative project, enhancing communication and version control skills", 
    "Built projects with clean, maintainable code following best practices",
    "Implemented responsive designs ensuring cross-device compatibility",
    ],
    type: "development",
  },
  {
    title: "Facilitator & Counselor",
    company: "Remal Adventures Egypt ",
    period: "September 2025 - Present",
    description:
      "Leading team-building workshops and fostering strong communication within groups.",
    highlights: [
      "Facilitated workshops for 50+ youth participants",
      "Guided activities that measurably improved group communication",
      "Created a supportive environment through clear communication and leadership",
    ],
    type: "leadership",
  },
];

function Experience() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section
      id="experience"
      className="experience-section relative w-full min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* ── Static nebula blobs (CSS-animated, GPU composited) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="nebula-blob exp-blob-1" />
        <div className="nebula-blob exp-blob-2" />
        {/* Shooting stars */}
        <div className="shooting-star exp-star-1" />
        <div className="shooting-star exp-star-2" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* ── Section Header ── */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            ✦ Mission Log ✦
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5">
            My <span className="experience-title-gradient">Experience</span>
          </h2>
          <div className="w-28 h-[2px] mx-auto rounded-full experience-divider" />
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
            A chronicle of professional milestones and cosmic growth.
          </p>
        </div>

        {/* ── Experience Cards ── */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="experience-card group relative"
            >
              {/* Corner star decoration */}
              <span className="corner-star corner-star-exp" aria-hidden="true">
                ✦
              </span>

              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-cyan-500/50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-cyan-400 font-semibold text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm md:text-base text-gray-400 mt-2 md:mt-0 md:text-right">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-400"
                      >
                        <span className="text-cyan-400 mt-1 flex-shrink-0">
                          ▹
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Type badge */}
                  <div className="mt-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        exp.type === "development"
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {exp.type === "development"
                        ? "Development"
                        : "Leadership"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* Nebula blobs */
        .experience-section .nebula-blob {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
          pointer-events: none;
        }

        .exp-blob-1 {
          width: 520px;
          height: 520px;
          background: radial-gradient(
            circle,
            rgba(0, 184, 230, 0.12) 0%,
            transparent 70%
          );
          filter: blur(72px);
          top: -80px;
          right: -160px;
          animation: driftExpA 25s ease-in-out infinite alternate;
        }

        .exp-blob-2 {
          width: 420px;
          height: 420px;
          background: radial-gradient(
            circle,
            rgba(99, 40, 220, 0.14) 0%,
            transparent 70%
          );
          filter: blur(64px);
          bottom: -60px;
          left: -120px;
          animation: driftExpB 23s ease-in-out infinite alternate;
        }

        @keyframes driftExpA {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(40px, -40px);
          }
        }

        @keyframes driftExpB {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(-50px, 50px);
          }
        }

        /* Shooting stars */
        .experience-section .shooting-star {
          position: absolute;
          width: 2px;
          height: 60px;
          background: linear-gradient(
            to bottom,
            rgba(6, 182, 212, 0.8),
            transparent
          );
          border-radius: 50%;
          pointer-events: none;
        }

        .exp-star-1 {
          top: 20%;
          left: 10%;
          animation: shootExp1 3s ease-in infinite;
        }

        .exp-star-2 {
          top: 60%;
          right: 15%;
          animation: shootExp2 4s ease-in infinite;
          animation-delay: 2s;
        }

        @keyframes shootExp1 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50px, 100px) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes shootExp2 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(50px, 100px) rotate(45deg);
            opacity: 0;
          }
        }

        /* Experience title gradient */
        .experience-title-gradient {
          background: linear-gradient(
            135deg,
            #06b6d4 0%,
            #0ea5e9 50%,
            #2563eb 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Divider */
        .experience-divider {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(6, 182, 212, 0.6),
            transparent
          );
        }

        /* Corner star */
        .corner-star-exp {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 1rem;
          color: rgba(6, 182, 212, 0.6);
          transition: all 0.3s ease;
        }

        .experience-card:hover .corner-star-exp {
          color: rgba(6, 182, 212, 1);
          animation: twinkle 0.6s ease-in-out;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}

export default Experience;
