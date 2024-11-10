import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';


function FloatingParticles() {
  const particlesRef = useRef<Mesh[]>([]);
  
  useFrame((state) => {
    particlesRef.current.forEach((particle, i) => {
      const t = state.clock.getElapsedTime() + i * 100;
      particle.position.x = Math.sin(t * 0.1) * 2;
      particle.position.y = Math.cos(t * 0.2) * 2;
      particle.rotation.x = t * 0.1;
      particle.rotation.y = t * 0.2;
    });
  });

  return (
    <>
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (particlesRef.current[i] = el as Mesh)}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
          ]}
        >
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial
            color={`hsl(${Math.random() * 60 + 250}, 50%, 50%)`}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-50" style={{ margin: 0, padding: 0 }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}