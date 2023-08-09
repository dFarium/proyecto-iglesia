import { viewImg } from "@/data/archivos/archivos";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Image,
  Link,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
  Box,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

function VerLetraCancion(props: { nombre: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const cancelRef = useRef(null);
  const [imagenUrl, setImagenUrl] = useState<string>("");

  const lightBorderImage = "5px #5c5c5c solid";
  const darkBorderImage = "5px #ffe1af solid";
  return (
    <>
      <Link
        onClick={() => {
          onOpen();
          // imgScr();
        }}
      >
        {props.nombre}
      </Link>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW={"1000px"}>
            <AlertDialogBody
              p={"15px"}
              display={"flex"}
              justifyContent={"center"}
            >
              {/* {imagenUrl && ( */}
              {/* <Image
                src={`${process.env.API_URL}/upload/Imagenes/${props.imgScr}`}
                fallback={LoadingImage(imagenUrl)}
                objectFit={"contain"}
                borderRadius={"15px"}
                border={
                  colorMode == "light" ? lightBorderImage : darkBorderImage
                }
              /> */}
              {/* )} */}
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function LoadingImage(src: string) {
  if (src == "") {
    return (
      <VStack minH={"80px"} justify={"center"} align={"center"}>
        <Text fontWeight={"bold"}>No hay foto disponible</Text>
      </VStack>
    );
  }
  return (
    <VStack minH={"300px"} justify={"center"} align={"center"}>
      <Spinner size={"xl"} />
    </VStack>
  );
}

export default VerLetraCancion ;