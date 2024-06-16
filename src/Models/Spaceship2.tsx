import {
  OrbitControls,
  PerspectiveCamera,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import SpaceshipGLB from "../assets/3D/spaceship.glb";
import PlasmaBeam from "./PlasmaBeam";

interface SpaceshipProps extends MeshProps {
  activeCamera: "spaceship" | "default";
  pathIndex: number;
  setPathIndex: Dispatch<SetStateAction<number>>;
  onKill: () => void;
  orcAlive: boolean;
}

const Spaceship = ({
  activeCamera,
  pathIndex,
  setPathIndex,
  onKill,
  orcAlive,
  ...props
}: SpaceshipProps) => {
  const { scene, animations } = useGLTF(SpaceshipGLB);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const spaceshipRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, spaceshipRef);
  const { set } = useThree();
  const [showPlasmaBeam, setShowPlasmaBeam] = useState(false);
  const [initialized, setInitialized] = useState(false);
  //   console.log("🚀 ~ Spaceship ~ actions:", spaceshipRef.current?.position);
  //   console.log("🚀 ~ Spaceship ~ rotation:", spaceshipRef.current?.rotation);
  const [moving, setMoving] = useState(false);

  const path = [
    {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -115.6733037748342,
        8.61399999999998,
        -72.05401668677555
      ),
      rotation: new THREE.Euler(0, 2.732, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -209.19850571916297,
        17.613999999999976,
        -26.05445654802158
      ),
      rotation: new THREE.Euler(0, 3.632, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -242.71610588092514,
        25.61200000000009,
        -8.336152825576129
      ),
      rotation: new THREE.Euler(0, 2.3920000000000017, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -379.800256971083,
        73.22600000000011,
        -124.86007641993007
      ),
      rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -429.5231746779945,
        82.81399999999957,
        -102.49134770054597
      ),
      rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -429.5231746779945,
        82.81399999999957,
        -102.49134770054597
      ),
      rotation: new THREE.Euler(0, -Math.PI / 3, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(-380, 77, -25),
      rotation: new THREE.Euler(0, 5.371999999999974, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -298.0715726541738,
        98.91399999999865,
        115.3621856551187
      ),
      rotation: new THREE.Euler(0, 5.371999999999974, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(-298, 120, 150),
      rotation: new THREE.Euler(0, Math.PI - Math.PI / 10, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -521.5573443254968,
        129.02599999999694,
        68.52592085632755
      ),
      rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -521.5573443254968,
        129.02599999999694,
        68.52592085632755
      ),
      rotation: new THREE.Euler(0, -Math.PI / 1.8, 0, "XYZ"),
    },
    {
      position: new THREE.Vector3(
        -548.388577681454,
        130.01399999999688,
        127.2065685430205
      ),
      rotation: new THREE.Euler(0, 5.651999999999968, 0, "XYZ"),
    },
  ];
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [moveSpeed, setMoveSpeed] = useState(0);
  const [upSpeed, setUpSpeed] = useState(0);

  const bobbingUp = useRef(true);
  const bobbingRange = 0.4;
  const bobbingSpeed = 0.009;

  useEffect(() => {
    if (activeCamera === "spaceship") {
      if (pathIndex !== 2) actions["FLY"]?.reset().play();
      else actions["FLY"]?.reset().stop();
    }
  }, [activeCamera, actions, pathIndex]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        setRotationSpeed(0.02);
        break;
      case "ArrowRight":
        setRotationSpeed(-0.02);
        break;
      case "ArrowUp":
        setMoveSpeed(-0.35);
        break;
      case "ArrowDown":
        setMoveSpeed(0.35);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        setRotationSpeed(0);
        break;
      case "ArrowUp":
      case "ArrowDown":
        setMoveSpeed(0);
        break;
      default:
        break;
    }
  };

  // const handleMouseDown = () => {
  //   if (spaceshipRef.current) spaceshipRef.current.position.y += 0.02;
  // };
  const handleMouseDown = (event) => {
    console.log("🚀 ~ handleMouseDown ~ event:", event);
    // Get the vertical midpoint of the viewport
    const { innerHeight } = window;
    console.log("🚀 ~ handleMouseDown ~ innerHeight:", innerHeight);
    console.log("🚀 ~ handleMouseDown ~ event.clientY:", event.clientY);
    const midpoint = innerHeight / 2;

    // Determine if the mouse press is in the top or bottom half of the screen
    if (event.clientY <= midpoint) {
      // Top half of the screen
      setUpSpeed(0.1); // Move up
    } else {
      // Bottom half of the screen
      setUpSpeed(-0.1); // Move down
    }
  };

  const handleMouseUp = () => {
    setUpSpeed(0); // Stop movement
  };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("keyup", handleKeyUp);

  //   window.addEventListener("mousedown", handleMouseDown);
  //   window.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("keyup", handleKeyUp);
  //     window.removeEventListener("mousedown", handleMouseDown);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp]);

  useEffect(() => {
    const handleKeyDown1 = (event) => {
      if (event.key === "ArrowUp" && !moving) {
        if (pathIndex === 2 && orcAlive) {
          const currPos = spaceshipRef.current?.position;
          spaceshipRef.current?.position.lerp(
            new THREE.Vector3((currPos?.x || 0) - 4, currPos?.y, currPos?.z),
            0.5
          );
          setTimeout(() => {
            spaceshipRef.current?.position.lerp(currPos, 0.2);
          }, 3000);
          return;
        }
        setPathIndex((prevIndex) => Math.min(prevIndex + 1, path.length - 1));
        setMoving(true);
      } else if (event.key === "ArrowDown" && !moving) {
        setPathIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        setMoving(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown1);

    return () => {
      window.removeEventListener("keydown", handleKeyDown1);
    };
  }, [moving, orcAlive, spaceshipRef.current, pathIndex]);

  useEffect(() => {
    const handleClick = () => {
      if (pathIndex === 2) {
        setShowPlasmaBeam(true);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [pathIndex]);

  useFrame(() => {
    if (!spaceshipRef.current) return;
    if (activeCamera === "spaceship") {
      if (initialized) {
        const targetPosition = path[pathIndex].position;
        const targetRotation = new THREE.Quaternion().setFromEuler(
          path[pathIndex].rotation
        );

        const positionReached =
          spaceshipRef.current.position.distanceTo(targetPosition) < 0.1;
        const rotationReached =
          spaceshipRef.current.quaternion.angleTo(targetRotation) < 0.1;

        if (positionReached && rotationReached) {
          if (moving) setMoving(false);
        } else {
          spaceshipRef.current.position.lerp(targetPosition, 0.05);
          spaceshipRef.current.quaternion.slerp(targetRotation, 0.05);
        }
        // spaceshipRef.current.rotation.y += rotationSpeed;
        // const forward = new THREE.Vector3(-1, 0, 0);
        // forward.applyQuaternion(spaceshipRef.current.quaternion);
        // forward.normalize();
        // if (upSpeed) {
        //   spaceshipRef.current.position.y += upSpeed;
        // }
        // // Update the position based on the forward direction
        // spaceshipRef.current.position.add(forward.multiplyScalar(moveSpeed));
      } else {
        // Move the spaceship up in the y-axis until y = 4
        if (spaceshipRef.current.position.y < 7) {
          spaceshipRef.current.position.y += 0.05; // Adjust the speed as needed
        }
        // Rotate the spaceship on the y-axis by 45 degrees (PI/4 radians)
        else if (
          spaceshipRef.current.position.y >= 4 &&
          spaceshipRef.current.rotation.y < Math.PI
        ) {
          spaceshipRef.current.rotation.y += 0.004; // Adjust the speed as needed
        }
        // else if (
        //   spaceshipRef.current.position.y >= 4 &&
        //   spaceshipRef.current.rotation.y >= Math.PI &&
        //   spaceshipRef.current.position.z > -20
        // ) {
        //   spaceshipRef.current.position.z -= 0.05;
        // }
        else
          setTimeout(() => {
            if (cameraRef.current && spaceshipRef.current) {
              // cameraRef.current.position.set(
              //   spaceshipRef.current.position.x,
              //   0, // Set y position to 4
              //   spaceshipRef.current.position.z - 1
              // );
              // cameraRef.current.lookAt(0, 0, 0);
              // cameraRef.current.rotation.set(0, Math.PI / 2, 0);
              set({ camera: cameraRef.current });
              setInitialized(true);
            }
            // cameraRef.current.rotation.y = Math.PI / 4; // Rotate by 45 degrees (PI/4 radians)
          }, 300);
      }
    } else {
      if (bobbingUp.current) {
        spaceshipRef.current.position.y += bobbingSpeed;
        if (spaceshipRef.current.position.y >= bobbingRange) {
          bobbingUp.current = false;
        }
      } else {
        spaceshipRef.current.position.y -= bobbingSpeed;
        if (spaceshipRef.current.position.y <= -bobbingRange) {
          bobbingUp.current = true;
        }
      }
    }
  });
  // useEffect(() => {
  //   let id: any;
  //   if (
  //     activeCamera === "spaceship" &&
  //     cameraRef.current &&
  //     spaceshipRef.current
  //   ) {
  //     // Set camera position and rotation after spaceship rises and rotates
  //     id = setTimeout(() => {
  //     }, 1000); // Delay setting the camera to ensure animation is complete
  //   }
  //   return () => clearTimeout(id);
  // }, [activeCamera, set]);

  return (
    <mesh {...props}>
      <group ref={spaceshipRef}>
        <primitive object={scene} />
        <PerspectiveCamera
          ref={cameraRef}
          rotation={[0, -Math.PI / 2, 0]}
          near={0.1}
          far={1200}
          zoom={0.4}
          // makeDefault={activeCamera === "spaceship"}
          position={[0, 4, 0]}
        />
        {
          showPlasmaBeam &&
            [-1, -0.5, 0, 0.5, 1].map((e, i) => {
              const YPossVals = [4, 6, 8];
              const targetPosition = new THREE.Vector3(12, YPossVals[i % 3], e);
              return (
                <PlasmaBeam
                  position={new THREE.Vector3(4, 2, e)}
                  direction={new THREE.Vector3(0, 0, 0)}
                  length={1}
                  radius={0.1}
                  color="cyan"
                  targetPosition={targetPosition}
                  onReached={() => {
                    setShowPlasmaBeam(false);
                    onKill();
                  }}
                />
              );
            })
          //   <>
          //     <PlasmaBeam
          //       position={new THREE.Vector3(4, 2, 0.5)}
          //       direction={new THREE.Vector3(0, 0, 0)}
          //       length={1}
          //       radius={0.1}
          //       color="cyan"

          //     />
          //     <PlasmaBeam
          //       position={new THREE.Vector3(4, 2, -1)}
          //       direction={new THREE.Vector3(0, 0, 0)}
          //       length={1}
          //       radius={0.1}
          //       color="cyan"
          //     />
          //     <PlasmaBeam
          //       position={new THREE.Vector3(4, 2, 1)}
          //       direction={new THREE.Vector3(0, 0, 0)}
          //       length={1}
          //       radius={0.1}
          //       color="cyan"
          //     />
          //     <PlasmaBeam
          //       position={new THREE.Vector3(4, 2, -0.5)}
          //       direction={new THREE.Vector3(0, 0, 0)}
          //       length={1}
          //       radius={0.1}
          //       color="cyan"
          //     />
          //   </>
        }
      </group>
    </mesh>
  );
};

export default Spaceship;
