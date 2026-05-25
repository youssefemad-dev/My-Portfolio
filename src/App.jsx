import Hero from "./sections/Hero";
import { Navbar } from "@/components/Navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="relative w-full bg-neutral-950">
      {/* Single stars background that covers the entire page */}
      <StarsBackground className="fixed inset-0 w-full h-full" />
      <Navbar />
      <div className="relative z-10 w-full">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
