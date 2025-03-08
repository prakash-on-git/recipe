import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { Link, useNavigate } from 'react-router-dom';
import { DiamondPlus, Dices, ListPlus} from 'lucide-react';
import "./hero.css";

function Model(props) {
  const { scene } = useGLTF("/donut_final.glb");
  const modelRef = useRef(); // Reference for rotation
  
  // Rotate the model continuously on the X-axis
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust speed if needed
    }
  });
  
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.roughness = 0.8;
      child.material.metalness = 0.4; 
    }
  });
  
  return <primitive ref={modelRef} object={scene} {...props} />;
}

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/random-recipe");
  }

  return (
    <div className="hero-container">
      {/* Search Box */}
      <div className="hero-text">
          <h2 className="hero-title">World's best recipes</h2>
          <h3 className="hero-subtitle">
              Directly from the world's best cooks <br /> and culture to your plate at home
          </h3>
          <button className="hero-button" onClick={handleClick}>
              <Dices /> Surprise me
          </button>
      </div>

      {/* Create & Organize Section */}
      <div className="hero-actions">
          <div>
              <DiamondPlus />
              <Link to={"/add-recipe"} className=''>Create New</Link>
          </div>
          <div>
              <ListPlus />
              <Link to={"/organize"}>Organize</Link>
          </div>
      </div>  

      {/* 3D Model Canvas */}
      <Canvas dpr={[1, 2]} shadows gl={{ toneMappingExposure: 0.9 }} camera={{ fov: 45, position: [0, 2, 2] }} className="hero-canvas">
        <color attach="background" args={["#fff"]} />
        <ambientLight intensity={1} />
        <directionalLight position={[1, 1, 1]} intensity={0.9} />
        <spotLight position={[1, 1, 1]} angle={0.3} penumbra={1} intensity={0.1} castShadow />

        <PresentationControls speed={1.0} global zoom={1.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment="city" intensity={1}>
              <Model scale={0.99} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  )
}

export default Hero
