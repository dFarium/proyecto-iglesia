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
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdCreate } from "react-icons/md";

import { Item } from "../tabla/inventarioTable";
import { epochToDate, minDate, textDate } from "../../utils/dateUtils";

function EditarItemInventario(props: {
  item: string;
  category: string;
  outDate: string;
  desc: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { colorMode } = useColorMode();

  // variables
  const [name, setName] = useState<string>(props.item);
  const [category, setCategory] = useState<string>(props.category);
  const [outDate, setOutDate] = useState<string>(props.outDate);
  const [desc, setDesc] = useState<string>(props.desc);
  const date = new Date();

  return (
    <>
      <IconButton
        bg={
          colorMode == "light"
            ? "inventarioItemEditBg.light"
            : "inventarioItemEditBg.dark"
        }
        isRound
        _hover={{ bg: "#66b4ff" }}
        fontSize={"1.4em"}
        aria-label={"Editar"}
        icon={<MdCreate />}
        onClick={onOpen}
        color={colorMode == "light" ? "#4A5568" : "#2D3748"}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Editar Item
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
                    value={outDate}
                    onChange={() => setOutDate}
                    min={minDate(date)}
                  />
                  <FormHelperText fontStyle={"italic"}>
                    Actual: {textDate(epochToDate(outDate))}
                  </FormHelperText>
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

export default EditarItemInventario;
