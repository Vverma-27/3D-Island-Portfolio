// import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps, MeshProps, useFrame } from "@react-three/fiber";

import SpaceGLB from "../assets/3D/space.glb";
import { useRef } from "react";
import { Mesh } from "three";

interface SpaceProps extends MeshProps {
  isRotating: boolean;
}

const Space = ({ isRotating, ...props }: SpaceProps) => {
  const space = useGLTF(SpaceGLB);
  const spaceRef = useRef<Mesh>();
  // useFrame((_, delta) => {
  //   if (!spaceRef.current) return;
  //   if (isRotating) {
  //     spaceRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
  //   }
  // });

  return (
    <mesh {...props} ref={spaceRef}>
      <primitive object={space.scene} />
    </mesh>
  );
};

export default Space;
