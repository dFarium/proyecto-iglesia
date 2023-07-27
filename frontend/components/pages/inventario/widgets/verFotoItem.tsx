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

function VerFotoItem(props: { nombre: string; imgScr: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const cancelRef = useRef(null);
  const [imagenUrl, setImagenUrl] = useState<string>("");

  useEffect(() => {
    viewImg(props.imgScr, "Imagenes")
      .then((res) => setImagenUrl(res.data))
      .catch((err) => {
        console.log("Error al recibir imagen", err);
      });
  }, []);

  const lightBorderImage = "5px #5c5c5c solid";
  const darkBorderImage = "5px #ffe1af solid";
  return (
    <>
      <Link onClick={onOpen}>{props.nombre}</Link>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody
              p={"15px"}
              display={"flex"}
              justifyContent={"center"}
              maxH={"600px"}
            >
              {imagenUrl && (
                <Image
                  src={imagenUrl}
                  fallback={LoadingImage(props.imgScr)}
                  objectFit={"cover"}
                  borderRadius={"15px"}
                  border={
                    colorMode == "light" ? lightBorderImage : darkBorderImage
                  }
                />
              )}
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

export { VerFotoItem };
