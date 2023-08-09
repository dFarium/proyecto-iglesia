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
import { IArchivos, updateFile } from "@/data/archivos/archivos";

function EditarArchivo(props: {
    id: string;
    originalName: string;
    fileName: string;
    userName: string;
    tagCategoria: string;
    mimetype: string;
    url: string;
    userSubida: string;
    userModifica: string;
    publico: boolean;
    createdAt: Date;
    updatedAt: Date;
}) {
    // use disclosures
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();
    const date = new Date();

    // variables

    //Nombre archivo
    const [nombre, setNombre] = useState<string>("");

    const [nombreOrig, setNombreOrig] = useState<string>(props.originalName);

    const [nombreSave, setNombreSave] = useState<string>(props.fileName);

    //Categoria
    const [categoria, setCategoria] = useState<string>("");

    //Usuario que lo modifica
    const [userModifica, setUserModifica] = useState<string>("");

    //Fecha de update
    const [fechaUpdate, setFechaUpdate] = useState<Date>(date);

    //Publico
    const [publico, setPublico] = useState<boolean>(false);

    const setTodoInicio = () => {
        setNombre(props.userName);
        setCategoria(props.tagCategoria);
        setUserModifica(props.userModifica);
        setFechaUpdate(props.updatedAt);
        setPublico(props.publico);
    };

    // const showDate = (date: Date): string => {
    //     if (date) {
    //         return "Actual: " + textDate(date);
    //     }
    //     return "Sin fecha";
    // };

    const queryClient = useQueryClient();

    const handleNombreChange = (e: any) => {
        setNombre(e.target.value);
    };

    const handleCategoriaChange = (e: any) => {
        setCategoria(e.target.value);
    };

    const handleUserChange = (e: any) => {
        setUserModifica(e.target.value);
    };

    const handleFechaUpdateChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate()
        );
        setFechaUpdate(date);
    };

    const mutation = useMutation({
        mutationFn: async (newItem: IArchivos) => {
            const res = await updateFile(props.id, newItem);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["AllFiles"] });
            queryClient.invalidateQueries({ queryKey: ["PubFiles"] });
            queryClient.invalidateQueries({ queryKey: ["PrivFiles"] });

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
                    setTodoInicio();
                    onOpen();
                }}
                color={colorMode == "light" ? "#4A5568" : "#2D3748"}
            />

            <AlertDialog
                isOpen = {isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Editar Archivo
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    maxLength={20}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Categoria</FormLabel>
                                <Input
                                    placeholder="Por ejemplo: Estudio, Informe, etc."
                                    value={categoria}
                                    onChange={handleCategoriaChange}
                                    maxLength={10}
                                />
                            </FormControl>
                            {/* <FormControl mt={"25px"}>
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
                            </FormControl> */}

                            <FormControl
                                display={"flex"}
                                flexDir={"column"}
                                alignItems={"center"}
                            >
                                <FormLabel>¿Disponible para todos?</FormLabel>
                                <Switch
                                    isChecked = {publico}
                                    id="prest"
                                    onChange={(e) => {
                                        setPublico(e.target.checked);
                                    }}
                                />
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    // validation();
                                    const fecha: Date = new Date();
                                    const fechaStd: string = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
                                    mutation.mutate({
                                        
                                        //  fileName: `${fechaStd}-${nombre}`
                                        originalName: nombreOrig,
                                        fileName: nombreSave,
                                        userName: nombre,
                                        tagCategoria: categoria,
                                        userModifica: "Modificado",
                                        updatedAt: fechaUpdate,
                                        publico,
                                    });
                                    onClose();
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

export default EditarArchivo;
