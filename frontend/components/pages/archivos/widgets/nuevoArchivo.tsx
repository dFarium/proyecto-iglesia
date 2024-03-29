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
    Box,
    VStack,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IArchivos, subirNewFile } from "@/data/archivos/archivos";
import { arch } from "os";

function NuevoArchivo() {
    // use disclosure
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cancelRef = useRef(null);

    // variables
    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [categoria, setCategoria] = useState<string>("");

    // const [desc, setDesc] = useState<string>("");
    const [acceso, setAcceso] = useState<boolean>(false);

    const [archivoFile, setFile] = useState<File | null>(null);
    const [uploadFile, setUploadFile] = useState<boolean>(false);

    const date = new Date();
    const queryClient = useQueryClient();

    const handleNombreChange = (e: any) => {
        setNombre(e.target.value);
        setNombreErr(false);
    };

    const handleCategoriaChange = (e: any) => {
        setCategoria(e.target.value);
    };

    const validation = (): boolean => {
        let error: boolean = false;
        if (nombre.trim() == "") {
            setNombreErr(true);
            error = true;
        }
        if (error) {
            return false;
        } else {
            setNombreErr(false);
        }
        return true;
    };

    const mutation = useMutation({
        mutationFn: async (archivoFile: any) => {
            const fecha: Date = new Date();
            const fechaStd: string = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
            const formFile = new FormData();
            formFile.append("archivos", archivoFile.archivoFile);

            console.log("Nombre",archivoFile.nombre)
            const res = await subirNewFile(
                formFile,
                "Archivos",
                `${fechaStd}-${archivoFile.archivoFile.name}` /*nombre archivo*/,
                archivoFile.categoria /*tag*/,
                archivoFile.acceso,
                archivoFile.nombre
            );
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["AllFiles"] });
            queryClient.invalidateQueries({ queryKey: ["PubFiles"] });
            queryClient.invalidateQueries({ queryKey: ["PrivFiles"] });
        },
    });

    const handlePicChange = async (file: any) => {
        const archivo = file.target.files?.[0] || null;
        setFile(archivo);
        setUploadFile(true);
    };

    const uploadPicture = async (file: any, fileData: IArchivos) => {};

    return (
        <>
            <Button
                fontSize={"1.6em"}
                fontWeight={"bold"}
                p={"35px"}
                colorScheme={"newArchivoItemButton"}
                display={{ base: "none", md: "flex" }}
                onClick={onOpen}
            >
                Nuevo Archivo
            </Button>

            <IconButton
                display={{ base: "flex", md: "none" }}
                isRound
                w={{ base: "60px", md: "70px" }}
                h={{ base: "60px", md: "70px" }}
                colorScheme={"newArchivoItemButton"}
                aria-label={"Agregar Item"}
                fontSize={{ base: "3em", md: "3.3em" }}
                icon={<MdAdd />}
                onClick={onOpen}
            >
                Nuevo Archivo
            </IconButton>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                closeOnEsc={false}
                closeOnOverlayClick={false}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Agregar Archivo
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <FormControl>
                                <FormLabel>Nombre del archivo</FormLabel>

                                <Input
                                    placeholder="Nombre del archivo."
                                    onChange={handleNombreChange}
                                    isInvalid={!nombre}
                                    maxLength={15}
                                />

                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {nombre.length} / 15
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Define una categoria</FormLabel>

                                <Input
                                    placeholder="Por ejemplo: Estudio, Informe, etc."
                                    onChange={handleCategoriaChange}
                                    isInvalid={!categoria}
                                    maxLength={10}
                                />

                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {categoria.length} / 10
                                </FormHelperText>
                            </FormControl>
                            <HStack
                                mt={"25px"}
                                justify={"space-between"}
                                align={"start"}
                            >
                                <VStack>
                                    <Button>
                                        Subir Archivo
                                        <Input
                                            type="file"
                                            height="100%"
                                            width="100%"
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            opacity="0"
                                            aria-hidden="true"
                                            onChange={handlePicChange}
                                        />
                                    </Button>
                                    <Text>
                                        {archivoFile
                                            ? archivoFile.name
                                            : "No hay archivos"}
                                    </Text>
                                </VStack>
                                <Box>
                                    <FormControl
                                        display={"flex"}
                                        flexDir={"column"}
                                        alignItems={"center"}
                                    >
                                        <FormLabel>
                                            ¿Disponible para todos?
                                        </FormLabel>
                                        <Switch
                                            id="prest"
                                            onChange={(e) => {
                                                setAcceso(e.target.checked);
                                            }}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombre("");
                                    setCategoria("");
                                    setAcceso(false);
                                    onClose();
                                    setFile(null);
                                    setUploadFile(false);
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                isDisabled={!archivoFile || !categoria || !nombre}
                                colorScheme="blue"
                                onClick={() => {
                                    if (archivoFile && nombre && categoria) {
                                        mutation.mutate({
                                            archivoFile,
                                            categoria,
                                            acceso,
                                            nombre
                                        });
                                    }
                                    setNombre("");
                                    setCategoria("");
                                    setFile(null);
                                    setAcceso(false);
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

export { NuevoArchivo };
