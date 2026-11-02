import { Suspense, lazy, useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./sections/Hero";
import { Navbar } from "@/components/Navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";

// Code-split heavy Three.js / WebGL sections
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));

/**
 * Defers loading & evaluating heavy 3D chunks until the user is near each section.
 * Prevents Three.js (880 kB) from downloading or blocking the main thread on initial load.
 */
function ViewportGate({ children, minHeight = "600px", rootMargin = "100px" }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {inView ? children : null}
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      throttleDelay: 99,
    });
  }, []);
  return (
    <div className="relative w-full bg-neutral-950">
      {/* Single stars background that covers the entire page */}
      <StarsBackground className="fixed inset-0 w-full h-full" />
      <Navbar />
      <div className="relative z-10 w-full">
        <Hero />
        <ViewportGate minHeight="600px" rootMargin="0px">
          <Suspense fallback={<div className="w-full min-h-[600px]" />}>
            <Skills />
          </Suspense>
        </ViewportGate>
        <Experience />
        <Projects />
        <ViewportGate minHeight="600px" rootMargin="100px">
          <Suspense fallback={<div className="w-full min-h-[600px]" />}>
            <Contact />
          </Suspense>
        </ViewportGate>
      </div>
    </div>
  );
}

export default App;
