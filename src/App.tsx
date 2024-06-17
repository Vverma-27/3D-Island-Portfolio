import { Canvas, useFrame } from "@react-three/fiber";
import Island from "./Models/Island";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import Space from "./Models/Space";
import Spaceship from "./Models/Spaceship";
import Orc from "./Models/Orc";
import Loader from "./components/Loader";
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
      zoom={spaceship ? 0.8 : 1}
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
  const [isRotating, setIsRotating] = useState(false);
  const [orcAlive, setOrcAlive] = useState(true);
  const [pathIndex, setPathIndex] = useState(0);

  return (
    <div className="h-full">
      <Canvas
      // camera={}
      >
        <Suspense fallback={<Loader />}>
          <CameraController activeCamera={activeCamera} />
          <directionalLight position={[1, 100, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {/* 
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          /> */}
          <hemisphereLight
            // skyColor="#b1e1ff"
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
            activeCamera={activeCamera}
            setActiveCamera={setActiveCamera}
            pathIndex={pathIndex}
          />
          <Spaceship
            scale={
              activeCamera === "spaceship"
                ? [0.044, 0.044, 0.044]
                : [0.05, 0.05, 0.05]
            }
            position={[15, 1, 5]}
            {...{ pathIndex, setPathIndex }}
            // isRotating={isRotating}
            rotation={[0, -Math.PI / 5, 0]}
            activeCamera={activeCamera}
            orcAlive={orcAlive}
            onKill={() => {
              setOrcAlive(false);
            }}
          />
          {pathIndex === 2 && (
            <Orc
              position={[7.25, 1.5, -1.5]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.0023, 0.0023, 0.0023]}
              showPrompt={pathIndex === 2}
              alive={orcAlive}
            />
          )}
          {/* {orcPositions?.map(({ position, rotation }) => {
            return <Orc position={position} rotation={rotation} />;
          })} */}
          {/* <TextTooltip /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
