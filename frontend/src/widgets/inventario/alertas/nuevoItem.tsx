import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  IconButton,
  useColorMode,
  FormControl,
  FormLabel,
  Input,
  HStack,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { minDate } from "../../utils/dateUtils";

function NuevoItemInventario() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { colorMode } = useColorMode();

  // variables
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [outDate, setOutDate] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const date = new Date();

  return (
    <>
      <Button
        fontSize={"1.6em"}
        fontWeight={"bold"}
        p={"35px"}
        colorScheme={"orange"}
        onClick={onOpen}
        display={{ base: "none", md: "flex" }}
      >
        Nuevo Item
      </Button>

      <IconButton
        display={{ base: "flex", md: "none" }}
        isRound
        w={"70px"}
        h={"70px"}
        colorScheme={"orange"}
        // bg={"#C0F3B7"}
        // _hover={{ bg: "#7BE26B" }}
        aria-label={"Agregar Item"}
        fontSize={"3.3em"}
        // color={"#737373"}
        icon={<MdAdd />}
        onClick={onOpen}
      ></IconButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Agregar Item
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre"
                  value={name}
                  onChange={() => setName}
                />
              </FormControl>
              <HStack alignItems={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Categoría</FormLabel>
                  <Input
                    placeholder="Categoría"
                    value={category}
                    onChange={() => setCategory}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Fecha de Salida</FormLabel>
                  <Input
                    type="date"
                    value={outDate?.toString()}
                    onChange={() => setOutDate}
                    min={minDate(date)}
                  />
                  <FormHelperText fontStyle={"italic"}>Opcional</FormHelperText>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  value={desc}
                  onChange={() => setDesc}
                />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onClose} mr={3}>
                Aceptar
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default NuevoItemInventario;
