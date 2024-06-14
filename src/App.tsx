import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Island from "./Models/Island";
import * as THREE from "three";
import { SetStateAction, Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import Space from "./Models/Space";
import Spaceship from "./Models/Spaceship2";
import Robot from "./Models/Robot";

const CameraController = ({
  activeCamera,
}: {
  activeCamera: "spaceship" | "default";
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const spaceship = activeCamera === "spaceship";
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(16, 1, 4.5);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      near={0.1}
      zoom={spaceship ? 0.5 : 1}
      far={300}
      position={[19, 2, 6]}
      makeDefault
    />
  );
};

function App() {
  const [activeCamera, setActiveCamera] = useState<"spaceship" | "default">(
    "default"
  );
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  return (
    <div className="h-full">
      <Canvas
      // camera={}
      >
        <Suspense>
          <CameraController activeCamera={activeCamera} />
          <directionalLight position={[1, 100, 1]} intensity={2} />
          {/* <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          /> */}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          {/* <OrbitControls /> */}
          <Space
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            isRotating={isRotating}
          />
          <Island
            scale={[0.6, 0.6, 0.6]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            activeCamera={activeCamera}
            setActiveCamera={setActiveCamera}
          />
          <Spaceship
            scale={
              activeCamera === "spaceship"
                ? [0.044, 0.044, 0.044]
                : [0.05, 0.05, 0.05]
            }
            position={[15, 1, 5]}
            // isRotating={isRotating}
            rotation={[0, -Math.PI / 5, 0]}
            activeCamera={activeCamera}
          />
          {/* <TextTooltip /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
