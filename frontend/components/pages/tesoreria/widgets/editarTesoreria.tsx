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
import { ItemTesoreria, editarGastoIngresoTesoreria } from "@/data/tesoreria/item";

function EditarTesoreria(props: {
    id: string;
    nombre: string;
    valorCaja: number;
    fechaGasto: Date;
    descripcion: string;
    tipo: string;
}) {

    const {
        isOpen: isOpenIngreso,
        onOpen: onOpenIngreso,
        onClose: onCloseIngreso,
    } = useDisclosure();

    const {
        isOpen: isOpenGasto,
        onOpen: onOpenGasto,
        onClose: onCloseGasto,
    } = useDisclosure();

    const {
        isOpen: isOpenTodo,
        onOpen: onOpenTodo,
        onClose: onCloseTodo,
    } = useDisclosure();

    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();
    const date = new Date();

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [valorCaja, setValorCaja] = useState<number>(1);
    const [valorCajaErr, setValorCajaErr] = useState<boolean>(false);

    const [fecchaGastoErr, setFechaGastoErr] = useState<boolean>(false);
    const [fechaGasto, setFechaGasto] = useState<Date>(date);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);

    const [tipo, setTipo] = useState<string>("");

    const [oldDate, setOldDate] = useState<Date>(date);

    const setTodoInicio = () => {

        setNombre(props.nombre);
        setNombreErr(false);

        setValorCaja(props.valorCaja);
        setValorCajaErr(false);

        setFechaGastoErr(false)
        setFechaGasto(props.fechaGasto);
        setDescripcion(props.descripcion);
        setDescripcionErr(false);

        setTipo(props.tipo);
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
        const isValid = /^(?!.*\s{2})[A-Za-z0-9 ]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleValorCajaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const r = value.replace(/\D/g, "");
        const parsedValue = parseInt(r);

        if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 99999999) {
            setValorCaja(0);
            setValorCajaErr(true);
        } else {
            setValorCaja(parsedValue);
            setValorCajaErr(false);
        }
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaGasto(date);
    };


    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const isValid = /^(?!.*\s{2})[A-Za-z0-9 ]*$/.test(value) && value.length <= 250;
        setDescripcionErr(!isValid);
        if (isValid) {
            setDescripcion(value);
        }
    };


    const handleTipoChange = (e: any) => {
        setTipo(e.target.value);
    };


    const validation = (): boolean => {
        let error: boolean = false;

        if (nombre.trim() === "") {
            setNombreErr(true);
            error = true;
        } else {
            setNombreErr(false);
        }

        if (valorCaja.toString().trim() === "") {
            setValorCajaErr(true);
            error = true;
        } else {
            setValorCajaErr(false);
        }

        if (descripcion.trim() === "") {
            setDescripcionErr(true);
            error = true;
        } else {
            setDescripcionErr(false);
        }

        return !error;
    };


    const mutation = useMutation({
        mutationFn: async (newItem: ItemTesoreria) => {
            const res = await editarGastoIngresoTesoreria(props.id, newItem);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["obtenerTodoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerIngresoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerGastoTesoreria"] });
        },
    });


    function formatCLP(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>

            <IconButton
                bg={
                    colorMode == "light"
                        ? "tesoreriaItemEditBg.light"
                        : "tesoreriaItemEditBg.dark"
                }
                icon={<MdCreate />}
                fontSize={"1.4em"}
                aria-label={"Editar"}
                _hover={{ bg: "#66b4ff" }}
                isRound
                onClick={() => {
                    if (props.tipo == "Ingreso") {
                        console.log("Hola");
                        setTodoInicio();
                        onOpenIngreso();
                    } else if (props.tipo == "Gasto") {
                        setTodoInicio();
                        onOpenGasto();
                    } else {
                        setTodoInicio();
                        onOpenTodo();
                    }
                }}
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
                                    maxLength={25}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 25
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
                                    maxLength={25}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 25
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
                                    maxLength={25}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 25
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

export default EditarTesoreria