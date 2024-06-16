// import { useRef } from "react";
//@ts-nocheck
import { useGLTF } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";

import OrcGLB from "../assets/3D/orc.glb";
import { useMemo, useRef, useState } from "react";
import TextTooltip from "../components/TextToolTip";
import { Euler, Mesh, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

interface OrcProps extends MeshProps {
  showPrompt: boolean;
  alive: boolean;
}

const Orc = ({ showPrompt, alive, ...props }: OrcProps) => {
  const orcRef = useRef<Mesh>(null);
  const [opacity, setOpacity] = useState(1);

  //   const [alive,setAlive] = useState()
  const { scene } = useGLTF(OrcGLB);
  // console.log("🚀 ~ Orc ~ scene:", scene);
  const copiedScene = useMemo(() => clone(scene), [scene]);
  useFrame((_, delta) => {
    if (alive || !orcRef.current?.visible) return;
    // Calculate opacity reduction per frame based on duration
    const opacityReduction = (1 / 1.5) * delta;
    setOpacity((prevOpacity) => Math.max(prevOpacity - opacityReduction, 0));
    console.log(orcRef.current.material);
    if (orcRef.current) {
      copiedScene.traverse((child) => {
        if (child.isMesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.opacity = opacity;
              material.transparent = true;
            });
          } else {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        }
      });

      // Check if opacity has reached 0, then remove the mesh from the scene
      if (opacity <= 0) {
        orcRef.current.visible = false;
        // Optionally, you can also remove the mesh from the scene graph
        // if it's no longer needed by uncommenting the line below
        orcRef.current.parent?.remove(orcRef.current);
      }
    }
  });

  return (
    <mesh {...props} ref={orcRef}>
      {showPrompt ? (
        <TextTooltip
          text={
            alive
              ? "You will have to get by me. Use Mouse to shoot"
              : "Arggghh you killed me."
          }
          scale={new Vector3(50, 50, 50)}
          position={new Vector3(300, 300, 0)}
          rotation={new Euler(0, Math.PI / 10, 0)}
        />
      ) : null}
      <primitive object={copiedScene} />
    </mesh>
  );
};

export default Orc;
