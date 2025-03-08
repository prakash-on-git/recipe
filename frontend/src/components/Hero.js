import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { Link, useNavigate } from 'react-router-dom';
import { DiamondPlus, Dices, ListPlus} from 'lucide-react';

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
    <div className="w-[100vh] h-[60vh] mb-96">
      {/* Search Box (Positioned Absolutely Above 3D Model) */}
      <div className="absolute top-1/3 left-1/4 transform -translate-x-2/4 bg-transparent rounded-xl text-gray-900 text-xl font-semibold z-10">
        {/* <input type='text' placeholder='Search Recipe' className='p-3'/> */}
        <h2 className='text-6xl font-serif'>World's best recipes</h2>
        <h3 className='text-2xl py-8'>Directly from the world's best cooks <br/>and culture to your plate at home</h3>
        <button className='py-2 px-4 shadow-md bg-green-700 hover:bg-red-600 rounded-md ml-28 text-white flex gap-4 font-sans' onClick={handleClick}>
          <Dices/> Surprize me
        </button>
      </div>

      <div className="absolute top-1/3 left-1/4 transform -translate-x-36 translate-y-20 bg-transparent bg-green-600 text-white rounded-md shadow-m text-xl font-semibold z-20">
      </div>

      <div className="absolute top-1/3 right-1/4 text-center transform translate-x-80 font-serif bg-transparent rounded-xl text-gray-900 text-xl font-semibold z-10">
        <div className='m-4 py-1 px-6 text-6xl flex items-center gap-4'>
          <DiamondPlus/>
          <Link to={"/add-recipe"} >Create</Link>
        </div>
        <div className='m-4 py-1 px-6 text-6xl flex items-center gap-4'>
          <ListPlus/>
          <Link to={"/organize"} >Organize</Link>
        </div>
      </div>

      <Canvas dpr={[1, 2]} shadows gl={{ toneMappingExposure: 0.9 }} camera={{ fov: 45, position: [0, 2, 2] }} style={{ position: "absolute" }}>
        <color attach="background" args={["#fff"]} /> {/* Light grey background */}

        {/* Custom Lighting */}
        <ambientLight intensity={1} />
        <directionalLight position={[1, 1, 1]} intensity={0.9} />
        <spotLight  position={[1, 1, 1]}  angle={0.3}  penumbra={1}  intensity={0.1}  castShadow 
        />

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
