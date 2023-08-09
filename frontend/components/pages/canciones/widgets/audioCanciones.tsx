import { type NextPage } from "next";
import React, { useRef, useState } from "react";
import { MdPause, MdPlayArrow,MdVolumeUp } from "react-icons/md";
import Image from "next/image";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogOverlay,
    HStack,
    Button,
    Link,
    Input,
    Spinner,
    Text,
    useColorMode,
    useDisclosure,
    Box,
    Flex,
    VStack,
    Center,
  } from "@chakra-ui/react";



function ReproducirAudio (props: { nombre: string;}) {
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
      oceanRef.current?.play();
      setPlay(true);
    }
  }

  const sound = {
    title: props.nombre,
    waveType: "Ocean.mp3",
    imageUrl: "/Escuchar.jpeg",
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const volume = Number(value) / MAX;
    oceanRef.current.volume = volume;
  }
  // const ruta = ``;
  // console.log(ruta);
  return (
    <>
    <Link
        onClick={() => {
          onOpen();
        }}>
          {props.nombre}
      </Link>
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isCentered>
      <AlertDialogContent maxW={"1000px"}>
        <AlertDialogBody p={"15px"} display={"flex"} justifyContent={"center"}>
            <main className="flex min-h-screen flex-col items-center justify-center bg-background">
            <Box
              bg="accent"
              display="flex"
              height="fit-content"
              maxWidth="fit-content"
              flexDir="column"
              rounded="lg"
              borderWidth="2px"
              borderColor="cyan.700"
              pb="4"
              textAlign="center"
              boxShadow="base"
            >
                <Flex
                  className="relative"
                  flexDirection="column"
                >
                  <Box mt="0">
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Image
                        width={200}
                        height={200}
                        className="mx-auto max-h-48 w-full flex-shrink-0 rounded-t-lg pb-2"
                        src={sound.imageUrl}
                        alt="waves"
                      />
                    </Box>
                  </Box>
                  <Box mt="4">
                  <HStack spacing={20} justify="center">
                  <Box>
                    <Button
                      onClick={toggleAudio}
                      type="button"
                      className="absolute right-5 left-0 top-[15%] m-auto w-9 rounded-full p-2 text-white shadow-sm"
                    >
                    {!play ? (
                      <MdPlayArrow className="h-12 w-12" aria-hidden="true" />
                    ) : (
                      <MdPause className="h-12 w-12" aria-hidden="true" />
                    )}
                    </Button>
                  </Box>
                    {/* <Box mx="4" display="flex">
                    <MdVolumeUp
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                      <input
                        type="range"
                        className="mr-2 w-full accent-cyan-700"
                        min={0}
                        max={MAX}
                        onChange={(e) => handleVolume(e)}
                      />
                    </Box> */}
                  </HStack>
                  </Box>
                  <Box mt="4">
                  <dl className="mt-1 flex flex-col p-4 ">
                    <dd className="text-lg text-white">{sound.title}</dd>
                  </dl>
                  <HStack>
                    <Box mx="4" display="flex">
                    <MdVolumeUp
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                      <input
                        type="range"
                        className="mr-2 w-full accent-cyan-700"
                        min={0}
                        max={MAX}
                        onChange={(e) => handleVolume(e)}
                      />
                    </Box>
                  </HStack>
                  </Box>
                </Flex>
              </Box>
              <audio ref={oceanRef} loop src={`${process.env.API_URL}/upload/Audio/${props.nombre}`} />
            </main>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default ReproducirAudio;