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
} from "@chakra-ui/react";
import { useRef } from "react";

function VerFotoItem(props: { nombre: string; imgScr: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const cancelRef = useRef(null);

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
              <Image
                src={`https://picsum.photos/${props.imgScr}`}
                fallback={LoadingImage(props.imgScr)}
                objectFit={"cover"}
                borderRadius={"15px"}
                border={
                  colorMode == "light" ? lightBorderImage : darkBorderImage
                }
              />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function LoadingImage(src: string) {
  if (src == "") {
    return <Text>No hay foto disponible</Text>;
  }
  return <Spinner size={"xl"} />;
}

export { VerFotoItem };
