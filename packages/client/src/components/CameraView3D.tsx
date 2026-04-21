import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SimulationState } from '@amid/shared/types';

export const CameraView3D: React.FC<{ state: SimulationState }> = ({ state }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 300);
    mountRef.current.appendChild(renderer.domElement);

    const track = new THREE.Mesh(new THREE.BoxGeometry(100, 0.1, 1), new THREE.MeshBasicMaterial({ color: 0x555555 }));
    scene.add(track);

    const train = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    scene.add(train);

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      if (state.trains[0]) {
        train.position.x = (state.trains[0].position.distance / 20) - 25;
      }
      renderer.render(scene, camera);
    };
    animate();
    return () => { mountRef.current?.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} style={{ border: '2px solid #333' }} />;
};
