import {IItemInventario, createItemInventario, getItemsInventarioCategoria} from "@/data/inventario/item";
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
    Text,
    Switch,
    Box, Select,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import {
    MdAdd,
    MdComputer,
    MdPiano,
    MdReceipt,
    MdReceiptLong,
} from "react-icons/md";
import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {
    createPrestamoInstrumento,
    getInstrumentosPrestables,
    ICrearInstrumento,
    IPrestamoInstrumento
} from "@/data/prestamos/prestamos";

const lista = ["hola","que", "tal"]

function NuevoPrestamoInstrumento(){
    const {isOpen,onOpen,onClose} = useDisclosure();

    const cancelRef = useRef(null);

    //variables
    const hoy = new Date();
    const [instrumento,setInstrumento] = useState<string>("");
    const [prestatario,setPrestatario] = useState<string>("");
    const [prestamista,setPrestamista] = useState<string>("");

    const [devuelto,setDevuelto] = useState<boolean>(false);
    const [fechaInicio,setFechaInicio] = useState<Date>(hoy);
    const [fechaLimite,setFechaLimite] = useState<Date>(hoy);
    const [comentario,setComentario] = useState<string>("");

    const date = new Date();
    const queryClient = useQueryClient();

    const handleInstrumentoChange = (e:any) =>{
        console.log(e.target.value)
        setInstrumento(e.target.value);

    }

    const handlePrestatarioChange = (e:any) =>{
        setPrestatario(e.target.value);

    }

    const handlePrestamistaChange = (e:any) =>{
        setPrestamista(e.target.value);

    }

    const handleFechaInicioChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaInicio(date);
    };

    const handleFechaDevolucionChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaLimite(date);
    };

    const mutation = useMutation({
        mutationFn: async  (newPrestamo: ICrearInstrumento) => {
            const res = await createPrestamoInstrumento(newPrestamo);
            return res;
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["allPrestamoInstrumento"]});
        },
    });

    const instrumentosPrestablesQuery = useQuery({
        queryKey: ["instrumentosPrestables"],
        queryFn: async () => {
            const data = await getInstrumentosPrestables();
            return data;
        },
        initialData: [],
    });

    //TODO
    // const usersQuery = useQuery({
    //     queryKey: ["usuarios"],
    //     queryFn: async () => {
    //         const data = await getInstrumentosPrestables();
    //         return data;
    //     },
    //     initialData: [],
    // });

    const showInstrumentos = () =>{
        const instrumentosData = instrumentosPrestablesQuery.data;
        return instrumentosData.map((instrumento:IItemInventario)   =>{
            return(
                <option key={instrumento._id}>{instrumento.nombre}</option>
            )
        })
    }

    //TODO
    // const showUsuarios = () =>{
    //     const userData = instrumentosPrestablesQuery.data;
    //     return userData.map((instrumento:IItemInventario)   =>{
    //         return(
    //             <option key={instrumento._id}>{instrumento.nombre}</option>
    //         )
    //     })
    // }

    return(
        <>
            <Button
                fontSize={"1.6em"}
                fontWeight={"bold"}
                p={"35px"}
                colorScheme={"newPrestamoInstrumentoButton"}
                display={{ base: "none", md: "flex" }}
                onClick={onOpen}
            >
                Nuevo Prestamo
            </Button>

            <IconButton
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
                            <FormControl>
                                <FormLabel>Instrumento</FormLabel>
                                <Select placeholder={"Escoja Instrumento"} onChange={handleInstrumentoChange}>
                                    {showInstrumentos()}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Prestamista</FormLabel>
                                <Select placeholder={"Escoja Prestamista"} onChange={handlePrestamistaChange}>
                                    <option value={"649380e7537a0232986409b1"}>PRESTAMISTA</option>
                                    <option value={"valor2"}>VALOR 2</option>
                                    <option value={"valor3"}>VALOR 3</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Prestatario</FormLabel>
                                <Select placeholder={"Escoja Prestatario"} onChange={handlePrestatarioChange}>
                                    <option value={"6493cd9b7683e67c6745f0b8"}>pRESTATARIO</option>
                                    <option value={"valor2"}>VALOR 2</option>
                                    <option value={"valor3"}>VALOR 3</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Fecha de Inicio</FormLabel>
                                <Input
                                    type={"date"}
                                    onChange={handleFechaInicioChange}
                                    min={minDate(date)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Fecha de Devolución</FormLabel>
                                <Input
                                    type={"date"}
                                    onChange={handleFechaDevolucionChange}
                                    min={minDate(date)}
                                />
                            </FormControl>

                            <FormControl mt={"25px"}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    onChange={(e) => {
                                        setComentario(e.target.value);
                                    }}
                                />
                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {comentario.length} / 200
                                </FormHelperText>
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
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme={"blue"}
                                onClick={()=> {
                                    console.log({
                                        instrumento,
                                        prestatario,
                                        prestamista,
                                        fechaInicio,
                                        fechaLimite,
                                        comentario
                                    })
                                    mutation.mutate({
                                        instrumento,
                                        prestatario,
                                        prestamista,
                                        fechaInicio,
                                        fechaLimite,
                                        comentario
                                    })


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

export { NuevoPrestamoInstrumento };
