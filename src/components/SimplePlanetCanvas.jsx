import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

const SimplePlanet = () => {
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <meshPhongMaterial color="#0ea5e9" shininess={100} />
      </mesh>
    </Float>
  );
};

const SimplePlanetCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 3], fov: 75 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <OrbitControls enableZoom={false} autoRotate />
        <SimplePlanet />
      </Suspense>
    </Canvas>
  );
};

export default SimplePlanetCanvas;
