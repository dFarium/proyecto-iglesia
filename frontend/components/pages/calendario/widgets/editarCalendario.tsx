import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Select,
    Switch,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdCreate } from "react-icons/md";
import { minDate, textDate } from "@/utils/dateUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editarItemCalendario } from "@/data/calendario/item";

function EditarCalendario(props: {
    id: string;
    nombre: string;
    fechaInicio: Date;
    fechaTermino: Date;
    estadoActividad: boolean;
    descripcion: string;
}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();
    const date = new Date();

    const hoy = new Date();
    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);
    const [fechaInicio, setFechaInicio] = useState<Date>(hoy);
    const [fechaTermino, setFechaTermino] = useState<Date>(hoy);
    const [estadoActividad, setEstadoActividad] = useState<boolean>(false);
    const [descripcion, setDescripcion] = useState<string>("");

    const [isFechaInicioValid, setIsFechaInicioValid] = useState(true);
    const [isFechaLimiteValid, setIsFechaLimiteValid] = useState(false);

    const setTodoInicio = () => {
        setNombre(props.nombre);
        setFechaInicio(props.fechaInicio);
        setFechaTermino(props.fechaTermino);
        setEstadoActividad(props.estadoActividad);
        setDescripcion(props.descripcion);
    }

    const fechaToValue = (fecha: Date) => {
        if (!fecha) return undefined;
        const objDate = new Date(fecha);
        return objDate.toISOString().split('T')[0];
    }

    const queryClient = useQueryClient();

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValid = /^(?!.*\s{2})[A-Za-z0-9 ]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleFechaInicioChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaInicio(date);
        setIsFechaInicioValid(!!e.target.value);
    };

    const handleFechaTerminoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaTermino(date);
        /* setIsFechaLimiteValid(!isMenorQueInicio(fechaInicio, fechaTermino)); */
    };

    const mutation = useMutation({
        mutationFn: async (newItem: any) => {
            const res = await editarItemCalendario(props.id, newItem);

            console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(res);
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
                        ? "inventarioItemEditBg.light"
                        : "inventarioItemEditBg.dark"
                }
                isRound
                _hover={{ bg: "#66b4ff" }}
                fontSize={"1.4em"}
                aria-label={"Editar"}
                icon={<MdCreate />}
                onClick={() => {
                    onOpen();
                    setTodoInicio();
                }}
                color={colorMode == "light" ? "#4A5568" : "#2D3748"}></IconButton>

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
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 25
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl isDisabled={true}>
                                <FormLabel>Fecha Inicio</FormLabel>
                                <Input
                                    defaultValue={fechaToValue(props.fechaInicio)}
                                    type={"date"}
                                    onChange={handleFechaInicioChange}
                                    min={minDate(date)}></Input>
                                <FormErrorMessage>Ingrese una fecha Válida</FormErrorMessage>
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombre("");
                                    setEstadoActividad(false);
                                    setDescripcion("");
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
                                        nombre/*  &&
                                        fechaInicio &&
                                        fechaTermino &&
                                        estadoActividad &&
                                        descripcion */
                                    ) {
                                        mutation.mutate({
                                            nombre
                                        })
                                        setIsFechaInicioValid(false);
                                        setIsFechaLimiteValid(false);
                                        onClose();
                                    }
                                }}
                            >
                                Aceptar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog >
        </>
    )

}

export default EditarCalendario;