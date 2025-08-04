import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const AnimatedBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let frameId: number | null = null;

    // Dynamic sizing based on viewport
    const getSizes = () => {
      return {
        width: Math.min(window.innerWidth, 800), // 800 as max width or smaller if on a smaller screen
        height: Math.min(window.innerHeight, 600), // 600 as max height or smaller if on a smaller screen
      };
    };

    const { width, height } = getSizes();

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 1000);
    camera.position.set(0, 8, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xe8e8e8, 0);
    renderer.shadowMap.enabled = true;

    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 50);
    pointLight.position.set(0, 0, 6);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 256;
    pointLight.shadow.mapSize.height = 256;
    pointLight.shadow.bias = -0.001;
    scene.add(pointLight);

    let mesh: any; // Define mesh outside of the loader to have a wider scope

    const loader = new GLTFLoader();
    loader.load(
      "/hackathon/green-battery.glb",
      (gltf) => {
        // console.log("GLTF Loaded", gltf); // For debugging
        mesh = gltf.scene.children[0];
        mesh.scale.set(0.05, 0.05, 0.05); // Adjust scale if necessary
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // mesh.position.z += 50;
        // Rotate the mesh 90 degrees around the y-axis
        // mesh.rotation.z = - Math.PI /2;

        const material = new THREE.MeshStandardMaterial({
          color: 0x00ff00,
          wireframe: false,
        });

        mesh.material = material;
        scene.add(mesh);

        // Make sure the camera is positioned correctly
        camera.lookAt(mesh.position);
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      },
    );

    const animate = () => {
      if (mesh) {
        mesh.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const updateCameraPosition = () => {
      const { width } = getSizes(); // Use only width for responsiveness
      const zPosition = width < 800 ? 7 : 3; // Adjust Z based on width
      camera.position.set(0, 8, zPosition);
      camera.lookAt(new THREE.Vector3(0, 0, 0)); // Re-focus the camera
    };

    // Call once on mount to set initial position
    updateCameraPosition();

    const onWindowResize = () => {
      const { width, height } = getSizes();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onWindowResize);

    // Cleanup function
    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []); // Dependency array is empty, useEffect runs once
  return <div ref={mountRef} />;
  // return <div />;
};

export default AnimatedBackground;
