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
  Box,
  Switch,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdCreate, MdExpandMore } from "react-icons/md";
import { minDate, textDate, textDefaultDate } from "@/utils/dateUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IItemInventario, editItemInventario } from "@/data/inventario/item";
import { getUserName } from "@/utils/roleUtils";

function EditarItemInventario(props: {
  id: string;
  nombre: string;
  estado: string;
  prestable: boolean;
  categoria: string;
  cantidad: number;
  fechaSalida: Date;
  desc: string;
  cicloMant: number;
  ultMant: Date;
}) {
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
  const { colorMode } = useColorMode();
  const date = new Date();
  
  //get username
  const userName = getUserName();

  // variables
  const [nombre, setNombre] = useState<string>("");
  const [nombreErr, setNombreErr] = useState<boolean>(false);

  const [estado, setEstado] = useState<string>("");
  const [ultMant, setUltMant] = useState<Date>(date);

  const [cantidad, setCantidad] = useState<number>(1);
  const [cantidadErr, setCantidadErr] = useState<boolean>(false);

  const [fechaSalida, setFechaSalida] = useState<Date>(date);
  const [cicloMant, setCicloMant] = useState<number>();

  const [desc, setDesc] = useState<string>("");
  const [prestable, setPrestable] = useState<boolean>(false);

  const [oldDate, setOldDate] = useState<Date>(date);
  const [oldMant, setOldMant] = useState<Date>(date);

  const setTodoInicio = () => {
    setNombre(props.nombre);
    setNombreErr(false);
    setEstado(props.estado);
    setUltMant(props.ultMant);
    setCantidad(props.cantidad);
    setCantidadErr(false);
    setFechaSalida(props.fechaSalida);
    setCicloMant(props.cicloMant);
    setDesc(props.desc);
    setPrestable(props.prestable);
    setOldDate(props.fechaSalida);
    setOldMant(props.ultMant);
  };

  const showDate = (date: Date): string => {
    if (date) {
      return "Actual: " + textDate(date);
    }
    return "Sin fecha";
  };

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

  const mutation = useMutation({
    mutationFn: async (newItem: IItemInventario) => {
      const res = await editItemInventario(props.id, newItem);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allItemsInventario"] });
      queryClient.invalidateQueries({ queryKey: ["itemsInventarioEquipos"] });
      queryClient.invalidateQueries({
        queryKey: ["itemsInventarioInstrumentos"],
      });
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
        onClick={() => {
          if (props.categoria == "Instrumento") {
            setTodoInicio();
            onOpenInstrumentos();
          } else if (props.categoria == "Equipo") {
            setTodoInicio();
            onOpenEquipo();
          } else {
            setTodoInicio();
            onOpenVarios();
          }
        }}
        color={colorMode == "light" ? "#4A5568" : "#2D3748"}
      />
      {/* Alerta de Instrumento */}

      <AlertDialog
        isOpen={isOpenInstrumentos}
        leastDestructiveRef={cancelRef}
        onClose={onCloseInstrumentos}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              Editar Instrumento Musical
            </AlertDialogHeader>
            <AlertDialogBody>
              <HStack align={"start"}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    value={nombre}
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
                  <FormLabel>Estado</FormLabel>
                  <Menu autoSelect={false}>
                    <MenuButton as={Button} rightIcon={<MdExpandMore />}>
                      {estado}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setEstado("Activo");
                        }}
                      >
                        Activo
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setEstado("Inactivo");
                        }}
                      >
                        Inactivo
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </HStack>
              <FormControl mt={"25px"}>
                <FormLabel>Fecha de Salida</FormLabel>
                <Input
                  type="date"
                  value={textDefaultDate(oldDate)}
                  onChange={handleFechaSalidaChange}
                  min={minDate(date)}
                />
                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                  {showDate(oldDate)}
                </FormHelperText>
              </FormControl>

              <HStack align={"start"} mt={"25px"}>
                <FormControl>
                  <FormLabel>Ciclo de Mantemiento</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Última Mantención</FormLabel>
                  <Input
                    type="date"
                    value={textDefaultDate(ultMant)}
                    onChange={handleUltMantChange}
                  />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    {showDate(oldMant)}
                  </FormHelperText>
                </FormControl>
              </HStack>

              <HStack mt={"25px"} justify={"space-between"}>
                <Button>Cambiar Foto</Button>
                <Box>
                  <FormControl
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"end"}
                  >
                    <FormLabel>¿Disponible para préstamo?</FormLabel>
                    <Switch
                      id="prest"
                      isChecked={prestable}
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
                  setNombreErr(false);
                  setPrestable(false);
                  onCloseInstrumentos();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                isDisabled={!nombre || !cantidad || cantidad == 0}
                onClick={() => {
                  mutation.mutate({
                    nombre,
                    estado,
                    fechaSalida,
                    cantidad: cantidad,
                    desc,
                    cicloMant,
                    ultMant,
                    ultMod: userName,
                    prestable,
                  });
                  onCloseInstrumentos();
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
              Editar Equipo Electrónico
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack align={"start"}>
                <FormControl isInvalid={nombreErr}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    value={nombre}
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
                  <FormLabel>Estado</FormLabel>
                  <Menu autoSelect={false}>
                    <MenuButton as={Button} rightIcon={<MdExpandMore />}>
                      {estado}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setEstado("Activo");
                        }}
                      >
                        Activo
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setEstado("Inactivo");
                        }}
                      >
                        Inactivo
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setEstado("Prestado");
                        }}
                      >
                        En préstamo
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </HStack>
              <HStack mt={"25px"} justify={"space-between"} align={"start"}>
                <FormControl>
                  <FormLabel>Fecha de Salida</FormLabel>
                  <Input
                    type="date"
                    value={textDefaultDate(oldDate)}
                    onChange={handleFechaSalidaChange}
                    min={minDate(date)}
                  />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    {showDate(oldDate)}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Cantidad</FormLabel>
                  <Input
                    type="text"
                    value={cantidad}
                    onChange={handleCantidadChange}
                  />
                </FormControl>
              </HStack>
              <HStack mt={"25px"} align={"start"}>
                <FormControl>
                  <FormLabel>Ciclo de Mantemiento</FormLabel>
                  <Input value={cicloMant} />
                </FormControl>
                <FormControl>
                  <FormLabel>Última Mantención</FormLabel>
                  <Input
                    type="date"
                    value={textDefaultDate(oldMant)}
                    onChange={handleUltMantChange}
                  />
                  <FormHelperText fontStyle={"italic"} pl={"5px"}>
                    {showDate(oldMant)}
                  </FormHelperText>
                </FormControl>
              </HStack>
              <HStack mt={"25px"} justify={"space-between"}>
                <Button>Cambiar Foto</Button>
                <Box>
                  <FormControl
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"end"}
                  >
                    <FormLabel>¿Disponible para préstamo?</FormLabel>
                    <Switch
                      id="prest"
                      isChecked={prestable}
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
                  setNombreErr(false);
                  setCantidadErr(false);
                  onCloseEquipo();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                isDisabled={!nombre || !cantidad || cantidad == 0}
                onClick={() => {
                  mutation.mutate({
                    nombre,
                    categoria: "Equipo",
                    estado,
                    fechaSalida,
                    cantidad,
                    desc,
                    cicloMant,
                    ultMant,
                    ultMod: userName,
                    prestable,
                  });
                  onCloseEquipo();
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
              Editar Item
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack align={"start"}>
                <FormControl isInvalid={nombreErr}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    value={nombre}
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
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción"
                  value={desc}
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
                  setNombreErr(false);
                  setCantidadErr(false);
                  onCloseVarios();
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                isDisabled={!nombre}
                onClick={() => {
                  mutation.mutate({
                    nombre,
                    estado,
                    cantidad,
                    desc,
                    ultMod: userName,
                  });
                  setNombreErr(false);
                  setCantidadErr(false);
                  onCloseVarios();
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
