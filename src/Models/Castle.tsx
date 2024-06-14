/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: 333DDD (https://sketchfab.com/333DDD-oficial)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/corvin-castle-283d96b4a33a46908b6eddab26f4e4d8
Title: Corvin Castle
*/

import { useGLTF } from "@react-three/drei";
import CastleGLB from "../assets/3D/castle.glb";
import { GroupProps } from "@react-three/fiber";

const Castle = (props: GroupProps) => {
  const { nodes, materials } = useGLTF(CastleGLB);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.011}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[0, 0, 3210.262]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_1.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_2.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_3.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_4.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_5.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_6.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_7.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_8.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_9.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_10.geometry}
              material={materials.Material_u1_v1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.meshNode_Material_u1_v1_0_11.geometry}
              material={materials.Material_u1_v1}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default Castle;