import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── Uses public NASA Blue Marble textures via Github raw ── */
const EARTH_TEXTURE =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_BUMP =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";
const CLOUD_TEXTURE =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png";

/* ── Spinning Earth mesh ── */
function EarthMesh() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, bumpMap, specMap, cloudMap] = useTexture([
    EARTH_TEXTURE,
    EARTH_BUMP,
    EARTH_SPECULAR,
    CLOUD_TEXTURE,
  ]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.12;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.14;
  });

  return (
    <group>
      {/* Atmosphere glow */}
      <mesh scale={1.22}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer halo */}
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshLambertMaterial
          color="#1a237e"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.008}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshLambertMaterial
          map={cloudMap}
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </mesh>

      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          specularMap={specMap}
          specular={new THREE.Color(0x444444)}
          shininess={12}
        />
      </mesh>
    </group>
  );
}

/* ── Main export ── */
export default function EarthCanvas() {
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 2.8], fov: 50 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
          }}
          dpr={1}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Ambient + directional sunlight */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 3, 5]} intensity={2.2} color="#fff8e1" />
          <directionalLight position={[-6, -2, -4]} intensity={0.15} color="#90caf9" />

          {/* Background star field inside canvas */}
          <Stars
            radius={120}
            depth={50}
            count={800}
            factor={4}
            saturation={0}
            fade
            speed={0.4}
          />

          <EarthMesh />
        </Canvas>
      )}
    </div>
  );
}
