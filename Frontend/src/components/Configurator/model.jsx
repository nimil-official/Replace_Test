
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'
import { SpotLightHelper } from 'three';
import { useHelper } from '@react-three/drei';

export default function Model({data, controlsRef}) {

  const [model, setModel] = useState()
  const { scene } = useGLTF("/" + data.modelUrl);
  const spotRef = useRef();
  const scaleVal = data.configuration.scale

  const { camera, gl } = useThree();
  
    useEffect(() => {
      function handleResize() {
        const container = document.getElementById('canvas-container');
        
        if (!container) return;
  
        const width = container.clientWidth;
        const height = container.clientHeight;
  
        // Update camera and renderer
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        gl.setSize(width, height);
      }
  
      // Initial call
      handleResize();
  
      // Listen to window resize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [camera, gl]);
  

  useEffect(() => {
    setModel(model)
    console.log("scene is ", scene)
    window.scene = scene
    window.camera = camera
    scene.traverse(child => {
      if(child.isMesh){
        child.castShadow = true
      }
    })
    const box = new THREE.Box3().setFromObject(scene)
    console.log("controls is", box)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.z -= center.z


  // Add the helper
      // 
  }, [scene])
  useHelper(spotRef, SpotLightHelper, 'teal');
  return (
    <>
      <spotLight
        position={[0, 5, 0]}
        angle={2}
        penumbra={5}
        intensity={1.5}
        
      />

      <spotLight 
        position={[8, 2, 2]}
        angle={1.5}
        // penumbra={5}
        intensity={20}
        
      />

      <spotLight
        position={[-8, 2, 2]}
        angle={1.5}
        // penumbra={5}
        intensity={20}
        
      />

      <spotLight
        position={[0, 2, -7]}
        angle={2}
        penumbra={5}
        intensity={20}
        
      />
      <primitive object={scene} scale={scaleVal} castShadow/>
    </>

  )

}
