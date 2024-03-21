// import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useTexture } from "@react-three/drei";
// import { useGLTF } from '@react-three/drei';

const ThreeDLogo = () => {
  const gltf = useLoader(GLTFLoader, "./models/worker.glb");
  const [colorMap] = useTexture(["./textures/texture.jpg"]);
  // const group = useRef();
  // const { animations } = useGLTF("./models/worker.glb");
  // const { actions, mixer, ref } = useAnimations(animations, group);

  return <primitive object={gltf.scene} map={colorMap} scale={1.5} />;
};

export default ThreeDLogo;
