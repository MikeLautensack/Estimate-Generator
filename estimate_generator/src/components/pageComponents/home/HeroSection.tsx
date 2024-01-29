'use client'

import Nav from '../../misc/Nav'
import { motion } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import ThreeDLogo from '../../misc/ThreeDLogo'
import Link from 'next/link'
import { FaAnglesDown } from "react-icons/fa6";
import { Model } from '@/components/models/Worker'

export default function HeroSection() {
  return (
    <section
      id='hero' 
      className='flex flex-col w-full h-screen'
    >

        <Nav />

        <div id='content' className='flex flex-col flex-grow justify-center desktop:justify-between items-center desktop:items-center desktop:flex-row relative max-h-[calc(100vh-52px)]'>
          
          <motion.div 
            id='hero content' 
            className='flex flex-col tablet:mx-16 desktop:mx-40 justify-center desktop:absolute desktop:z-10'
            initial={{ opacity: 0, y: 600 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1.3 }}
            whileInView={{ opacity: 1 }}
          >
            <p className='text-blue-500 text-[16px] font-medium text-center tablet:text-left'>Welcome to</p>
            <h1 className='text-blue-500 text-[32px] font-bold desktop:text-left tablet:text-[89.76px] tablet:text-left'>Estimate Generator</h1>
            <div className='w-full flex gap-4 my-2'>
              <Link
                  id='signup-button'
                  className='flex flex-1 py-2 px-16 rounded-full justify-center font-semibold bg-blue-500 text-secondary500 desktop:flex-none'
                  href='/register'
              >
                Sign Up
              </Link>
              <Link
                  id='login-button'
                  className='flex flex-1 py-2 rounded-full justify-center font-semibold border-2 border-blue-500 text-secondary500 desktop:hidden'
                  href='/login'
              >
                  Log In
              </Link>
            </div>
          </motion.div>

          <motion.div 
            id='canvas-container'
            className='flex aspect-square w-full h-1/2 mx-auto max-h-[calc(100vh-52px)] desktop:absolute'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", delay: 1, duration: 2 }}
          >
            <Canvas
              id='canvas'
              className='w-[300px]'
            >
              <ambientLight intensity={4.5} />
              <directionalLight position={[-2,5,2]} intensity={1}/>
              <Model scale={1.8} />
            </Canvas>
          </motion.div>

          <motion.div 
            id='arrow'
            className='my-4 bottom-0 absolute desktop:w-full flex justify-center items-center'
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.25, repeat: Infinity }}
          >
            <FaAnglesDown />
          </motion.div>

        </div>

      </section>
  )
}