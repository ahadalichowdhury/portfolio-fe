"use client";

import { Environment, Float, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CodeSnippet({ position }: { position: [number, number, number] }) {
  const snippets = [
    "npm install future",
    "git commit -m 'Success'",
    "kubectl get pods",
    "docker build .",
  ];
  const text = useMemo(
    () => snippets[Math.floor(Math.random() * snippets.length)],
    []
  );
  return (
    <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        position={position}
        fontSize={0.5}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
}

function AnimatedCube() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ff00" wireframe />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
  });
  return (
    <group ref={group}>
      <AnimatedCube />
      {[...Array(20)].map((_, i) => (
        <CodeSnippet
          key={i}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ]}
        />
      ))}
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 0, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
