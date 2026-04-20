'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Hero3D.module.css';

function Particles({ count = 2000 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShape({ position, color, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={mesh} args={[1, 1]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </Icosahedron>
    </Float>
  );
}

function CentralOrb() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.08);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#7b2ff7"
          emissive="#00d4ff"
          emissiveIntensity={0.15}
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function GlowRing() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Torus ref={mesh} args={[3, 0.04, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.8}
        transparent
        opacity={0.5}
      />
    </Torus>
  );
}

function GlowRing2() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <Torus ref={mesh} args={[3.5, 0.02, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#7b2ff7"
        emissive="#7b2ff7"
        emissiveIntensity={0.6}
        transparent
        opacity={0.3}
      />
    </Torus>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2ff7" />
      <pointLight position={[0, 10, -10]} intensity={0.3} color="#ff2d95" />

      <CentralOrb />
      <GlowRing />
      <GlowRing2 />

      <FloatingShape position={[-5, 2, -3]} color="#00d4ff" speed={0.8} />
      <FloatingShape position={[5, -1, -4]} color="#7b2ff7" speed={1.2} />
      <FloatingShape position={[-3, -3, -2]} color="#ff2d95" speed={0.6} />
      <FloatingShape position={[4, 3, -5]} color="#00f5a0" speed={1} />

      <Particles count={2500} />
    </>
  );
}

export default function Hero3D() {
  return (
    <section className={styles.hero} id="hero">
      {/* 3D Background */}
      <div className={styles.canvasContainer}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          Next Generation Platform
        </div>

        <h1 className={styles.title}>
          We Build The
          <br />
          <span className={styles.titleGradient}>Future Digital</span>
          <br />
          Experience
        </h1>

        <p className={styles.subtitle}>
          DekNek empowers businesses with cutting-edge technology solutions,
          transforming ideas into extraordinary digital experiences that drive growth.
        </p>

        <div className={styles.buttons}>
          <a href="#contact" className="btn-primary">
            <span>Start Your Project</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#about" className="btn-secondary">
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>150+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Team Members</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
