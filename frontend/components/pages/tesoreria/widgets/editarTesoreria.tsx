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

    const [fechaGasto, setFechaGasto] = useState<Date>(date);
    const [descripcion, setDescripcion] = useState<string>("");

    const [tipo, setTipo] = useState<string>("");

    const [oldDate, setOldDate] = useState<Date>(date);

    const setTodoInicio = () => {

        setNombre(props.nombre);
        setNombreErr(false);

        setValorCaja(props.valorCaja);
        setValorCajaErr(false);

        setFechaGasto(props.fechaGasto);
        setDescripcion(props.descripcion);

        setTipo(props.tipo);
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
    }

    const handleValorCajaChange = (e: any) => {
        const r = e.target.value.replace(/\D/g, "");
        setValorCaja(r);
        setValorCajaErr(false);
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaGasto(date);
    };

    const handleDescripcionChange = (e: any) => {
        setDescripcion(e.target.value);
    };

    const handleTipoChange = (e: any) => {
        setTipo(e.target.value);
    };


    const validation = (): boolean => {
        let error: boolean = false;
        if (nombre.trim() == "") {
            setNombreErr(true);
            error = true;
        }
        if (valorCaja.toString().trim() == "") {
            setValorCajaErr(true);
            error = true;
        }
        if (error) {
            valorCaja
            return false;
        } else {
            setValorCajaErr(false);
            setNombreErr(false);
        }
        return true;
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
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>

                            <FormControl>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={9}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un valor</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {valorCaja} / 9{"99999999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha de ingreso</FormLabel>
                                <Input
                                    type="date"
                                    value={textDefaultDate(oldDate)}
                                    onChange={handleFechaGastoChange}
                                    min={minDate(date)}
                                />
                                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                                    {showDate(oldDate)}
                                </FormHelperText>
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
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
                                    onCloseIngreso();
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
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>

                            <FormControl>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={9}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un valor</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {valorCaja} / 9{"99999999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha de ingreso</FormLabel>
                                <Input
                                    type="date"
                                    value={textDefaultDate(oldDate)}
                                    onChange={handleFechaGastoChange}
                                    min={minDate(date)}
                                />
                                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                                    {showDate(oldDate)}
                                </FormHelperText>
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
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
                                    onCloseGasto();
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
                            Editar
                        </AlertDialogHeader>
                        <AlertDialogBody>
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
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>

                            <FormControl>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={9}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {valorCaja} / 9{"99999999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha de ingreso</FormLabel>
                                <Input
                                    type="date"
                                    value={textDefaultDate(oldDate)}
                                    onChange={handleFechaGastoChange}
                                    min={minDate(date)}
                                />
                                <FormHelperText fontStyle={"italic"} pl={"5px"}>
                                    {showDate(oldDate)}
                                </FormHelperText>
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    onChange={(e) => {
                                        setDescripcion(e.target.value);
                                    }}
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
                                    onCloseTodo();
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


        </>
    )
}

export default EditarTesoreria
