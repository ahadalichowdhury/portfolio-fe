"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 150;
const PARTICLE_SIZE = 2;
const CONNECTION_DISTANCE = 100;
const PARTICLE_COLOR = 0x00ff00; // Green color
const BACKGROUND_COLOR = 0x050505; // Very dark gray, almost black

export default function AttractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    if (!containerRef.current) return;

    // Store container reference
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 300;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(BACKGROUND_COLOR, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles setup
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      positions[i] = Math.random() * window.innerWidth - window.innerWidth / 2;
      positions[i + 1] =
        Math.random() * window.innerHeight - window.innerHeight / 2;
      positions[i + 2] = Math.random() * 200 - 100;

      velocities[i] = Math.random() * 0.2 - 0.1;
      velocities[i + 1] = Math.random() * 0.2 - 0.1;
      velocities[i + 2] = Math.random() * 0.2 - 0.1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      color: PARTICLE_COLOR,
      size: PARTICLE_SIZE,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Lines setup
    const lineMaterial = new THREE.LineBasicMaterial({
      color: PARTICLE_COLOR,
      transparent: true,
      opacity: 0.3,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const line = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(line);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position
          .array as Float32Array;
        const velocities = particlesRef.current.geometry.attributes.velocity
          .array as Float32Array;
        const linePositions: number[] = [];

        for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
          // Update position based on velocity
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Boundary check and velocity reversal
          if (Math.abs(positions[i]) > window.innerWidth / 2)
            velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > window.innerHeight / 2)
            velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;

          // Connect particles within range
          for (let j = i + 3; j < PARTICLE_COUNT * 3; j += 3) {
            const dx = positions[i] - positions[j];
            const dy = positions[i + 1] - positions[j + 1];
            const dz = positions[i + 2] - positions[j + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < CONNECTION_DISTANCE) {
              linePositions.push(
                positions[i],
                positions[i + 1],
                positions[i + 2]
              );
              linePositions.push(
                positions[j],
                positions[j + 1],
                positions[j + 2]
              );
            }
          }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        lineGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(linePositions, 3)
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Handle mouse move
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position
          .array as Float32Array;
        const velocities = particlesRef.current.geometry.attributes.velocity
          .array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
          const dx =
            (mouseRef.current.x * window.innerWidth) / 2 - positions[i];
          const dy =
            (-mouseRef.current.y * window.innerHeight) / 2 - positions[i + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            velocities[i] += dx * 0.0001;
            velocities[i + 1] += dy * 0.0001;
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Optional: dispose of resources
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0" />;
}
