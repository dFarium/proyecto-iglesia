import {editItemInventario, IItemInventario} from "@/data/inventario/item";
import {minDate} from "@/utils/dateUtils";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Select,
    useDisclosure,
} from "@chakra-ui/react";

import {useRef, useState} from "react";
import {MdAdd,} from "react-icons/md";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createPrestamoInstrumento, getInstrumentosPrestables, ICrearInstrumento} from "@/data/prestamos/prestamos";
import {getUsers, IUsuarioModel} from "@/data/usuarios/usuarios";

const lista = ["hola", "que", "tal"]

function NuevoPrestamoInstrumento() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const cancelRef = useRef(null);

    //variables
    const hoy = new Date();
    const [instrumento, setInstrumento] = useState<string>("");
    const [prestatario, setPrestatario] = useState<string>("");
    const [prestamista, setPrestamista] = useState<string>("");

    const [devuelto, setDevuelto] = useState<boolean>(false);
    const [fechaInicio, setFechaInicio] = useState<Date>(hoy);
    const [fechaLimite, setFechaLimite] = useState<Date>(hoy);
    const [comentario, setComentario] = useState<string>("");

    const [isInstrumentoValid, setIsInstrumentoValid] = useState(false);
    const [isPrestamistaValid, setIsPrestamistaValid] = useState(false);
    const [isPrestatarioValid, setIsPrestatarioValid] = useState(false);
    const [isFechaInicioValid, setIsFechaInicioValid] = useState(false);
    const [isFechaLimiteValid, setIsFechaLimiteValid] = useState(false);

    const date = new Date();
    const queryClient = useQueryClient();

    const handleInstrumentoChange = (e: any) => {
        setInstrumento(e.target.value);
        setIsInstrumentoValid(!!e.target.value);
    }

    const handlePrestatarioChange = (e: any) => {
        setPrestatario(e.target.value);
        setIsPrestatarioValid(!!e.target.value);
    }

    const handlePrestamistaChange = (e: any) => {
        setPrestamista(e.target.value);
        setIsPrestamistaValid(!!e.target.value);
    }

    const handleFechaInicioChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaInicio(date);
        setIsFechaInicioValid(!!e.target.value);
    };

    const handleFechaDevolucionChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaLimite(date);
        setIsFechaLimiteValid(!isLimiteMenorAInicio(fechaInicio, date));
    };

    const mutation = useMutation({
        mutationFn: async (newPrestamo: ICrearInstrumento) => {
            const res = await createPrestamoInstrumento(newPrestamo);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["allPrestamos"]});
            queryClient.invalidateQueries({queryKey: ["instrumentosPrestables"]});
            itemMutationToEstadoPrestado.mutate({estado: "Prestado"});
        },
    });

    const itemMutationToEstadoPrestado = useMutation({
        mutationFn: async (newItem: any) => {
            const res = await editItemInventario(instrumento, newItem);

            return res;
        }
    })

    const instrumentosPrestablesQuery = useQuery({
        queryKey: ["instrumentosPrestables"],
        queryFn: async () => {
            const data = await getInstrumentosPrestables();
            return data;
        },
        initialData: [],
    });

    const usuariosQuery = useQuery({
        queryKey: ["usuarios"],
        queryFn: async () => {
            const data = await getUsers();
            return data;
        },
        initialData: [],
    });

    const showInstrumentos = () => {
        const instrumentosData = instrumentosPrestablesQuery.data;
        return instrumentosData.map((instrumento: IItemInventario) => {
            return (
                <option value={instrumento._id} key={instrumento._id}>{instrumento.nombre}</option>
            )
        })
    }

    const showUsuarios = () => {
        const userData = usuariosQuery.data;
        return userData.map((usuario: IUsuarioModel) => {
            return (
                <option value={usuario._id} key={usuario._id}>{usuario.name}</option>
            )
        })
    }

    const isFechaMenorAActual = (fecha: Date) => {
        const ayer: Date = new Date();
        ayer.setDate(ayer.getDate() - 1);
        return fecha && fecha < ayer;
    }

    const isLimiteMenorAInicio = (inicio: Date, limite: Date) => {
        return limite && limite < inicio;
    }

    return (
        <>
            <Button
                fontSize={"1.6em"}
                fontWeight={"bold"}
                p={"35px"}
                colorScheme={"newPrestamoInstrumentoButton"}
                display={{base: "none", md: "flex"}}
                onClick={onOpen}
            >
                Nuevo Prestamo
            </Button>

            <IconButton
                display={{base: "flex", md: "none"}}
                isRound
                w={{base: "60px", md: "70px"}}
                h={{base: "60px", md: "70px"}}
                colorScheme={"newInventarioItemButton"}
                aria-label={"Agregar Item"}
                fontSize={{base: "3em", md: "3.3em"}}
                icon={<MdAdd/>}
                onClick={onOpen}
            >
                Nuevo Préstamo
            </IconButton>

            {/* AlertDialog Instrumento TODO */}
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Registrar nuevo préstamo
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl isInvalid={!instrumento}>
                                <FormLabel>Instrumento</FormLabel>
                                <Select placeholder={"Escoja Instrumento"} onChange={handleInstrumentoChange}>
                                    {showInstrumentos()}
                                </Select>
                                <FormErrorMessage>Debe escoger un instrumento</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!prestatario}>
                                <FormLabel>Solicitante</FormLabel>
                                <Select placeholder={"Escoja Solicitante"} onChange={handlePrestatarioChange}>
                                    {showUsuarios()}
                                </Select>
                                <FormErrorMessage>Debe escoger un solicitante</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!prestamista}>
                                <FormLabel>Prestamista</FormLabel>
                                <Select placeholder={"Escoja Prestamista"} onChange={handlePrestamistaChange}>
                                    {showUsuarios()}
                                </Select>
                                <FormErrorMessage>Debe escoger un prestamista</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={isFechaMenorAActual(fechaInicio)}>
                                <FormLabel>Fecha de Inicio</FormLabel>
                                <Input
                                    type={"date"}
                                    onChange={handleFechaInicioChange}
                                    min={minDate(date)}
                                />
                                <FormErrorMessage>Debe escoger una fecha válida</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={isLimiteMenorAInicio(fechaInicio, fechaLimite)}>
                                <FormLabel>Fecha Límite</FormLabel>
                                <Input
                                    type={"date"}
                                    onChange={handleFechaDevolucionChange}
                                    min={minDate(fechaInicio)}
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
                                    setIsInstrumentoValid(false);
                                    setIsPrestatarioValid(false);
                                    setIsPrestamistaValid(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme={"blue"}
                                onClick={() => {
                                    if (
                                        instrumento &&
                                        prestatario &&
                                        prestamista &&
                                        fechaInicio &&
                                        fechaLimite
                                    ) {
                                        mutation.mutate({
                                            instrumento,
                                            prestatario,
                                            prestamista,
                                            fechaInicio,
                                            fechaLimite
                                        })
                                        setIsFechaInicioValid(false);
                                        setIsFechaLimiteValid(false);
                                        setIsInstrumentoValid(false);
                                        setIsPrestatarioValid(false);
                                        setIsPrestamistaValid(false);
                                        onClose();
                                    }
                                }}
                                isDisabled={
                                    !isInstrumentoValid ||
                                    !isPrestamistaValid ||
                                    !isPrestatarioValid ||
                                    !isFechaInicioValid ||
                                    !isFechaLimiteValid
                                }
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

export {NuevoPrestamoInstrumento};
