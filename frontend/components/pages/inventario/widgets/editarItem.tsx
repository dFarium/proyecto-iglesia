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
  FormErrorMessage,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdCreate } from "react-icons/md";
import { minDate, textDate, textDefaultDate } from "@/utils/dateUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IItemInventario, editItemInventario } from "@/data/inventario/item";

function EditarItemInventario(props: {
  item: string;
  cantidad: number;
  category: string;
  state: string;
  outDate: Date;
  desc: string;
  id: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { colorMode } = useColorMode();

  // variables
  const [name, setName] = useState<string>(props.item);
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<number>(props.cantidad);
  const [cantidadErr, setCantidadErr] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(props.category);
  const [outDate, setOutDate] = useState<Date>(props.outDate);
  const [desc, setDesc] = useState<string>(props.desc);
  const [state, setState] = useState<string>(props.state);
  const date = new Date();

  const showDate = (): string => {
    if (props.outDate) {
      return textDate(props.outDate);
    }
    return "Sin fecha";
  };

  const queryClient = useQueryClient();
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setNameErr(false);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleCantidadChange = (e: any) => {
    const r = e.target.value.replace(/\D/g, "");
    setCantidad(r);
    setCantidadErr(false);
  };

  const handleOutDateChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setOutDate(date);
  };

  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  const handleStateChange = (e: any) => {
    setState(e.target.value);
  };

  const validation = (): boolean => {
    let error: boolean = false;
    if (name.trim() == "") {
      setNameErr(true);
      error = true;
    }
    if (error) {
      return false;
    }
    return true;
  };

  const mutation = useMutation({
    mutationFn: async (newItem: IItemInventario) => {
      const res = await editItemInventario(props.id, newItem);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemsInventario"] });
    },
  });

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
              <FormControl isInvalid={nameErr}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre"
                  value={name}
                  onChange={handleNameChange}
                  maxLength={50}
                />
                {nameErr ? (
                  <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                ) : (
                  <FormHelperText pl={"5px"} fontStyle={"italic"}>
                    {name.length} / 50
                  </FormHelperText>
                )}
              </FormControl>
              <HStack alignItems={"start"} mt={"25px"}>
                <FormControl isInvalid={cantidadErr}>
                  <FormLabel>Cantidad</FormLabel>
                  <Input
                    placeholder="Cantidad"
                    type="text"
                    value={cantidad}
                    onChange={handleCantidadChange}
                  />
                </FormControl>
                <FormErrorMessage>Ingrese solamente números</FormErrorMessage>
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    placeholder="Estado"
                    value={state}
                    onChange={handleStateChange}
                  />
                </FormControl>
              </HStack>
              <HStack alignItems={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Categoría</FormLabel>
                  <Input
                    placeholder="Categoría"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                  <FormHelperText pl={"5px"} fontStyle={"italic"}>
                    {category.length} / 50
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Fecha de Salida</FormLabel>
                  <Input
                    type="date"
                    value={textDefaultDate(outDate)}
                    onChange={handleOutDateChange}
                    min={minDate(date)}
                  />
                  <FormHelperText fontStyle={"italic"}>
                    {!outDate ? "Actual: Sin fecha" : "Actual: " + showDate()}
                  </FormHelperText>
                </FormControl>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  value={desc}
                  onChange={handleDescChange}
                />
                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                  {desc.length} / 200
                </FormHelperText>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button mr={3} ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (validation()) {
                    mutation.mutate({
                      name: name,
                      categoria: category,
                      cantidad: cantidad,
                      outDate: new Date(outDate),
                      state: "Activo",
                      desc: desc,
                    });
                    onClose();
                  }
                }}
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default EditarItemInventario;
