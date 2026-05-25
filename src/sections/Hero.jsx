import { DitheringShader } from "@/components/dithering-shader";
import { EncryptedText } from "@/components/ui/encrypted-text";

function Hero() {
  return (
    <div className="hero min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-8 pt-24 md:pt-16 pb-12 gap-8 md:gap-0">
      <div className="flex-1 pr-0 md:pr-8 text-center md:text-left z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white flex flex-wrap justify-center md:justify-start items-center gap-[0.25em]">
          <EncryptedText text="Hi," />
          <EncryptedText
            text="Youssef"
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
          />
          <EncryptedText text="here." />
        </h1>
        <p className="py-6 text-white text-sm md:text-base max-w-2xl mx-auto md:mx-0">
          I'm a Computer Science student with a strong foundation in web
          development, focused on building fast, clean, and user-friendly
          applications. I transform ideas into real, production-ready projects
          using React, JavaScript, TypeScript, and modern web technologies.
        </p>
      </div>
      <div className="flex justify-center md:justify-end w-full max-w-[200px] sm:max-w-[250px] aspect-square md:aspect-auto md:max-w-none md:flex-1">
        <DitheringShader
          shape="sphere"
          type="random"
          colorFront="#b4b1b8"
          colorBack="transparent"
          pxSize={2}
          speed={1.5}
        />
      </div>
    </div>
  );
}

export default Hero;
