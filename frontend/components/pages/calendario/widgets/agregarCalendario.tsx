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
    Text,
    Switch,
    Box,
    Select,
    Checkbox,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import {
    MdAdd,
    MdComputer,
    MdExpandMore,
    MdPiano,
    MdReceipt,
    MdReceiptLong,
} from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { minDate, textDate } from "@/utils/dateUtils";
import { ItemCalendario, crearItemCalendario } from "@/data/calendario/item";

function AgregarCalendario() {

    const date = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

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

    const queryClient = useQueryClient();


    const handleNombreChange = (e: any) => {
        setNombre(e.target.value);
        setNombreErr(false);
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
            const res = await crearItemCalendario(newItem);
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["obtenerTodoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerIngresoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerGastoTesoreria"] });
        },



    });

    return (
        <>
            <Button
                fontSize={"1.6em"}
                fontWeight={"bold"}
                p={"35px"}
                colorScheme={"newTesoreriaItemButton"}
                display={{ base: "none", md: "flex" }}
                onClick={onOpen}>
                Nuevo Item
            </Button>
            <IconButton
                display={{ base: "flex", md: "none" }}
                isRound
                w={{ base: "60px", md: "70px" }}
                h={{ base: "60px", md: "70px" }}
                colorScheme={"newTesoreriaItemButton"}
                aria-label={"Agregar Item"}
                fontSize={{ base: "3em", md: "3.3em" }}
                icon={<MdAdd />}
                onClick={onOpen}
            >
                Nuevo Item
            </IconButton>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Agregar Evento
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isInvalid={nombreErr}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Nombre inválido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombreAct.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={!fechaInicio}>
                                <FormLabel>Fecha de Inicio</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaInicioChange}
                                    min={date.toISOString().split('T')[0]}
                                    value={fechaInicio ? fechaInicio.toISOString().split('T')[0] : ''}
                                />
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={fechaTerminoErr}>
                                <FormLabel>Fecha de Término</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaTerminoChange}
                                    min={fechaInicio ? fechaInicio.toISOString().split('T')[0] : undefined}
                                    value={fechaTermino ? fechaTermino.toISOString().split('T')[0] : ''}
                                />
                                {fechaTerminoErr && (
                                    <FormErrorMessage>La fecha de término debe ser igual o mayor a la fecha de inicio</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={descripcionErr}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
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
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombre("");
                                    setNombreErr(false);
                                    setFechaInicio(date);
                                    setFechaTermino(date);
                                    setEstadoActividad(true);
                                    setDescripcion("date");
                                    onClose();
                                }}
                            >Agregar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );

};



export default AgregarCalendario