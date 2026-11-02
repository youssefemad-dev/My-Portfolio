import { Suspense, lazy, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./sections/Hero";
import { Navbar } from "@/components/Navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";

// Code-split heavy Three.js / WebGL sections to drastically reduce initial JS bundle size
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));

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
        <Suspense fallback={<div className="w-full min-h-[600px]" />}>
          <Skills />
        </Suspense>
        <Experience />
        <Projects />
        <Suspense fallback={<div className="w-full min-h-[600px]" />}>
          <Contact />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
