"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();
  const mousePosition = useMousePosition();
  
  const isMobile = size.width < 768;
  const PARTICLE_COUNT = isMobile ? 1500 : 4000;
  const BASE_SIZE = isMobile ? 0.12 : 0.08;
  const ACCENT_COLOR = 0x00ff7f;

  const positions = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Basic scatter
      if (Math.random() > 0.3) {
        // Uniform sphere distribution
        const r = 80 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      } else {
        // Lattice/grid loose distribution
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
    }
    return positions;
  }, [PARTICLE_COUNT]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  // Target rotations based on mouse
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Pulse opacity
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Normalizing coords to -1 to 1 for tilt
    const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;

    targetRotation.current.x = mouseY * 0.0002;
    targetRotation.current.y = mouseX * 0.0003;

    pointsRef.current.rotation.x += (targetRotation.current.x - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetRotation.current.y - pointsRef.current.rotation.y) * 0.05 + 0.0003;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={ACCENT_COLOR}
        size={BASE_SIZE}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60, near: 0.1, far: 1000 }}
        dpr={(typeof window !== 'undefined') ? Math.min(window.devicePixelRatio, 1.5) : 1}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
