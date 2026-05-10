import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Atmosphere glow shell ─── */
const Atmosphere = ({ color }) => {
  const meshRef = useRef();
  return (
    <mesh ref={meshRef} scale={1.18}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

/* ─── Outer rim halo ─── */
const Halo = ({ color }) => (
  <mesh scale={1.38}>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial
      color={color}
      transparent
      opacity={0.06}
      side={THREE.BackSide}
    />
  </mesh>
);

/* ─── Cloud band ring ─── */
const CloudRing = ({ color }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[1.45, 0.04, 6, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
};

/* ─── Planet sphere ─── */
const PlanetMesh = ({ colors, hasRing }) => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group>
      {/* Fixed atmosphere layers */}
      <Atmosphere color={colors.glow} />
      <Halo color={colors.glow} />

      {/* Optional ring */}
      {hasRing && <CloudRing color={colors.ring} />}

      {/* Core planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color={colors.base}
          emissive={colors.emissive}
          emissiveIntensity={0.35}
          shininess={80}
          specular={new THREE.Color(colors.specular)}
        />
      </mesh>
    </group>
  );
};

/* ─── Main export ─── */
const PlanetCanvas = ({ icon, colors, hasRing }) => {
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "400px" } // Load slightly before it comes into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      {isVisible && (
        <Canvas
          frameloop="always"
          dpr={1}
          camera={{ position: [0, 0, 3.2], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <Suspense fallback={null}>
            {/* Key lights */}
            <ambientLight intensity={0.4} />
            <pointLight position={[6, 6, 6]} intensity={2.5} color="#ffffff" />
            <pointLight
              position={[-4, -2, -4]}
              intensity={0.8}
              color={colors.glow}
            />

            <PlanetMesh colors={colors} hasRing={hasRing} />
          </Suspense>
        </Canvas>
      )}

      {/* Skill icon centred over the planet */}
      {icon && (
        <img
          src={icon}
          alt="skill icon"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            objectFit: "contain",
            pointerEvents: "none",
            filter: `drop-shadow(0 0 10px ${colors.glow}) drop-shadow(0 0 4px #fff)`,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default PlanetCanvas;
