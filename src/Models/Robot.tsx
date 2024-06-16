// import { useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

import RobotGLB from "../assets/3D/robot.glb";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Mesh } from "three";
import TextTooltip from "../components/TextToolTip";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import Window from "../components/Window";

interface RobotProps extends MeshProps {
  setActiveCamera: Dispatch<SetStateAction<"spaceship" | "default">>;
  showPrompt: boolean;
  text: string;
  startedText?: string;
  buttonText?: string;
  windowChildren?: JSX.Element;
  title?: string;
}

const Robot = ({
  setActiveCamera,
  text,
  startedText,
  showPrompt,
  buttonText,
  title,
  windowChildren,
  ...props
}: RobotProps) => {
  const ref = useRef<Mesh>(null);
  const [started, setStarted] = useState(false);
  const { scene, animations } = useGLTF(RobotGLB);
  const copiedScene = useMemo(() => clone(scene), [scene]);
  const { actions } = useAnimations(animations, ref);
  // console.log("🚀 ~ Robot ~ actions:", actions);
  //   const RobotRef = useRef();
  //   useFrame((_, delta) => {
  //     if (isRotating) {
  //       RobotRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
  //     }
  //   });

  useEffect(() => {
    if (showPrompt) actions["metarig|metarigAction"]?.play();
    else actions["metarig|metarigAction"]?.stop();
  }, [actions, showPrompt]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={copiedScene} />
      {showPrompt && !(started && windowChildren) ? (
        <TextTooltip
          onClick={() => {
            if (!windowChildren) setActiveCamera("spaceship");
            setStarted(true);
          }}
          started={started}
          text={startedText ? (started ? startedText : text) : text}
          buttonText={buttonText}
        />
      ) : null}
      {started && windowChildren && showPrompt && (
        <Window onClose={() => setStarted(false)} title={title}>
          {windowChildren}
        </Window>
      )}
    </mesh>
  );
};

export default Robot;
