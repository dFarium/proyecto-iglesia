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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
  Switch,
  Box,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import {
  MdAdd,
  MdComputer,
  MdPiano,
  MdReceipt,
  MdReceiptLong,
} from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NuevoInstrumento() {
  // use disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef(null);

  // variables
  const [nombre, setNombre] = useState<string>("");
  const [nombreErr, setNombreErr] = useState<boolean>(false);

  const [cantidad, setCantidad] = useState<number>(1);
  const [cantidadErr, setCantidadErr] = useState<boolean>(false);

  const [fechaSalida, setFechaSalida] = useState<Date>();
  const [ultMant, setUltMant] = useState<Date>();

  const [cicloMant, setCicloMant] = useState<number>();

  const [desc, setDesc] = useState<string>("");
  const [prestable, setPrestable] = useState<boolean>(false);

  const date = new Date();
  const queryClient = useQueryClient();

  const handleNombreChange = (e: any) => {
    setNombre(e.target.value);
    setNombreErr(false);
  };

  const handleCantidadChange = (e: any) => {
    const r = e.target.value.replace(/\D/g, "");
    setCantidad(r);
    setCantidadErr(false);
  };

  const handleFechaSalidaChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setFechaSalida(date);
  };

  const handleUltMantChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setUltMant(date);
  };

  const validation = (): boolean => {
    let error: boolean = false;
    if (nombre.trim() == "") {
      setNombreErr(true);
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
      setNombreErr(false);
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
      queryClient.invalidateQueries({ queryKey: ["itemsInventarioEquipos"] });
      queryClient.invalidateQueries({ queryKey: ["itemsInventarioInstrumentos"] });
    },
  });

  return (
    <>
      <Button
        fontSize={"1.6em"}
        fontWeight={"bold"}
        p={"35px"}
        colorScheme={"newInventarioItemButton"}
        display={{ base: "none", md: "flex" }}
        onClick={onOpen}
      >
        Nuevo Item
      </Button>

      <Button
        as={IconButton}
        display={{ base: "flex", md: "none" }}
        isRound
        w={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        colorScheme={"newInventarioItemButton"}
        aria-label={"Agregar Item"}
        fontSize={{ base: "3em", md: "3.3em" }}
        icon={<MdAdd />}
        onClick={onOpen}
      >
        Nuevo Item
      </Button>

      {/* Alerta de Instrumento */}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              Agregar Instrumento Musical
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl>
                <FormLabel>Nombre</FormLabel>

                <Input
                  placeholder="Nombre"
                  onChange={handleNombreChange}
                  maxLength={50}
                />
                {nombreErr ? (
                  <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                ) : (
                  <FormHelperText pl={"5px"} fontStyle={"italic"}>
                    {nombre.length} / 50
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mt={"25px"}>
                <FormLabel>Fecha de Salida</FormLabel>
                <Input
                  type="date"
                  onChange={handleFechaSalidaChange}
                  min={minDate(date)}
                />
                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                  Opcional
                </FormHelperText>
              </FormControl>
              <HStack align={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Ciclo de Mantemiento</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Última Mantención</FormLabel>
                  <Input type="date" onChange={handleUltMantChange} />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    Opcional
                  </FormHelperText>
                </FormControl>
              </HStack>
              <HStack mt={"25px"} justify={"space-between"}>
                <Button>Subir Foto</Button>
                <Box>
                  <FormControl
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"end"}
                  >
                    <FormLabel>¿Disponible para préstamo?</FormLabel>
                    <Switch
                      id="prest"
                      onChange={(e) => {
                        setPrestable(e.target.checked);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
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
                  setNombre("");
                  setNombreErr(false);
                  setFechaSalida(undefined);
                  setDesc("");
                  setCicloMant(undefined);
                  setPrestable(false);
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  // validation();
                  if (validation()) {
                    mutation.mutate({
                      nombre,
                      categoria: "Instrumento",
                      estado: "Activo",
                      fechaSalida,
                      cantidad: 1,
                      uploader: "Yo",
                      desc,
                      cicloMant,
                      ultMant: date,
                      ultMod: "Yo",
                      prestable,
                    });
                    setNombre("");
                    setNombreErr(false);
                    setCantidad(1);
                    setCantidadErr(false);
                    setFechaSalida(undefined);
                    setUltMant(undefined);
                    setCicloMant(undefined);
                    setDesc("");
                    setPrestable(false);
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

function NuevoEquipoElec() {
  // use disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef(null);

  // variables
  const [nombre, setNombre] = useState<string>("");
  const [nombreErr, setNombreErr] = useState<boolean>(false);

  const [cantidad, setCantidad] = useState<number>(1);
  const [cantidadErr, setCantidadErr] = useState<boolean>(false);

  const [fechaSalida, setFechaSalida] = useState<Date>();
  const [ultMant, setUltMant] = useState<Date>();

  const [cicloMant, setCicloMant] = useState<number>();

  const [desc, setDesc] = useState<string>("");
  const [prestable, setPrestable] = useState<boolean>(false);

  const date = new Date();
  const queryClient = useQueryClient();

  const handleNombreChange = (e: any) => {
    setNombre(e.target.value);
    setNombreErr(false);
  };

  const handleCantidadChange = (e: any) => {
    const r = e.target.value.replace(/\D/g, "");
    setCantidad(r);
    setCantidadErr(false);
  };

  const handleFechaSalidaChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setFechaSalida(date);
  };

  const handleUltMantChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setUltMant(date);
  };

  const validation = (): boolean => {
    let error: boolean = false;
    if (nombre.trim() == "") {
      setNombreErr(true);
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
      setNombreErr(false);
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
        display={{ base: "none", md: "flex" }}
        onClick={onOpen}
      >
        Nuevo Item
      </Button>

      <Button
        as={IconButton}
        display={{ base: "flex", md: "none" }}
        isRound
        w={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        colorScheme={"newInventarioItemButton"}
        aria-label={"Agregar Item"}
        fontSize={{ base: "3em", md: "3.3em" }}
        icon={<MdAdd />}
        onClick={onOpen}
      >
        Nuevo Item
      </Button>

      {/* Alerta de Equipo Electronico */}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Agregar Equipo Electrónico
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack align={"start"}>
                <FormControl isInvalid={nombreErr}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    onChange={handleNombreChange}
                    maxLength={50}
                  />
                  {nombreErr ? (
                    <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                  ) : (
                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                      {nombre.length} / 50
                    </FormHelperText>
                  )}
                </FormControl>
                <Box>
                  <FormControl isInvalid={cantidadErr}>
                    <FormLabel>Cantidad</FormLabel>
                    <Input
                      value={cantidad}
                      type="text"
                      onChange={handleCantidadChange}
                    />
                    <FormErrorMessage>Ingrese la cantidad</FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Fecha de Salida</FormLabel>
                <Input
                  type="date"
                  onChange={handleFechaSalidaChange}
                  min={minDate(date)}
                />
                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                  Opcional
                </FormHelperText>
              </FormControl>
              <HStack alignItems={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Ciclo de Mantemiento</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Última Mantención</FormLabel>
                  <Input type="date" onChange={handleUltMantChange} />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    Opcional
                  </FormHelperText>
                </FormControl>
              </HStack>
              <HStack mt={"25px"} justify={"space-between"}>
                <Button>Subir Foto</Button>
                <Box>
                  <FormControl
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"end"}
                  >
                    <FormLabel>¿Disponible para préstamo?</FormLabel>
                    <Switch
                      id="prest"
                      onChange={(e) => {
                        setPrestable(e.target.checked);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
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
                  setNombre("");
                  setNombreErr(false);
                  setCantidad(1);
                  setCantidadErr(false);
                  setFechaSalida(undefined);
                  setUltMant(undefined);
                  setCicloMant(undefined);
                  setDesc("");
                  setPrestable(false);
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (validation()) {
                    mutation.mutate({
                      nombre,
                      categoria: "Equipo",
                      estado: "Activo",
                      fechaSalida,
                      cantidad,
                      uploader: "Yo",
                      desc,
                      cicloMant,
                      ultMant: date,
                      ultMod: "Yo",
                      prestable,
                    });
                    setNombre("");
                    setFechaSalida(undefined);
                    setDesc("");
                    setCicloMant(undefined);
                    setPrestable(false);
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

function NuevoItemInventario() {
  // use disclosures
  const {
    isOpen: isOpenInstrumentos,
    onOpen: onOpenInstrumentos,
    onClose: onCloseInstrumentos,
  } = useDisclosure();

  const {
    isOpen: isOpenEquipo,
    onOpen: onOpenEquipo,
    onClose: onCloseEquipo,
  } = useDisclosure();

  const {
    isOpen: isOpenVarios,
    onOpen: onOpenVarios,
    onClose: onCloseVarios,
  } = useDisclosure();
  const cancelRef = useRef(null);

  // variables
  const [nombre, setNombre] = useState<string>("");
  const [nombreErr, setNombreErr] = useState<boolean>(false);

  const [cantidad, setCantidad] = useState<number>(1);
  const [cantidadErr, setCantidadErr] = useState<boolean>(false);

  const [fechaSalida, setFechaSalida] = useState<Date>();
  const [ultMant, setUltMant] = useState<Date>();

  const [cicloMant, setCicloMant] = useState<number>();

  const [desc, setDesc] = useState<string>("");
  const [prestable, setPrestable] = useState<boolean>(false);

  const date = new Date();
  const queryClient = useQueryClient();

  const handleNombreChange = (e: any) => {
    setNombre(e.target.value);
    setNombreErr(false);
  };

  const handleCantidadChange = (e: any) => {
    const r = e.target.value.replace(/\D/g, "");
    setCantidad(r);
    setCantidadErr(false);
  };

  const handleFechaSalidaChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setFechaSalida(date);
  };

  const handleUltMantChange = (e: any) => {
    const d = new Date(e.target.value);
    const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    setUltMant(date);
  };

  const validation = (): boolean => {
    let error: boolean = false;
    if (nombre.trim() == "") {
      setNombreErr(true);
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
      setNombreErr(false);
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
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          fontSize={"1.6em"}
          fontWeight={"bold"}
          p={"35px"}
          colorScheme={"newInventarioItemButton"}
          display={{ base: "none", md: "flex" }}
        >
          Nuevo Item
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenInstrumentos}>
            <Text mr={"5px"}>Instrumentos</Text>
            {/* <Icon as={MdPiano} /> */}
          </MenuItem>
          <MenuItem onClick={onOpenEquipo}>
            <Text mr={"5px"}>Equipo Electrónico</Text>
            {/* <Icon as={MdComputer} /> */}
          </MenuItem>
          <MenuItem onClick={onOpenVarios}>
            <Text mr={"5px"}>Varios</Text>
            {/* <Icon as={MdReceipt} /> */}
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu autoSelect={false}>
        <MenuButton
          as={IconButton}
          display={{ base: "flex", md: "none" }}
          isRound
          w={{ base: "60px", md: "70px" }}
          h={{ base: "60px", md: "70px" }}
          colorScheme={"newInventarioItemButton"}
          aria-label={"Agregar Item"}
          fontSize={{ base: "3em", md: "3.3em" }}
          icon={<MdAdd />}
        >
          Nuevo Item
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenInstrumentos}>
            <Text mr={"5px"}>Instrumentos</Text>
            {/* <Icon as={MdPiano} /> */}
          </MenuItem>
          <MenuItem onClick={onOpenEquipo}>
            <Text mr={"5px"}>Equipo Electrónico</Text>
            {/* <Icon as={MdComputer} /> */}
          </MenuItem>
          <MenuItem onClick={onOpenVarios}>
            <Text mr={"5px"}>Varios</Text>
            {/* <Icon as={MdReceipt} /> */}
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Alerta de Instrumento */}

      <AlertDialog
        isOpen={isOpenInstrumentos}
        leastDestructiveRef={cancelRef}
        onClose={onCloseInstrumentos}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              Agregar Instrumento Musical
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl>
                <FormLabel>Nombre</FormLabel>

                <Input
                  placeholder="Nombre"
                  onChange={handleNombreChange}
                  maxLength={50}
                />
                {nombreErr ? (
                  <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                ) : (
                  <FormHelperText pl={"5px"} fontStyle={"italic"}>
                    {nombre.length} / 50
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mt={"25px"}>
                <FormLabel>Fecha de Salida</FormLabel>
                <Input
                  type="date"
                  onChange={handleFechaSalidaChange}
                  min={minDate(date)}
                />
                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                  Opcional
                </FormHelperText>
              </FormControl>
              <HStack align={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Ciclo de Mantemiento</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Última Mantención</FormLabel>
                  <Input type="date" onChange={handleUltMantChange} />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    Opcional
                  </FormHelperText>
                </FormControl>
              </HStack>
              <HStack mt={"25px"} justify={"space-between"}>
                <Button>Subir Foto</Button>
                <Box>
                  <FormControl
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"end"}
                  >
                    <FormLabel>¿Disponible para préstamo?</FormLabel>
                    <Switch
                      id="prest"
                      onChange={(e) => {
                        setPrestable(e.target.checked);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
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
                  setNombre("");
                  setNombreErr(false);
                  setFechaSalida(undefined);
                  setDesc("");
                  setCicloMant(undefined);
                  setPrestable(false);
                  onCloseInstrumentos();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  // validation();
                  if (validation()) {
                    mutation.mutate({
                      nombre,
                      categoria: "Instrumento",
                      estado: "Activo",
                      fechaSalida,
                      cantidad: 1,
                      uploader: "Yo",
                      desc,
                      cicloMant,
                      ultMant: date,
                      ultMod: "Yo",
                      prestable,
                    });
                    setNombre("");
                    setNombreErr(false);
                    setCantidad(1);
                    setCantidadErr(false);
                    setFechaSalida(undefined);
                    setUltMant(undefined);
                    setCicloMant(undefined);
                    setDesc("");
                    setPrestable(false);
                    onCloseInstrumentos();
                  }
                }}
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Alerta de Equipo Electronico */}

      <AlertDialog
        isOpen={isOpenEquipo}
        leastDestructiveRef={cancelRef}
        onClose={onCloseEquipo}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Agregar Equipo Electrónico
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack align={"start"}>
                <FormControl isInvalid={nombreErr}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    onChange={handleNombreChange}
                    maxLength={50}
                  />
                  {nombreErr ? (
                    <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                  ) : (
                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                      {nombre.length} / 50
                    </FormHelperText>
                  )}
                </FormControl>
                <Box>
                  <FormControl isInvalid={cantidadErr}>
                    <FormLabel>Cantidad</FormLabel>
                    <Input
                      value={cantidad}
                      type="text"
                      onChange={handleCantidadChange}
                    />
                    <FormErrorMessage>Ingrese la cantidad</FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Fecha de Salida</FormLabel>
                <Input
                  type="date"
                  onChange={handleFechaSalidaChange}
                  min={minDate(date)}
                />
                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                  Opcional
                </FormHelperText>
              </FormControl>
              <HStack alignItems={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Ciclo de Mantemiento</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Última Mantención</FormLabel>
                  <Input type="date" onChange={handleUltMantChange} />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    Opcional
                  </FormHelperText>
                </FormControl>
              </HStack>
              <HStack mt={"25px"} justify={"space-between"}>
                <Button>Subir Foto</Button>
                <Box>
                  <FormControl
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"end"}
                  >
                    <FormLabel>¿Disponible para préstamo?</FormLabel>
                    <Switch
                      id="prest"
                      onChange={(e) => {
                        setPrestable(e.target.checked);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
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
                  setNombre("");
                  setNombreErr(false);
                  setCantidad(1);
                  setCantidadErr(false);
                  setFechaSalida(undefined);
                  setUltMant(undefined);
                  setCicloMant(undefined);
                  setDesc("");
                  setPrestable(false);
                  onCloseEquipo();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (validation()) {
                    mutation.mutate({
                      nombre,
                      categoria: "Equipo",
                      estado: "Activo",
                      fechaSalida,
                      cantidad,
                      uploader: "Yo",
                      desc,
                      cicloMant,
                      ultMant: date,
                      ultMod: "Yo",
                      prestable,
                    });
                    setNombre("");
                    setFechaSalida(undefined);
                    setDesc("");
                    setCicloMant(undefined);
                    setPrestable(false);
                    onCloseEquipo();
                  }
                }}
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Alerta de varios  */}

      <AlertDialog
        isOpen={isOpenVarios}
        leastDestructiveRef={cancelRef}
        onClose={onCloseVarios}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Agregar Item
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack align={"start"}>
                <FormControl isInvalid={nombreErr}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    onChange={handleNombreChange}
                    maxLength={50}
                  />
                  {nombreErr ? (
                    <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                  ) : (
                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                      {nombre.length} / 50
                    </FormHelperText>
                  )}
                </FormControl>
                <Box>
                  <FormControl isInvalid={cantidadErr}>
                    <FormLabel>Cantidad</FormLabel>
                    <Input type="text" onChange={handleCantidadChange} />
                    <FormErrorMessage>Ingrese la cantidad</FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  maxH={"300px"}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
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
                  setNombre("");
                  setNombreErr(false);
                  setCantidad(1);
                  setCantidadErr(false);
                  setFechaSalida(undefined);
                  setUltMant(undefined);
                  setCicloMant(undefined);
                  setDesc("");
                  setPrestable(false);
                  onCloseVarios();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (validation()) {
                    mutation.mutate({
                      nombre,
                      categoria: "Varios",
                      estado: "Activo",
                      cantidad,
                      uploader: "Yo",
                      desc,
                      ultMod: "Yo",
                    });
                    setNombre("");
                    setNombreErr(false);
                    setCantidad(1);
                    setCantidadErr(false);
                    setFechaSalida(undefined);
                    setUltMant(undefined);
                    setCicloMant(undefined);
                    setDesc("");
                    setPrestable(false);
                    onCloseVarios();
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

export { NuevoEquipoElec, NuevoInstrumento, NuevoItemInventario };
