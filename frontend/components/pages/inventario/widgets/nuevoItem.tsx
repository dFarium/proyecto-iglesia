import { IItemInventario, createItemInventario } from "@/data/inventario/item";
import { minDate, textDefaultDate } from "@/utils/dateUtils";
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
  FormControl,
  FormLabel,
  Input,
  HStack,
  FormHelperText,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NuevoItemInventario() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // variables
  const [name, setName] = useState<string>("");
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [cantidadErr, setCantidadErr] = useState<boolean>(false);
  const [outDate, setOutDate] = useState<Date>();
  const [desc, setDesc] = useState<string>("");
  const [state, setState] = useState<string>("Activo");
  const date = new Date();

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
    if (cantidad.toString().trim() == "") {
      setCantidadErr(true);
      error = true;
    }
    if (error) {
      return false;
    } else {
      setCantidadErr(false);
      setNameErr(false);
    }
    return true;
  };

  const mutation = useMutation({
    mutationFn: async (newItem: IItemInventario) => {
      const res = await createItemInventario(newItem);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemsInventario"] });
    },
  });

  return (
    <>
      <Button
        fontSize={"1.6em"}
        fontWeight={"bold"}
        p={"35px"}
        colorScheme={"newInventarioItemButton"}
        onClick={onOpen}
        display={{ base: "none", md: "flex" }}
      >
        Nuevo Item
      </Button>

      <IconButton
        display={{ base: "flex", md: "none" }}
        isRound
        w={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        colorScheme={"newInventarioItemButton"}
        aria-label={"Agregar Item"}
        fontSize={{ base: "3em", md: "3.3em" }}
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
              <FormControl isInvalid={nameErr}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre"
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
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Input placeholder="Estado" onChange={handleStateChange} />
                </FormControl>
                <FormControl isInvalid={cantidadErr}>
                  <FormLabel>Cantidad</FormLabel>
                  <Input
                    value={cantidad}
                    type="text"
                    onChange={handleCantidadChange}
                  />
                  <FormErrorMessage>
                    Ingrese la cantidad
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack alignItems={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Categoría</FormLabel>
                  <Input
                    placeholder="Categoría"
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
                    onChange={handleOutDateChange}
                    min={minDate(date)}
                  />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    Opcional
                  </FormHelperText>
                </FormControl>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  onChange={handleDescChange}
                />
                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                  {desc.length} / 200
                </FormHelperText>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                mr={3}
                onClick={() => {
                  setName("");
                  setNameErr(false);

                  setCantidad(1);
                  setCantidadErr(false);

                  setCategory("");
                  setDesc("");
                  setOutDate(undefined);
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  console.log(cantidad);
                  validation();
                  // if (validation()) {
                  //   mutation.mutate({
                  //     name: name,
                  //     categoria: category,
                  //     cantidad: cantidad,
                  //     outDate: outDate,
                  //     state: state,
                  //     desc: desc,
                  //   });
                  //   onClose();
                  //   setCantidad(1);
                  //   setName("");
                  //   setCategory("");
                  //   setDesc("");
                  //   setOutDate(undefined);
                  //   onClose();
                  // }
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

export default NuevoItemInventario;
