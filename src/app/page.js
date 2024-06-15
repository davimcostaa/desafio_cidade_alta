"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalGame from "@/components/ModalGame";
import { useState } from "react";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <main className="bg-primary bg-character bg-no-repeat bg-center bg-contain h-screen w-screen">
        <Header />

        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 ">
          <Button onClick={toggleModal} text="Jogar" />
        </div>

      </main> 
      <ModalGame isOpen={isModalOpen} toggleModal={toggleModal} />
    </>

  );
}
