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

  // useEffect(() => {
  //   viewImg("Imagenes", props.imgScr)
  //     .then((res) => {
  //       console.log(res.data.imgPath);
  //       setImagenUrl(res.data.imgPath);
  //       console.log("imagen: ", imagenUrl);
  //     })
  //     .catch((err) => {
  //       console.log("Error al ver imagen: ", err);
  //     });
  // });

  // const imgScr = async () => {
  //   try {
  //     await viewImg("Imagenes", props.imgScr).then(async (res) => {
  //       console.log(res.data.imgPath);
  //       setImagenUrl(res.data.imgPath);
  //       console.log("imagen: ", imagenUrl);
  //       // return res.data.imgPath;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              <Image
                src={`${process.env.API_URL}/upload/Imagenes/${props.imgScr}`}
                fallback={LoadingImage(imagenUrl)}
                objectFit={"contain"}
                borderRadius={"15px"}
                border={
                  colorMode == "light" ? lightBorderImage : darkBorderImage
                }
              />
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

export { VerFotoItem };
