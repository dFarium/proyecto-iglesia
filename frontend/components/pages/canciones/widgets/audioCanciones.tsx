import { type NextPage } from "next";
import React, { useRef, useState } from "react";
import { MdPause, MdPlayArrow,MdVolumeUp } from "react-icons/md";
import Image from "next/image";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Link,
    Spinner,
    Text,
    useColorMode,
    useDisclosure,
    Box,
    Flex,
    VStack,
  } from "@chakra-ui/react";

const sound = {
  title: "Card Title",
  waveType: "Ocean.mp3",
  imageUrl: "Notas_Musicales.png",
};

function ReproducirAudio () {
  const [play, setPlay] = useState(false);
  const oceanRef = useRef<HTMLAudioElement>(null);
  const MAX = 20;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  function toggleAudio(): void {
    if (play) {
      oceanRef.current?.pause();
      setPlay(false);
    } else {
      void oceanRef.current?.play();
      setPlay(true);
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const volume = Number(value) / MAX;
    if(oceanRef.current){
      oceanRef.current.volume = volume;
    }
  }

  return (
    <>
    <Link
        onClick={() => {
          onOpen();
        }}
      />
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isCentered>
        <AlertDialogContent maxW={"1000px"}>
            <AlertDialogBody p={"15px"} display={"flex"} justifyContent={"center"}>
            <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="bg-accent flex h-fit max-w-fit flex-col rounded-lg border-2 border-cyan-700 pb-4 text-center shadow">
          <div className="relative flex flex-col space-y-0">
            <Image
              width={200}
              height={200}
              className="mx-auto max-h-48 w-full flex-shrink-0 rounded-t-lg pb-2"
              src={sound.imageUrl}
              alt="waves"
            />
            <button
              onClick={toggleAudio}
              type="button"
              className="absolute right-5 left-0 top-[15%] m-auto w-9 rounded-full p-2 text-white shadow-sm"
            >
              {!play ? (
                <MdPlayArrow className="h-12 w-12" aria-hidden="true" />
              ) : (
                <MdPause className="h-12 w-12" aria-hidden="true" />
              )}
            </button>
            <dl className="mt-1 flex flex-col p-4 ">
              <dd className="text-lg text-white">{sound.title}</dd>
            </dl>
            <div className="mx-4 flex">
              <input
                type="range"
                className="mr-2 w-full accent-cyan-700"
                min={0}
                max={MAX}
                onChange={(e) => handleVolume(e)}
              />
              <MdVolumeUp
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <audio ref={oceanRef} loop src={"/Ocean.mp3"} />
      </main>
            </AlertDialogBody>
        </AlertDialogContent>
    </AlertDialog>
      
    </>
  );
};

export default ReproducirAudio;