// components/Configurator/SceneCanvas.jsx
import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './model';
import Header from '../Headers/header';

export default function SceneCanvas({data}) {
  const controlsRef = useRef()
  

  return (
    <div className='flex flex-col h-screen w-full bg-white'>
      <Header/>
      <div id = "canvas-container" className='w-full h-full relative'>
        <Canvas shadows camera={{ position: [-3, 3, 7] }}>
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight position={[0, 10, 5]} intensity={2} castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}/>
          <OrbitControls 
            ref = {controlsRef} 
            // minPolarAngle={Math.PI / 4}   
            maxPolarAngle={Math.PI / 2}     
          />
          <Model data = {data} controlsRef = {controlsRef}/>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        </Canvas>
      </div>
      
    </div>
    
  );
}
