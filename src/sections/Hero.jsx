import { DitheringShader } from "@/components/dithering-shader";
import { EncryptedText } from "@/components/ui/encrypted-text";

function Hero() {
  return (
    <div className="hero min-h-screen flex items-center justify-between px-8 pt-16">
      <div className="flex-1 pr-8">
        <h1 className="text-5xl font-bold text-white flex flex-wrap items-center gap-[0.25em]">
          <EncryptedText text="Hi," />
          <EncryptedText text="Youssef" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400" />
          <EncryptedText text="here." />
        </h1>
        <p className="py-6 text-white">
          I'm a front-end developer with a strong foundation in computer science, focused on building fast, clean, and user-friendly applications. I don't just write code—I solve problems and bring ideas to life through real projects. 
          Currently growing my skills in JavaScript and modern web technologies while building projects that reflect real-world value.
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <DitheringShader
          shape="sphere"
          type="random"
          colorFront="#b4b1b8"
          pxSize={2}
          speed={1.5}
        />
      </div>
    </div>
  );
}

export default Hero;
