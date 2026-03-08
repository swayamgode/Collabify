"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

function DualCharacters() {
    const parentGroup = useRef<THREE.Group>(null);

    // Brand Character (Right side initially)
    const brandGroup = useRef<THREE.Group>(null);
    const brandHead = useRef<THREE.Mesh>(null);
    const brandLeftArm = useRef<THREE.Mesh>(null);
    const brandRightArm = useRef<THREE.Mesh>(null);
    const brandEyes = useRef<THREE.Mesh>(null); // simple grouped scale for expression
    const brandThought = useRef<HTMLDivElement>(null);
    const brandThoughtBottom = useRef<HTMLDivElement>(null);

    // Influencer Character (Left side initially)
    const infGroup = useRef<THREE.Group>(null);
    const infHead = useRef<THREE.Mesh>(null);
    const infLeftArm = useRef<THREE.Mesh>(null);
    const infRightArm = useRef<THREE.Mesh>(null);
    const infEyes = useRef<THREE.Mesh>(null);
    const infThought = useRef<HTMLDivElement>(null);
    const infThoughtBottom = useRef<HTMLDivElement>(null);

    useFrame(() => {
        if (!parentGroup.current || !brandGroup.current || !infGroup.current) return;

        const scrollY = window.scrollY;
        const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        const scroll = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        const lerp = THREE.MathUtils.lerp;

        // Fade out top thoughts
        const Math_min = Math.min;
        const Math_max = Math.max;
        const thoughtOpacityTop = Math_max(0, 1 - (scroll * 4));
        if (brandThought.current) brandThought.current.style.opacity = `${thoughtOpacityTop}`;
        if (infThought.current) infThought.current.style.opacity = `${thoughtOpacityTop}`;

        // Fade in bottom thoughts
        const thoughtOpacityBottom = Math_min(1, Math_max(0, (scroll - 0.7) * 4));
        if (brandThoughtBottom.current) brandThoughtBottom.current.style.opacity = `${thoughtOpacityBottom}`;
        if (infThoughtBottom.current) infThoughtBottom.current.style.opacity = `${thoughtOpacityBottom}`;

        // 1. GLOBAL PARENT GROUP MOVEMENT (camera tracking essentially)
        // Parent sways gently
        parentGroup.current.rotation.y = lerp(parentGroup.current.rotation.y, Math.sin(Date.now() * 0.001) * 0.05, 0.05);
        parentGroup.current.rotation.x = lerp(parentGroup.current.rotation.x, scroll * Math.PI * 0.1, 0.05);

        // Move the whole parent to center the action depending on section
        let parentX = 0; let parentY = -0.5; let parentZ = 0;
        if (scroll < 0.3) {
            parentZ = 2.0; // Zoomed out slightly so both fit
        } else if (scroll < 0.6) {
            parentX = -2.0; // Move whole scene left to make room for text
            parentZ = 1.0;
        } else {
            parentX = 0.0; // Centered in the middle for the finale
            parentZ = 1.5;
        }
        parentGroup.current.position.x = lerp(parentGroup.current.position.x, parentX, 0.05);
        parentGroup.current.position.y = lerp(parentGroup.current.position.y, parentY, 0.05);
        parentGroup.current.position.z = lerp(parentGroup.current.position.z, parentZ, 0.05);


        // 2. INDIVIDUAL CHARACTER CHOREOGRAPHY
        if (scroll < 0.3) {
            /**
             * SECTION 1: SEARCHING / THINKING
             * Separated left/right. Back to each other or looking away.
             * Both scratching heads/thinking.
             */

            // Brand (Right side, looking right)
            brandGroup.current.position.x = lerp(brandGroup.current.position.x, 2.5, 0.05);
            brandGroup.current.rotation.y = lerp(brandGroup.current.rotation.y, Math.PI * 0.2, 0.05);

            if (brandRightArm.current) {
                brandRightArm.current.rotation.z = lerp(brandRightArm.current.rotation.z, Math.PI * 0.8, 0.05); // Hand to head
                brandRightArm.current.rotation.x = lerp(brandRightArm.current.rotation.x, Math.sin(Date.now() * 0.005) * 0.1, 0.05); // Scratching tap
            }
            if (brandLeftArm.current) brandLeftArm.current.rotation.z = lerp(brandLeftArm.current.rotation.z, 0.1, 0.05);
            if (brandEyes.current) brandEyes.current.scale.y = lerp(brandEyes.current.scale.y, 0.3, 0.1); // Squint/thinking

            // Influencer (Left side, looking left)
            infGroup.current.position.x = lerp(infGroup.current.position.x, -2.5, 0.05);
            infGroup.current.rotation.y = lerp(infGroup.current.rotation.y, -Math.PI * 0.2, 0.05);

            if (infLeftArm.current) {
                infLeftArm.current.rotation.z = lerp(infLeftArm.current.rotation.z, -Math.PI * 0.8, 0.05); // Hand to head
                infLeftArm.current.rotation.x = lerp(infLeftArm.current.rotation.x, Math.sin(Date.now() * 0.005) * 0.1, 0.05); // Scratching
            }
            if (infRightArm.current) infRightArm.current.rotation.z = lerp(infRightArm.current.rotation.z, -0.1, 0.05);
            if (infEyes.current) infEyes.current.scale.y = lerp(infEyes.current.scale.y, 0.3, 0.1);

        } else if (scroll < 0.6) {
            /**
             * SECTION 2: NOTICING EACH OTHER
             * Turning to face inwards. Pointing or stepping closer.
             */

            // Brand (Moving closer, turning left)
            brandGroup.current.position.x = lerp(brandGroup.current.position.x, 1.2, 0.05);
            brandGroup.current.rotation.y = lerp(brandGroup.current.rotation.y, -Math.PI * 0.25, 0.05); // Face left

            if (brandRightArm.current) brandRightArm.current.rotation.z = lerp(brandRightArm.current.rotation.z, -0.1, 0.05); // Drop scratching arm
            if (brandLeftArm.current) {
                brandLeftArm.current.rotation.z = lerp(brandLeftArm.current.rotation.z, Math.PI * 0.4, 0.05); // Reaching/Pointing forward towards inf
                brandLeftArm.current.rotation.x = lerp(brandLeftArm.current.rotation.x, Math.PI * 0.2, 0.05);
            }
            if (brandEyes.current) brandEyes.current.scale.y = lerp(brandEyes.current.scale.y, 1.2, 0.1); // Wide eyes (surprise/found!)

            // Influencer (Moving closer, turning right)
            infGroup.current.position.x = lerp(infGroup.current.position.x, -1.2, 0.05);
            infGroup.current.rotation.y = lerp(infGroup.current.rotation.y, Math.PI * 0.25, 0.05); // Face right

            if (infLeftArm.current) infLeftArm.current.rotation.z = lerp(infLeftArm.current.rotation.z, 0.1, 0.05);
            if (infRightArm.current) {
                infRightArm.current.rotation.z = lerp(infRightArm.current.rotation.z, -Math.PI * 0.4, 0.05); // Pointing towards brand
                infRightArm.current.rotation.x = lerp(infRightArm.current.rotation.x, Math.PI * 0.2, 0.05);
            }
            if (infEyes.current) infEyes.current.scale.y = lerp(infEyes.current.scale.y, 1.2, 0.1);

        } else {
            /**
             * SECTION 3: EXCITED & HAPPY (No handshake)
             * Jumping/celebrating, facing slightly inwards, with new thought bubbles!
             */

            // Brand (Celebrating on Right)
            brandGroup.current.position.x = lerp(brandGroup.current.position.x, 1.5, 0.05);
            brandGroup.current.rotation.y = lerp(brandGroup.current.rotation.y, -Math.PI * 0.1, 0.05); // Face slightly left forwards

            // Arms up in excitement
            if (brandLeftArm.current) {
                brandLeftArm.current.rotation.z = lerp(brandLeftArm.current.rotation.z, Math.PI * 0.8, 0.05);
                brandLeftArm.current.rotation.x = lerp(brandLeftArm.current.rotation.x, Math.sin(Date.now() * 0.01) * 0.2, 0.05);
            }
            if (brandRightArm.current) {
                brandRightArm.current.rotation.z = lerp(brandRightArm.current.rotation.z, -Math.PI * 0.8, 0.05);
                brandRightArm.current.rotation.x = lerp(brandRightArm.current.rotation.x, Math.sin(Date.now() * 0.01) * 0.2, 0.05);
            }
            if (brandEyes.current) brandEyes.current.scale.y = lerp(brandEyes.current.scale.y, 0.5, 0.1); // Happy squint

            // Jump bounce (use position y for whole group locally)
            brandGroup.current.position.y = lerp(brandGroup.current.position.y, Math.abs(Math.sin(Date.now() * 0.005)) * 0.3, 0.1);

            // Influencer (Celebrating on Left)
            infGroup.current.position.x = lerp(infGroup.current.position.x, -1.5, 0.05);
            infGroup.current.rotation.y = lerp(infGroup.current.rotation.y, Math.PI * 0.1, 0.05); // Face slightly right forwards

            // Arms up in excitement
            if (infRightArm.current) {
                infRightArm.current.rotation.z = lerp(infRightArm.current.rotation.z, -Math.PI * 0.8, 0.05);
                infRightArm.current.rotation.x = lerp(infRightArm.current.rotation.x, Math.sin(Date.now() * 0.01 + Math.PI) * 0.2, 0.05);
            }
            if (infLeftArm.current) {
                infLeftArm.current.rotation.z = lerp(infLeftArm.current.rotation.z, Math.PI * 0.8, 0.05);
                infLeftArm.current.rotation.x = lerp(infLeftArm.current.rotation.x, Math.sin(Date.now() * 0.01 + Math.PI) * 0.2, 0.05);
            }
            if (infEyes.current) infEyes.current.scale.y = lerp(infEyes.current.scale.y, 0.5, 0.1);

            // Jump bounce (use position y for whole group locally, slightly offset timing)
            infGroup.current.position.y = lerp(infGroup.current.position.y, Math.abs(Math.sin(Date.now() * 0.005 + Math.PI)) * 0.3, 0.1);
        }
    });

    return (
        <group ref={parentGroup}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>

                {/* ---------- BRAND CHARACTER (Dark Suit) ---------- */}
                <group ref={brandGroup}>
                    {/* Head */}
                    <mesh ref={brandHead} position={[0, 1.5, 0]}>
                        <boxGeometry args={[0.8, 0.8, 0.8]} />
                        <meshStandardMaterial color="#fcd5ce" roughness={0.4} /> {/* Skin */}

                        {/* Eyes Group (for easy squinting) */}
                        <group ref={brandEyes} position={[0, 0.1, 0.41]}>
                            <mesh position={[-0.2, 0, 0]}>
                                <boxGeometry args={[0.1, 0.1, 0.05]} />
                                <meshStandardMaterial color="#000" />
                            </mesh>
                            <mesh position={[0.2, 0, 0]}>
                                <boxGeometry args={[0.1, 0.1, 0.05]} />
                                <meshStandardMaterial color="#000" />
                            </mesh>
                        </group>

                        {/* Thought Cloud - TOP */}
                        <Html position={[0.5, 1, 0]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none', transition: 'opacity 0.2s', opacity: 0 }} ref={brandThought}>
                            <div className="bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-gray-100 text-sm font-bold text-gray-800 w-48 text-center relative pointer-events-none">
                                "Where is a good influencer for our product...?"
                                <div className="absolute w-3 h-3 bg-white border-b-2 border-l-2 border-gray-100 transform -rotate-45 -bottom-1.5 left-8" />
                            </div>
                        </Html>

                        {/* Thought Cloud - BOTTOM */}
                        <Html position={[0, 0.5, 0.5]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none', transition: 'opacity 0.2s', opacity: 0 }} ref={brandThoughtBottom}>
                            <div className="bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-blue-100 text-sm font-bold text-blue-800 w-48 text-center relative pointer-events-none transform -translate-x-1/4">
                                "Wow! I got the best influencer by Collabify 🎉"
                                <div className="absolute w-3 h-3 bg-white border-b-2 border-r-2 border-blue-100 transform rotate-45 -bottom-1.5 right-12" />
                            </div>
                        </Html>
                    </mesh>

                    {/* Body */}
                    <mesh position={[0, 0.2, 0]}>
                        <boxGeometry args={[1.2, 1.5, 0.6]} />
                        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} /> {/* Suit jacket */}
                    </mesh>

                    {/* Left Arm */}
                    <mesh ref={brandLeftArm} position={[-0.8, 0.5, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
                    </mesh>

                    {/* Right Arm */}
                    <mesh ref={brandRightArm} position={[0.8, 0.5, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
                    </mesh>

                    {/* Legs */}
                    <mesh position={[-0.3, -1.2, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[0.3, -1.2, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                </group>


                {/* ---------- INFLUENCER CHARACTER (Bright/Trendy) ---------- */}
                <group ref={infGroup}>
                    {/* Head */}
                    <mesh ref={infHead} position={[0, 1.5, 0]}>
                        <boxGeometry args={[0.8, 0.8, 0.8]} />
                        <meshStandardMaterial color="#ffcdb2" roughness={0.4} />

                        {/* Eyes */}
                        <group ref={infEyes} position={[0, 0.1, 0.41]}>
                            <mesh position={[-0.2, 0, 0]}>
                                <boxGeometry args={[0.1, 0.15, 0.05]} /> {/* Slightly bigger eyes */}
                                <meshStandardMaterial color="#000" />
                            </mesh>
                            <mesh position={[0.2, 0, 0]}>
                                <boxGeometry args={[0.1, 0.15, 0.05]} />
                                <meshStandardMaterial color="#000" />
                            </mesh>
                        </group>

                        {/* Thought Cloud - TOP */}
                        <Html position={[-0.5, 1, 0]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none', transition: 'opacity 0.2s', opacity: 0 }} ref={infThought}>
                            <div className="bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-gray-100 text-sm font-bold text-gray-800 w-48 text-center relative pointer-events-none">
                                "Where are the brands making good deals...?"
                                <div className="absolute w-3 h-3 bg-white border-b-2 border-r-2 border-gray-100 transform rotate-45 -bottom-1.5 right-8" />
                            </div>
                        </Html>

                        {/* Thought Cloud - BOTTOM */}
                        <Html position={[0, 0.5, 0.5]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none', transition: 'opacity 0.2s', opacity: 0 }} ref={infThoughtBottom}>
                            <div className="bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-orange-100 text-sm font-bold text-orange-800 w-48 text-center relative pointer-events-none transform translate-x-1/4">
                                "Wow! I secured the best brand deal by Collabify 🚀"
                                <div className="absolute w-3 h-3 bg-white border-b-2 border-l-2 border-orange-100 transform -rotate-45 -bottom-1.5 left-12" />
                            </div>
                        </Html>
                    </mesh>

                    {/* Body (Hoodie) */}
                    <mesh position={[0, 0.2, 0]}>
                        <boxGeometry args={[1.3, 1.4, 0.7]} />
                        <meshStandardMaterial color="#ffb703" roughness={0.8} /> {/* Orange Hoodie */}
                    </mesh>

                    {/* Left Arm */}
                    <mesh ref={infLeftArm} position={[-0.9, 0.5, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#ffb703" roughness={0.8} />
                    </mesh>

                    {/* Right Arm */}
                    <mesh ref={infRightArm} position={[0.9, 0.5, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#ffb703" roughness={0.8} />
                    </mesh>

                    {/* Legs (Jeans) */}
                    <mesh position={[-0.35, -1.2, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#457b9d" />
                    </mesh>
                    <mesh position={[0.35, -1.2, 0]}>
                        <boxGeometry args={[0.4, 1.2, 0.4]} />
                        <meshStandardMaterial color="#457b9d" />
                    </mesh>
                </group>

            </Float>
        </group>
    );
}

export default function Scene() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#a0aec0" />
                <Environment preset="city" />

                <DualCharacters />

                <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={2.5} far={4} color="#000000" />
            </Canvas>
        </div>
    );
}
