import { useEffect, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PlanetCanvas from "@/components/PlanetCanvas";

function Skills() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const skillsData = [
    {
      name: "React",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      colors: {
        base: "#1a3a5c",
        emissive: "#0ea5e9",
        glow: "#38bdf8",
        specular: "#7dd3fc",
        ring: "#38bdf8",
      },
      hasRing: false,
    },
    {
      name: "JavaScript",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      colors: {
        base: "#3b2f00",
        emissive: "#eab308",
        glow: "#facc15",
        specular: "#fde68a",
        ring: "#facc15",
      },
      hasRing: true,
    },
    {
      name: "Tailwind CSS",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
      colors: {
        base: "#0c3040",
        emissive: "#06b6d4",
        glow: "#22d3ee",
        specular: "#a5f3fc",
        ring: "#22d3ee",
      },
      hasRing: false,
    },
    {
      name: "HTML5",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
      colors: {
        base: "#3b1a0a",
        emissive: "#ea580c",
        glow: "#fb923c",
        specular: "#fed7aa",
        ring: "#fb923c",
      },
      hasRing: true,
    },
    {
      name: "CSS3",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
      colors: {
        base: "#0a1a3b",
        emissive: "#2563eb",
        glow: "#60a5fa",
        specular: "#bfdbfe",
        ring: "#60a5fa",
      },
      hasRing: false,
    },
    {
      name: "Git",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
      colors: {
        base: "#2d0a0a",
        emissive: "#dc2626",
        glow: "#f87171",
        specular: "#fecaca",
        ring: "#f87171",
      },
      hasRing: true,
    },
    {
      name: "Vite",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-plain.svg",
      colors: {
        base: "#1a0a2e",
        emissive: "#7c3aed",
        glow: "#a78bfa",
        specular: "#ddd6fe",
        ring: "#a78bfa",
      },
      hasRing: false,
    },
    {
      name: "TypeScript",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      colors: {
        base: "#0a1f3b",
        emissive: "#2563eb",
        glow: "#60a5fa",
        specular: "#bfdbfe",
        ring: "#60a5fa",
      },
      hasRing: true,
    },
  ];

  return (
    <div id="skills" className="w-full min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Skills &amp; Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-400">
            Technologies and tools I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="flex flex-col items-center group"
            >
              {/* Planet canvas */}
              <div
                className="w-44 h-44 mb-4 rounded-full overflow-hidden transition-all duration-500 border-2 border-gray-700 skill-planet"
                style={{
                  "--glow-color": skill.colors.glow,
                }}
              >
                <Suspense
                  fallback={
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${skill.colors.emissive}, #0a0a0a)`,
                      }}
                    />
                  }
                >
                  <PlanetCanvas
                    icon={skill.icon}
                    colors={skill.colors}
                    hasRing={skill.hasRing}
                  />
                </Suspense>
              </div>

              {/* Skill Name */}
              <h3
                className="text-xl font-bold text-white text-center transition-colors duration-300"
                style={{ textShadow: `0 0 12px ${skill.colors.glow}88` }}
              >
                {skill.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="text-center" data-aos="fade-up">
          <p className="text-gray-500 text-sm">
            Continuously learning and exploring new technologies
            <span className="inline-block ml-2 text-cyan-400">✦</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .skill-planet {
          border-color: rgba(107, 114, 128, 0.5);
          box-shadow: none;
        }

        .skill-planet:hover {
          border-color: var(--glow-color);
          box-shadow:
            0 0 24px 4px var(--glow-color),
            0 0 8px 2px var(--glow-color);
        }
      `}</style>
    </div>
  );
}

export default Skills;
