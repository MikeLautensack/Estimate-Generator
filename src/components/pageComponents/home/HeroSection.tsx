"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
// import ThreeDLogo from "../../misc/ThreeDLogo";
import Link from "next/link";
import { FaAnglesDown } from "react-icons/fa6";
import { Model } from "@/components/models/Worker";
import { Button, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <section id="hero" className="flex flex-col w-full h-screen">
      <div
        id="content"
        className="flex flex-col flex-grow justify-center desktop:justify-between items-center desktop:items-center desktop:flex-row relative h-[calc(100vh-56px)]"
      >
        {/**
         * Hero content
         */}
        <motion.div
          id="hero content"
          className="flex flex-col tablet:mx-16 desktop:mx-40 justify-center desktop:absolute desktop:z-10"
          initial={{ opacity: 0, y: 600 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", duration: 1.3 }}
          whileInView={{ opacity: 1 }}
        >
          <Typography color="primary" variant="h6">
            Welcome to
          </Typography>
          <Typography color="primary" variant="h1">
            Estimate Generator
          </Typography>
          <div
            id="hero-section-auth-buttons-group"
            className="w-full flex gap-4 my-2"
          >
            <Link id="signin-button" href="/signin" className="w-full">
              <Button
                variant="outlined"
                className="flex flex-1 py-2 rounded-full justify-center"
                fullWidth
              >
                Sign In
              </Button>
            </Link>
            <Link id="signup-button" href="/signup" className="w-full">
              <Button
                variant="contained"
                className="flex flex-1 py-2 rounded-full justify-center"
                fullWidth
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </motion.div>

        {/**
         * Scene
         */}
        <motion.div
          id="canvas-container"
          className="flex w-full h-1/2 mx-auto max-h-[calc(100vh-52px)] desktop:absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", delay: 1, duration: 2 }}
        >
          <Canvas id="canvas" className="w-[300px] bg-transparent">
            <ambientLight intensity={4.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Model scale={1.8} />
          </Canvas>
        </motion.div>

        {/**
         * Animated down arrow
         */}
        {/* <motion.div
          id="arrow"
          className="my-4 bottom-0 absolute desktop:w-full flex justify-center items-center"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.25, repeat: Infinity }}
        >
          <FaAnglesDown />
        </motion.div> */}
      </div>
    </section>
  );
}
