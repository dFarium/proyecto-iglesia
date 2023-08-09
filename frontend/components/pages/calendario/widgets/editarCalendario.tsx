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
    Circle,
    Select,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdCreate, MdExpandMore } from "react-icons/md";
import { minDate, textDate, textDefaultDate } from "@/utils/dateUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemCalendario, editarItemCalendario } from "@/data/calendario/item";

function EditarCalendario(props: {
    id: string;
    nombreAct: string;
    fechaInicio: Date;
    fechaTermino: Date;
    estadoActividad: boolean;
    descripcion: string;
}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();

    const date = new Date();

    const [nombreAct, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [fechaInicio, setFechaInicio] = useState<Date>();
    const [fechaInicioErr, setFechaInicioErr] = useState<boolean>(false);

    const [fechaTermino, setFechaTermino] = useState<Date>(date);
    const [fechaTerminoErr, setFechaTerminoErr] = useState<boolean>(false);

    const [estadoActividad, setEstadoActividad] = useState<boolean>();
    const [estadoActividadErr, setEstadoActividadErr] = useState<boolean>(false);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);

    const setTodoInicio = () => {

        setNombre(props.nombreAct);
        setNombreErr(false);

        setFechaInicio(props.fechaInicio);
        setFechaInicioErr(false);

        setFechaTermino(props.fechaTermino);
        setFechaTerminoErr(false)

        setEstadoActividad(props.estadoActividad)
        setEstadoActividadErr(false)

        setDescripcion(props.descripcion);
        setDescripcionErr(false);
    };

    const showDate = (date: Date): string => {
        if (date) {
            return "Actual: " + textDate(date);
        }
        return "Sin fecha";
    };

    const queryClient = useQueryClient();

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValid = /^(?!.*[ ]{2,})[a-zA-Z0-9._-]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleFechaInicioChange = (e: any) => {
        const d = new Date(e.target.value);
        const selectedDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

        if (selectedDate >= date) {
            setFechaInicio(selectedDate);

            if (fechaTermino && selectedDate > fechaTermino) {
                setFechaTermino(selectedDate);
                setFechaTerminoErr(false);
            }

            if (!fechaTermino) {
                setFechaTermino(selectedDate);
                setFechaTerminoErr(false);
            }
        }
    };

    const handleFechaTerminoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

        if (!fechaInicio || date >= fechaInicio) {
            setFechaTermino(date);
            setFechaTerminoErr(false);
        } else {
            setFechaTerminoErr(true);
        }
    };

    const handleEstadoActividadChange = (e: any) => {
        setEstadoActividad(e.target.value);
    };


    const handleDescripcionChange = (e: any) => {
        setDescripcion(e.target.value);
        setDescripcionErr(false);
    };

    const mutation = useMutation({
        mutationFn: async (newItem: ItemCalendario) => {
            const res = await editarItemCalendario(props.id, newItem);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["obtenerListaCalendario"] });
        },
    });

    return (

        <>

            <IconButton
                bg={
                    colorMode == "light"
                        ? "calendarioItemEditBg.light"
                        : "calendarioItemEditBg.dark"
                }
                icon={<MdCreate />}
                fontSize={"1.4em"}
                aria-label={"Editar"}
                _hover={{ bg: "#66b4ff" }}
                isRound
                onClick={() => { onOpen }}
                color={colorMode == "light" ? "#4A5568" : "#2D3748"}

            />

            {/* INGRESO */}
            <AlertDialog
                isOpen={isOpenIngreso}
                leastDestructiveRef={cancelRef}
                onClose={onCloseIngreso}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Editar Ingreso
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isInvalid={nombreErr}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Box>
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>

                            <FormControl isInvalid={valorCajaErr}>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={8}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {"$ "}{formatCLP(valorCaja)} / {"$ "}{"99.999.999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    value={textDefaultDate(fechaGasto)}
                                    onChange={handleFechaGastoChange}
                                    max={minDate(date)}
                                />
                                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                                    {showDate(oldDate)}
                                </FormHelperText>
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={descripcionErr}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
                                    maxLength={250}
                                />
                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {descripcion.length} / 250
                                </FormHelperText>
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombreErr(false);
                                    setValorCajaErr(false);
                                    setFechaGastoErr(false);
                                    setDescripcionErr(false);
                                    onCloseIngreso();
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
                                            valorCaja,
                                            fechaGasto,
                                            descripcion,
                                            tipo
                                        });
                                        onCloseIngreso();
                                    }
                                }}
                            >
                                Aceptar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* GASTO */}
            <AlertDialog
                isOpen={isOpenGasto}
                leastDestructiveRef={cancelRef}
                onClose={onCloseGasto}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Editar Gasto
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isInvalid={nombreErr}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Box>
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>

                            <FormControl isInvalid={valorCajaErr}>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={8}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {"$ "}{formatCLP(valorCaja)} / {"$ "}{"99.999.999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    value={textDefaultDate(fechaGasto)}
                                    onChange={handleFechaGastoChange}
                                    max={minDate(date)}
                                />
                                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                                    {showDate(oldDate)}
                                </FormHelperText>
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={descripcionErr}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
                                    maxLength={250}
                                />
                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {descripcion.length} / 250
                                </FormHelperText>
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombreErr(false);
                                    setValorCajaErr(false);
                                    setFechaGastoErr(false);
                                    setDescripcionErr(false);
                                    onCloseGasto();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    if (validation()) {
                                        console.log("AAAAAAAAAa")
                                        console.log(descripcion);
                                        mutation.mutate({
                                            nombre,
                                            valorCaja,
                                            fechaGasto,
                                            descripcion,
                                            tipo
                                        });
                                        onCloseGasto();
                                    }
                                }}
                            >
                                Aceptar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* TODO */}
            <AlertDialog
                isOpen={isOpenTodo}
                leastDestructiveRef={cancelRef}
                onClose={onCloseTodo}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Editar Gasto
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isInvalid={nombreErr}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Box>
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>

                            <FormControl isInvalid={valorCajaErr}>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={8}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {"$ "}{formatCLP(valorCaja)} / {"$ "}{"99.999.999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    value={textDefaultDate(fechaGasto)}
                                    onChange={handleFechaGastoChange}
                                    max={minDate(date)}
                                />
                                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                                    {showDate(oldDate)}
                                </FormHelperText>
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={descripcionErr}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
                                    maxLength={250}
                                />
                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {descripcion.length} / 250
                                </FormHelperText>
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombreErr(false);
                                    setValorCajaErr(false);
                                    setFechaGastoErr(false);
                                    setDescripcionErr(false);
                                    onCloseTodo();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    if (validation()) {
                                        console.log("AAAAAAAAAa")
                                        console.log(descripcion);
                                        mutation.mutate({
                                            nombre,
                                            valorCaja,
                                            fechaGasto,
                                            descripcion,
                                            tipo
                                        });
                                        onCloseTodo();
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
    )
}


export default EditarCalendario