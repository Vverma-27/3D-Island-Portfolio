// import { useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

import RobotGLB from "../assets/3D/robot.glb";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Mesh } from "three";
import TextTooltip from "../components/TextToolTip";

interface RobotProps extends MeshProps {
  setActiveCamera: Dispatch<SetStateAction<"spaceship" | "default">>;
}

const Robot = ({ setActiveCamera, ...props }: RobotProps) => {
  const ref = useRef<Mesh>(null);
  const { scene, animations } = useGLTF(RobotGLB);
  const { actions } = useAnimations(animations, ref);
  // console.log("🚀 ~ Robot ~ actions:", actions);
  //   const RobotRef = useRef();
  //   useFrame((_, delta) => {
  //     if (isRotating) {
  //       RobotRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
  //     }
  //   });
  useEffect(() => {
    actions["metarig|metarigAction"]?.play();
  }, [actions]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
      <TextTooltip onClick={() => setActiveCamera("spaceship")} />
    </mesh>
  );
};

export default Robot;
