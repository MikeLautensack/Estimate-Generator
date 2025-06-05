"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "@/components/models/Worker";
import { OrbitControls } from "@react-three/drei";

export default function Scene3D() {
  return (
    <div className="w-[300px] h-[300px]">
      <Canvas
        id="canvas"
        className="bg-transparent"
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={4.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Model scale={1.8} />
      </Canvas>
    </div>
  );
}
