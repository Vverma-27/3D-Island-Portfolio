import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Euler, Vector3 } from "three";

const TextTooltip = ({
  onClick,
  text,
  started,
  scale,
  position,
  rotation,
  buttonText,
}: {
  onClick?: () => void;
  text: string;
  started?: boolean;
  scale?: Vector3;
  position?: Vector3;
  rotation?: Euler;
  buttonText?: string;
}) => {
  // const [started, setStarted] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const textContent = text;

  useEffect(() => {
    let intervalId: any;
    let currString = "";

    // if (started) {
    intervalId = setInterval(() => {
      const currentLength = currString.length;
      if (currentLength < textContent.length) {
        currString += textContent[currentLength];
        setTooltipText(currString);
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    // }

    return () => clearInterval(intervalId);
  }, [textContent]);

  return (
    <Html
      transform
      center
      occlude="blending"
      position={position || [4, 3, 0]}
      scale={scale || [1, 1, 1]}
      rotation={rotation || [0, 0, 0]}
    >
      <div
        className={`flex flex-col items-center w-full h-full bg-white p-2 px-4 `}
      >
        <p className="text-md font-normal w-full text-center overflow-hidden">
          {tooltipText || "Hello, Welcome to the future"}
        </p>
        {onClick ? (
          <button
            className={`py-1 px-2 bg-purple-500 text-xs font-bold text-white mt-2 font-sans active:scale-90 transition-all ${
              started ? "opacity-0 h-0 w-0" : "opacity-100"
            }`}
            style={{ transitionDelay: "height width 150ms" }}
            onClick={onClick}
          >
            {buttonText || "Start The Journey"}
          </button>
        ) : null}
      </div>
    </Html>
  );
};

export default TextTooltip;
