import { DragControls, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useDrag, useGesture } from "react-use-gesture";
import { Mesh, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";

const Window = ({
  children,
  onClose,
  title,
}: {
  children: JSX.Element;
  onClose: () => void;
  title: string;
}) => {
  const { size, viewport, gl } = useThree();
  const ref = useRef<HTMLDivElement>(null);
  const aspect = size.width / viewport.width;
  const [position, setPosition] = useState(new Vector3(2, 3, 0));
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (!ref.current?.parentElement) return;
    if (maximized) {
      // Calculate the position to move the window to the top left of the screen
      // const x = -viewport.width / 1.9;
      // const y = viewport.height / 1.5;
      // setPosition(new Vector3(x, y, 0));
      ref.current.parentElement.style.transform = "";
    } else {
      ref.current.parentElement.style.transform = `translate3d(${
        size.width / 1.55
      }px, ${size.height / 2.5}px, 0px) scale(1)`;
    }
  }, [ref.current, maximized]);

  //   const bind = useGesture({
  //     onDrag: ({ offset: [x, y] }) =>
  //       setSpring({
  //         position: new Vector3(x / aspect, -y / aspect, 0),
  //         rotation: new Vector3(y / aspect, x / aspect, 0),
  //       }),
  //     onHover: ({ hovering }) =>
  //       setSpring({
  //         scale: hovering ? new Vector3(1.2, 1.2, 1.2) : new Vector3(1, 1, 1),
  //       }),
  //   });

  //   const bind = useDrag(
  //   console.log("🚀 ~ Window ~ bind:", bind());
  //     ({ offset: [x, y] }) => {
  //       console.log(x, y);
  //       setSpring({
  //         position: new Vector3(x / aspect, -y / aspect, 0),
  //         rotation: new Vector3(y / aspect, x / aspect, 0),
  //       });
  //     },
  //     { pointerEvents: true }
  //   );
  return (
    <>
      <Html
        position={position}
        ref={ref}
        //   onPointerEnter={(e) => {
        //     console.log(e);
        //   }}
        //   onPointerDown={(e) => {
        //     console.log(e);
        //   }}
      >
        <div
          className={`${
            maximized
              ? "w-[100vw] h-[100vh]"
              : "w-auto min-w-96 h-[20vh] min-h-96"
          } border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden cursor-default`}
          // onMouseMove={(e) => console.log(e)}
        >
          <div className="flex items-center bg-gray-200 p-2 border-b border-gray-300">
            <div className="flex space-x-2 cursor-pointer">
              <span
                className="block w-3 h-3 bg-red-500 rounded-full"
                onClick={onClose}
              ></span>
              <span
                className="block w-3 h-3 bg-yellow-500 rounded-full"
                onClick={onClose}
              ></span>
              <span
                className="block w-3 h-3 bg-green-500 rounded-full"
                onClick={() => setMaximized((m) => !m)}
              ></span>
            </div>
            <div className="ml-2 text-gray-700">{title}</div>
          </div>
          <div className="p-4 h-full overflow-y-scroll">{children}</div>
        </div>
      </Html>
    </>
  );
};

export default Window;
