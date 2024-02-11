'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Correct import
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const AnimatedBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    let frameId: number | null = null;

    useEffect(() => {
        if (!mountRef.current) return;

        const maxSceneWidth = 800; // Maximum width in pixels
        const maxSceneHeight = 600; // Maximum height in pixels

        // Scene setup
        const scene = new THREE.Scene();
        const aspectRatio = maxSceneWidth / maxSceneHeight;
        const camera = new THREE.PerspectiveCamera(15, aspectRatio, 0.1, 1000);
        camera.position.set(0, 8, 8);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xE8E8E8, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Set initial size
        const setSize = () => {
            const width = Math.min(maxSceneWidth, window.innerWidth);
            const height = Math.min(maxSceneHeight, window.innerHeight);
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        setSize(); // Set size on initial load

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
            '/green-battery.glb',
            (gltf) => {
                console.log("GLTF Loaded", gltf); // For debugging
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
            }
        );

        const animate = () => {
            if (mesh) {
                mesh.rotation.y += 0.005;
            }
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        animate();

        // Resize handler
        const onWindowResize = () => {
            const tanFOV = Math.tan(((Math.PI / 180) * camera.fov / 2));
            const windowHeight = window.innerHeight;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
            camera.updateProjectionMatrix();
            camera.lookAt(scene.position);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        };

        // Add event listener for window resize.
        window.addEventListener('resize', onWindowResize);

        // Cleanup function
        return () => {
            if (frameId !== null) {
                cancelAnimationFrame(frameId);
            }
            window.removeEventListener('resize', onWindowResize);
            mountRef.current?.removeChild(renderer.domElement);
            scene.clear();
            renderer.dispose();
        };
    }, []); // Dependency array is empty, useEffect runs once
    return <div ref={mountRef} />;
    // return <div ref={mountRef} className={styles.animatedBackground} />;
};

export default AnimatedBackground;


