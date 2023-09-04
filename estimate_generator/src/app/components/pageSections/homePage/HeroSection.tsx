'use client'

import Button from '../../Button'
import Nav from '../../Nav'
import { motion } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import ThreeDLogo from '../../ThreeDLogo'
import { OrbitControls } from '@react-three/drei'

export default function HeroSection() {
  return (
    <section 
      id='hero' 
      className='flex flex-col w-full bg-gradient-to-b from-primary400 to-primary200 h-screen'
    >

        <Nav />

        <div className='flex flex-col flex-grow justify-center desktop:justify-between items-center desktop:items-center desktop:flex-row'>
          
          <motion.div 
            id='hero content' 
            className='flex flex-col gap-2 tablet:mx-16 tablet:max-w-[35rem] desktop:ml-32 desktop:max-w-[40rem]'
            initial={{ opacity: 0, y: 600 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1.3 }}
            whileInView={{ opacity: 1 }}
          >
            <h1 className='text-primary500 text-[24px] font-bold text-center tablet:text-[54px] tablet:text-left'>Welcome to Estimate Generator</h1>
            <div className='w-full flex gap-4 my-4'>
              <Button
                  className='w-[50%] bg-primary500 text-primary100 p-2 text-[14px] font-semibold max-w-[248px] rounded'
              >
                Sign Up
              </Button>
              <Button
                  className='w-[50%] bg-primary100 border-2 border-primary500 text-primary500 p-2 font-medium text-[14px] max-w-[248px] font text-base tablet:hidden rounded'
              >
                  Log In
              </Button>
            </div>
          </motion.div>

          <motion.div 
            id='canvas-container'
            className='w-50 aspect-square desktop:mr-32'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", delay: 1.75, duration: 3 }}
          >
            <Canvas
              id='canvas'
              className=''
            >
              <OrbitControls enableZoom={false}/>
              <ambientLight intensity={0.5} />
              <directionalLight position={[-2,5,2]} intensity={1} color='blue'/>
              <ThreeDLogo />
            </Canvas>
          </motion.div>

        </div>

      </section>
  )
}
