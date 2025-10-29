import React, {Suspense, useState} from 'react'
import {myProjects} from "../constants/index.js";
import {Center, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import CanvasLoader from "../components/CanvasLoader.jsx";
import DemoComputer from "../components/DemoComputer.jsx";
import HeroCamera from "../components/HeroCamera.jsx";

const projectCount = myProjects.length;
const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const currentProject = myProjects[selectedProjectIndex];

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };
    return (
        <section className="c-space my-20">
            <p className="head-text">My Selected Work</p>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className='flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200'>
                    <div className='absolute top-0 right-0'>
                        <img
                            src={currentProject.spotlight}
                            alt='spotlight'
                            className='w-full h-96 rounded-xl object-cover'
                        />
                    </div>

                    <div className='p-3 backdrop-blur-3xl backdrop-filter w-fit rounded-xl' style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt='logo' className='w-10 h-10 shadow-sm' />
                    </div>

                    <div className='flex flex-col gap-5 text-white-600 my-5'>
                        <p className='text-white text-2xl font-semibold animatedText'> {currentProject.title} </p>
                        <p className='animatedText'> {currentProject.desc} </p>
                        <p className='animatedText'> {currentProject.subdesc} </p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className="tech-logo">
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>

                        <a
                            className="flex items-center gap-2 cursor-pointer text-white-600"
                            href={currentProject.href}
                            target="_blank"
                            rel="noreferrer">
                            <p>Check Live Site</p>
                            <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
                        </a>
                    </div>

                    <div className="flex justify-between items-center mt-7">
                        <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
                            <img src="/assets/left-arrow.png" alt="left arrow" />
                        </button>

                        <button className="arrow-btn" onClick={() => handleNavigation('next')}>
                            <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={5.8} position={[0, -7, 0]} rotation={[0, -0.1, 0]}>
                                    <HeroCamera>
                                        <DemoComputer texture={currentProject.texture} />
                                    </HeroCamera>
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                </div>
            </div>
        </section>
    )
}
export default Projects
