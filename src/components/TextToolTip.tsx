import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const TextTooltip = ({ onClick }: { onClick: () => void }) => {
  const [started, setStarted] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const textContent = started
    ? "Great! Your journey begins now! Use array keys to scroll"
    : "Hello, Welcome To The Future";

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
  }, [started]);

  return (
    <mesh position={[4, 3, 0]} rotation={[0, 0, 0]}>
      <Html transform center occlude="blending">
        <div
          className={`flex flex-col items-center w-full h-full bg-white p-2 px-4 `}
        >
          <p className="text-md font-normal w-full text-center overflow-hidden">
            {tooltipText || "Hello, Welcome to the future"}
          </p>
          <button
            className={`py-1 px-2 bg-purple-500 text-xs font-bold text-white mt-2 font-sans active:scale-90 transition-all ${
              started ? "opacity-0 h-0 w-0" : "opacity-100"
            }`}
            style={{ transitionDelay: "height width 150ms" }}
            onClick={() => {
              onClick();
              setStarted(true);
            }}
          >
            Start The Journey
          </button>
        </div>
      </Html>
    </mesh>
  );
};

export default TextTooltip;
