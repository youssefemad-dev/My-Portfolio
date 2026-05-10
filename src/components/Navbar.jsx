import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      data-aos="fade-down"
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10"
    >
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            box-shadow:
              0 0 10px rgba(21, 94, 137, 0.3),
              inset 0 0 10px rgba(21, 94, 137, 0.1);
          }
          50% {
            box-shadow:
              0 0 20px rgba(21, 94, 137, 0.5),
              inset 0 0 15px rgba(21, 94, 137, 0.2);
          }
        }

        .nav-brand {
          animation: float 3s ease-in-out infinite;
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #22d3ee;
          text-shadow:
            0 0 15px rgba(34, 211, 238, 0.8),
            0 0 25px rgba(21, 94, 137, 0.5);
        }

        .mobile-menu {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-button {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="nav-brand text-2xl font-bold flex items-center">
              <span className="text-white mr-2">✦</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Youssef Emad
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#contact" className="menu-button px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 transition-all duration-300 text-sm font-medium bg-cyan-400/5 hover:bg-cyan-400/10">
              Get In Touch
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-menu md:hidden bg-black/80 border-b border-cyan-500/20 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="w-full mt-4 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 transition-all duration-300 text-sm font-medium bg-cyan-400/5 hover:bg-cyan-400/10 text-center block">
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
