import {
  OrbitControls,
  PerspectiveCamera,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

import SpaceshipGLB from "../assets/3D/spaceship.glb";

interface SpaceshipProps extends MeshProps {
  activeCamera: "spaceship" | "default";
}

const Spaceship = ({ activeCamera, ...props }: SpaceshipProps) => {
  const { scene, animations } = useGLTF(SpaceshipGLB);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const spaceshipRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, spaceshipRef);
  const { set } = useThree();
  const [initialized, setInitialized] = useState(false);
  console.log("🚀 ~ Spaceship ~ actions:", spaceshipRef.current?.position);
  console.log("🚀 ~ Spaceship ~ actions:", spaceshipRef.current?.rotation);

  useEffect(() => {
    if (activeCamera === "spaceship") {
      // Play the animation when activeCamera changes to "spaceship"
      actions["FLY"]?.reset().play();
    }
  }, [activeCamera, actions]);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [moveSpeed, setMoveSpeed] = useState(0);
  const [upSpeed, setUpSpeed] = useState(0);

  const bobbingUp = useRef(true);
  const bobbingRange = 0.4;
  const bobbingSpeed = 0.009;

  useEffect(() => {
    if (activeCamera === "spaceship") {
      actions["FLY"]?.reset().play();
    }
  }, [activeCamera, actions]);

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp]);
  useFrame(() => {
    if (!spaceshipRef.current) return;
    if (activeCamera === "spaceship") {
      if (initialized) {
        spaceshipRef.current.rotation.y += rotationSpeed;
        const forward = new THREE.Vector3(-1, 0, 0);
        forward.applyQuaternion(spaceshipRef.current.quaternion);
        forward.normalize();
        if (upSpeed) {
          spaceshipRef.current.position.y += upSpeed;
        }
        // Update the position based on the forward direction
        spaceshipRef.current.position.add(forward.multiplyScalar(moveSpeed));
      } else {
        // Move the spaceship up in the y-axis until y = 4
        if (spaceshipRef.current.position.y < 7) {
          spaceshipRef.current.position.y += 0.05; // Adjust the speed as needed
        }
        // Rotate the spaceship on the y-axis by 45 degrees (PI/4 radians)
        else if (
          spaceshipRef.current.position.y >= 4 &&
          spaceshipRef.current.rotation.y < Math.PI / 2
        ) {
          spaceshipRef.current.rotation.y += 0.004; // Adjust the speed as needed
        } else if (
          spaceshipRef.current.position.y >= 4 &&
          spaceshipRef.current.rotation.y >= Math.PI / 2 &&
          spaceshipRef.current.position.z > -20
        ) {
          spaceshipRef.current.position.z -= 0.05;
        } else
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
        {/* <OrbitControls
          enablePan={true} // Enable panning (side-to-side movement)
          enableZoom={false} // Disable zooming
          enableRotate={true} // Enable rotation around the spaceship
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation angle
          minPolarAngle={0} // Limit vertical rotation angle
          minDistance={1} // Minimum distance from the spaceship
          maxDistance={20} // Maximum distance from the spaceship
        /> */}
      </group>
    </mesh>
  );
};

export default Spaceship;