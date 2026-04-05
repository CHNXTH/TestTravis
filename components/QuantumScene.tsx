
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

// Fix React Three Fiber intrinsic element type errors by using component variables cast to any
const Group = 'group' as any;
const AmbientLight = 'ambientLight' as any;

function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  
  const count = 150; // Number of particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    /* Use Group variable instead of intrinsic tag to fix TS error */
    <Group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </Group>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Use AmbientLight variable instead of intrinsic tag to fix TS error */}
        <AmbientLight intensity={0.5} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return null; // Unused in this version
};
