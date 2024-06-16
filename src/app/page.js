"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalGame from "@/components/ModalGame";
import { useState } from "react";
import { motion } from 'framer-motion';
export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <main className="bg-primary bg-character bg-no-repeat bg-center bg-contain h-screen w-screen">

      <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
        </motion.div>


      <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={toggleModal} text="Jogar" />
          </motion.div>
      </div>

      </main> 
      <ModalGame isOpen={isModalOpen} toggleModal={toggleModal} />
  </>

  );
}
