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

    const {
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
    } = useDisclosure()
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
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Editar Evento
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isInvalid={nombreErr}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    value={nombreAct}
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
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
                                    setFechaInicioErr(false);
                                    setFechaTerminoErr(false);
                                    setEstadoActividad(false);
                                    setDescripcionErr(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    console.log(nombreAct)
                                    if (nombreAct && fechaInicio && fechaTermino && estadoActividad && descripcion) {
                                        mutation.mutate({
                                            nombreAct,
                                            fechaInicio,
                                            fechaTermino,
                                            estadoActividad,
                                            descripcion,
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
    )
}


export default EditarCalendario