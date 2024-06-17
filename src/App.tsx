import { Canvas, useFrame } from "@react-three/fiber";
import Island from "./Models/Island";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Space from "./Models/Space";
import Spaceship from "./Models/Spaceship";
import Orc from "./Models/Orc";
import Loader from "./components/Loader";
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

  const projects = [
    {
      name: "Kalyan Trust",
      icon: "/kalyan.png",
      link: "https://kalyantrust.org/",
      techStack: [
        "Razorpay",
        "Tailwind CSS",
        "Next.js",
        "TypeScript",
        "Express",
        "MongoDB",
      ],
      description: `This fullstack application, developed for an NGO, integrates payment
            processing and receipt storage using Razorpay. Built with Next.js
            and TypeScript, it employs a custom Express server for backend
            functionality and is styled with Tailwind CSS for a modern and
            responsive user interface. The app facilitates secure and efficient
            payment transactions, ensuring reliable record-keeping for the
            NGO&pos;s financial operations.`,
    },
    {
      name: "Tragency Media",
      icon: "/tragency.png",
      link: "https://tragency-server.onrender.com",
      techStack: [
        "Express",
        "Typescript",
        "Mongodb",
        "React",
        "Redux",
        "PWA",
        "Socket.io",
      ],
      description: `Developed a sophisticated stone-paper-scissors game with both AI and
            multiplayer modes. The AI opponent is designed using advanced
            pattern recognition techniques to adapt and respond to the
            player&pos;s strategies, providing a challenging and dynamic
            gameplay experience. In multiplayer mode, users can easily create
            and share a game room link to invite friends for a match. The game
            utilizes WebSockets for real-time communication, ensuring a seamless
            and interactive multiplayer experience.`,
    },
    {
      name: "AI/Multiplayer Stone Paper Scissors",
      icon: "/sps.png",
      link: "https://meta-sps.netlify.app/",
      techStack: ["TypeScript", "Socket.io", "React", "Express"],
      description: `This application is developed using React and TypeScript, leveraging
            the React DnD library to replicate Instagram&pos;s create mode. It
            enables users to design and customize memes, providing functionality
            for exporting the finished creations.`,
    },
    {
      name: "Insta Create Clone",
      icon: "/meta-meme.png",
      link: "https://meta-meme.netlify.app/",
      techStack: ["React", "TypeScript", "React DnD"],
      description: `This advanced fullstack MERN progressive web application allows
            users to post content in three diverse formats: vlogs, blogs, and
            text entries. It includes a comprehensive travel diary feature for
            detailed journey documentation and incorporates chat villages where
            travelers can connect and share experiences in real-time using
            WebSockets. The application is further enhanced with robust push
            notification capabilities, ensuring continuous user engagement and
            timely updates.`,
    },
  ];
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
          <Orc
            position={[7.25, 1.5, -1.5]}
            rotation={[0, Math.PI / 3, 0]}
            scale={[0.0023, 0.0023, 0.0023]}
            showPrompt={pathIndex === 2}
            alive={orcAlive}
          />
          <Robot
            scale={[0.24, 0.24, 0.24]}
            position={[15.8, 0.6, 3.5]}
            rotation={[0, Math.PI / 4, 0]}
            key="robot1"
            setActiveCamera={setActiveCamera}
            showPrompt={pathIndex === 0}
            text="Hello, Welcome to the Future"
            startedText="Your Journey begins now. Use arrow keys to scroll"
          />
          {/* {pathIndex === 1 && ( */}
          <Robot
            scale={[0.15, 0.15, 0.15]}
            position={[12.5, 1.2, -1.8]}
            rotation={[0, Math.PI / 14, 0]}
            key="robot2"
            setActiveCamera={setActiveCamera}
            text="Click to learn about the creator of this island"
            buttonText="About Me"
            showPrompt={pathIndex === 1}
            title="About me"
            windowChildren={
              <div>
                <div>C:\Users\Vihaan&gt; whoami</div>
                {/* {showResponse ? ( */}
                <>
                  <div>
                    Vihaan Verma | MERN stack developer | Freelancer | College
                    Student
                  </div>
                  <br />
                  <div>C:\Users\Vihaan&gt;</div>
                </>
                {/* ) : null} */}
              </div>
            }
          />
          <Robot
            scale={[0.15, 0.15, 0.15]}
            position={[1.6, 4.7, -10.3]}
            rotation={[0, Math.PI / 3.3, 0]}
            key="robot3"
            setActiveCamera={setActiveCamera}
            text="Click to see other projects by me"
            buttonText="See Projects"
            showPrompt={pathIndex === 5}
            title="Projects"
            windowChildren={
              <>
                {projects.map((project, i) => {
                  return (
                    <div key={i} className="w-full mb-4">
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={project.icon}
                          alt={project.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">
                          {project.name}
                        </h2>
                        <div className="flex mb-2">
                          {project.techStack.map((tech, index) => (
                            <div
                              key={index}
                              className="bg-gray-200 text-xs px-2 py-1 mr-2 rounded"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">
                          {project.description}
                        </p>
                      </div>
                      <hr />
                      <hr />
                    </div>
                  );
                })}
              </>
            }
          />
          <Robot
            scale={[0.15, 0.15, 0.15]}
            position={[1.3, 5.3, 2.5]}
            rotation={[0, Math.PI, 0]}
            key="robot4"
            setActiveCamera={setActiveCamera}
            text="Click to see my socials"
            buttonText="See Socials"
            showPrompt={pathIndex === 8}
            title="Socials"
            windowChildren={
              <div className="flex flex-col items-start space-y-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://www.upwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Upwork
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            }
          />
          <Robot
            scale={[0.15, 0.15, 0.15]}
            position={[-7.6, 6.7, -4]}
            rotation={[0, Math.PI, 0]}
            key="robot5"
            setActiveCamera={setActiveCamera}
            text="Connect with me"
            buttonText="Connect"
            showPrompt={pathIndex === 12}
            title="Connect"
            windowChildren={
              <>
                <p className="font-bold">
                  I look forward to connecting and potentially working on
                  projects together.
                </p>
                <br />
                <a href="mailto:vverma270705@gmail.com">
                  Email: vverma270705@gmail.com
                </a>
                <br />
                <a href="tel:+919971024733">Mobile: 9971024733</a>
              </>
            }
          />
          {/* )} */}
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
