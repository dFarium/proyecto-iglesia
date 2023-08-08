import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button, Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Select, Switch,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/react";

import {useRef, useState} from "react";
import {MdCreate} from "react-icons/md";
import {minDate, textDate} from "@/utils/dateUtils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editPrestamoInstrumento} from "@/data/prestamos/prestamos";
import {editItemInventario, editPrestable} from "@/data/inventario/item";


function EditarPrestamo(props: {
    id: string;
    instrumento: string;
    prestatario: string;
    prestamista: string;
    devuelto: boolean;
    fechaInicio: Date;
    fechaDevolucion: Date;
    fechaLimite: Date;
    comentario?: string;
    itemId: string;
}) {
    // use disclosures

    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef(null);
    const {colorMode} = useColorMode();
    const date = new Date();

    // variables
    const hoy = new Date();
    const [instrumento, setInstrumento] = useState<string>("");
    const [prestatario, setPrestatario] = useState<string>("");
    const [prestamista, setPrestamista] = useState<string>("");

    const [devuelto, setDevuelto] = useState<boolean>(false);
    const [fechaInicio, setFechaInicio] = useState<Date>(hoy);
    const [fechaLimite, setFechaLimite] = useState<Date>(hoy);
    const [fechaDevolucion, setFechaDevolucion] = useState<Date>(hoy);
    const [comentario, setComentario] = useState<string>("");

    const [isFechaInicioValid, setIsFechaInicioValid] = useState(true);
    const [isFechaLimiteValid, setIsFechaLimiteValid] = useState(false);
    const [isFechaDevolucionValid, setIsFechaDevolucionValid] = useState(true);

    const setTodoInicio = () => {
        setInstrumento(props.instrumento);
        setPrestatario(props.prestatario);
        setPrestamista(props.prestamista);
        setDevuelto(props.devuelto);
        setFechaInicio(props.fechaInicio);
        setFechaLimite(props.fechaLimite);
        setFechaDevolucion(fechaActualOrDevolucion(props.fechaDevolucion));
        //setComentario(props.comentario);
    };

    const fechaToValue = (fecha: Date) => {
        if (!fecha) return undefined;
        const objDate = new Date(fecha);
        return objDate.toISOString().split('T')[0];
    }

    const showDate = (date: Date): string => {
        if (date) {
            return "Actual: " + textDate(date);
        }
        return "Sin fecha";
    };

    const queryClient = useQueryClient();

    const handleFechaInicioChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaInicio(date);
        setIsFechaInicioValid(!!e.target.value);
    };

    const handleDevueltoChange = (e: any) => {
        setDevuelto(e.target.checked);
    }

    const handleFechaLimiteChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaLimite(date);
        setIsFechaLimiteValid(!isMenorQueInicio(fechaInicio, fechaLimite));
    };

    const handleFechaDevolucionChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaDevolucion(date);
        setIsFechaDevolucionValid(!isMenorQueInicio(fechaInicio, date));
    };


    const mutation = useMutation({
        mutationFn: async (newItem: any) => {
            if (!newItem.devuelto) {
                const itemRes = await editPrestable(props.itemId, {prestable: false});
                newItem.fechaDevolucion = null;
            } else {
                const itemRes = await editPrestable(props.itemId, {prestable: true});
            }
            const res = await editPrestamoInstrumento(props.id, newItem);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["allPrestamos"]});
            queryClient.invalidateQueries({queryKey: ["instrumentosPrestables"]});
        },
    });

    const isFechaMenorAActual = (fecha: Date) => {
        const ayer: Date = new Date();
        ayer.setDate(ayer.getDate() - 1);
        return fecha && fecha < ayer;
    }

    const isMenorQueInicio = (inicio: Date, limite: Date) => {
        return limite && limite < inicio;
    }

    const isDevolucionMenorQueInicio = (inicio: Date, devolucion: Date) => {
        if (!devolucion && !devuelto) {
            return false
        }
        return devolucion && devolucion < inicio;
    }

    const fechaActualOrDevolucion = (date: Date) => {
        if (date) {
            return date;
        } else {
            const ayer: Date = new Date();
            ayer.setDate(ayer.getDate() - 1);
            return ayer;
        }
    }


    return (
        <>
            <IconButton
                bg={
                    colorMode == "light"
                        ? "inventarioItemEditBg.light"
                        : "inventarioItemEditBg.dark"
                }
                isRound
                _hover={{bg: "#66b4ff"}}
                fontSize={"1.4em"}
                aria-label={"Editar"}
                icon={<MdCreate/>}
                onClick={() => {
                    onOpen();
                    setTodoInicio();
                }}
                color={colorMode == "light" ? "#4A5568" : "#2D3748"}
            />
            {/* Alerta de Instrumento */}

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Editar Prestamo
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isDisabled={true}>
                                <FormLabel>Instrumento</FormLabel>
                                <Select placeholder={instrumento}>
                                </Select>
                                <FormErrorMessage>Debe escoger un instrumento</FormErrorMessage>
                            </FormControl>

                            <FormControl isDisabled={true}>
                                <FormLabel>Prestamista</FormLabel>
                                <Select placeholder={prestamista}>
                                </Select>
                                <FormErrorMessage>Debe escoger un prestamista</FormErrorMessage>
                            </FormControl>

                            <FormControl isDisabled={true}>
                                <FormLabel>Prestatario</FormLabel>
                                <Select placeholder={prestatario}>
                                </Select>
                                <FormErrorMessage>Debe escoger un prestatario</FormErrorMessage>
                            </FormControl>

                            <FormControl isDisabled={true}>
                                <FormLabel>Fecha de Inicio</FormLabel>
                                <Input
                                    defaultValue={fechaToValue(props.fechaInicio)}
                                    type={"date"}
                                    onChange={handleFechaInicioChange}
                                    min={minDate(date)}
                                />
                                <FormErrorMessage>Debe escoger una fecha válida</FormErrorMessage>
                            </FormControl>

                            <Flex align="center">
                                <FormControl display="flex" alignItems="center" mr={4}>
                                    <FormLabel htmlFor="date-switch" mb="0">
                                        ¿Devuelto?
                                    </FormLabel>
                                    <Switch
                                        id="date-switch"
                                        isChecked={devuelto}
                                        onChange={() => {
                                            setDevuelto(!devuelto);
                                        }}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <Input
                                        // defaultValue={fechaToValue(props.fechaDevolucion)}
                                        isInvalid={isMenorQueInicio(fechaInicio, fechaDevolucion)}
                                        id="fecha"
                                        type="date"
                                        isDisabled={!devuelto}
                                        onChange={handleFechaDevolucionChange}
                                        value={fechaToValue(fechaActualOrDevolucion(fechaDevolucion))}
                                    />
                                    <FormErrorMessage>Debe escoger una fecha válida</FormErrorMessage>
                                </FormControl>
                            </Flex>

                            <FormControl isInvalid={isDevolucionMenorQueInicio(fechaInicio, fechaLimite)}>
                                <FormLabel>Fecha Límite</FormLabel>
                                <Input
                                    defaultValue={fechaToValue(props.fechaLimite)}
                                    type={"date"}
                                    onChange={handleFechaLimiteChange}
                                    min={minDate(date)}
                                />
                                <FormErrorMessage>Debe escoger una fecha válida</FormErrorMessage>
                            </FormControl>

                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setInstrumento("");
                                    setPrestamista("");
                                    setPrestatario("");
                                    setDevuelto(false);
                                    setComentario("");
                                    setIsFechaInicioValid(false);
                                    setIsFechaLimiteValid(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    if (
                                        instrumento &&
                                        prestatario &&
                                        prestamista &&
                                        fechaInicio &&
                                        fechaLimite
                                    ) {
                                        mutation.mutate({
                                            fechaInicio,
                                            fechaLimite,
                                            fechaDevolucion,
                                            devuelto
                                        })
                                        setIsFechaInicioValid(false);
                                        setIsFechaLimiteValid(false);
                                        onClose();
                                    }
                                }}
                                isDisabled={
                                    isFechaLimiteValid ||
                                    !isFechaDevolucionValid
                                }
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

export default EditarPrestamo;
