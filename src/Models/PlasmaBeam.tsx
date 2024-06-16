import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlasmaBeamProps {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  length: number;
  radius: number;
  color: string;
  targetPosition: THREE.Vector3;
  onReached: () => void;
}

const PlasmaBeam = ({
  position,
  direction,
  length,
  radius,
  color,
  targetPosition,
  onReached,
}: PlasmaBeamProps) => {
  const beamRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (beamRef.current) {
      beamRef.current.position.copy(position);
      beamRef.current.lookAt(position.clone().add(direction));
    }
  }, [position, direction]);

  useFrame(() => {
    if (beamRef.current) {
      const positionReached =
        beamRef.current.position.distanceTo(targetPosition) < 0.05;
      if (!positionReached) beamRef.current.position.lerp(targetPosition, 0.05);
      else onReached();
      // else beamRef.current.
    }
  });

  return (
    <group ref={beamRef}>
      {Array.from({ length }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2.5, 0, Math.PI / 6]}>
          <cylinderGeometry args={[radius, radius, 1.5, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

export default PlasmaBeam;
