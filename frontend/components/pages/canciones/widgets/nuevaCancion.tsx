import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useColorMode,
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
import { IArchivos, uploadNewFile, uploadNewFileData } from "@/data/archivos/archivos";

import { IModeloCancion, createCancion } from "@/data/canciones/canciones";

function NuevaCancion(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [clave, setKey] = useState<string>("");

    const [letra, setLetra] = useState<File | null>(null);
    const [uploadLetra, setUploadLetra] = useState<boolean>(false);

    const [genero, setGenero] = useState<string>("");

    const [autor, setAutor] = useState<string>("");

    const [instrumentos, setInstrumentos] = useState<string>("");

    const [audio, setAudio] = useState<File | null>(null);
    const [uploadAudio, setUploadAudio] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const {colorMode} = useColorMode();

    const handleNombreChange = (e:any)=>{
        setNombre(e.target.value);
        setNombreErr(false);
    };

    const handleKeyChange = (e:any)=>{
        setKey(e.target.value);
    };

    const handleLetraChange = async (file: any) => {
        const letra = file.target.files?.[0] || null;
        setLetra(letra);
        setUploadLetra(true);
    };

    const uploadDocLetra = async (file:any, fileData: IArchivos) => {
        const formFile = new FormData();
        formFile.append("archivos",file);
        try {
            await uploadNewFile(formFile, "Letra", fileData.url);
            console.log("file si");
        } catch (error){
            console.log("file: ",error);
        }
        try {
            await uploadNewFileData(fileData);
            console.log("data si");
        } catch(error){
            console.log("data: ",error);
        }
    };

    const handleGeneroChange = (e:any) => {
        setGenero(e.target.value);
    };

    const handleAutorChange = (e:any)=>{
        setAutor(e.target.value);
    };

    const handleInstrumentosChange = (e: any) => {
        setInstrumentos(e.target.value);
    };

    const handleAudioChange = async (file:any) =>{
        const audio = file.target.file?.[0] || null;
        setAudio(audio);
        setUploadAudio(true);
    };

    const uploadSong = async (file:any, fileData: IArchivos) => {
        const formFile = new FormData();
        formFile.append("archivos",file);
        try {
            await uploadNewFile(formFile, "Audio", fileData.url);
            console.log("file si");
        } catch (error){
            console.log("file: ",error);
        }
        try {
            await uploadNewFileData(fileData);
            console.log("data si");
        } catch(error){
            console.log("data: ",error);
        }
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
        mutationFn:async (newCancion:IModeloCancion) => {
            const res = await createCancion(newCancion);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["allCanciones"]});
        },
    });

    return(
        <>
        <Button
        fontSize={"1.6em"}
        fontWeight={"bold"}
        p={"35px"}
        colorScheme={"newInventarioItemButton"}
        display={{ base: "none", md: "flex" }}
        onClick={onOpen}
        >
        Nueva Canción
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
        Nueva Canción
        </IconButton >

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        onClose={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                    Agregar Nueva Canción
                </AlertDialogHeader>
                <AlertDialogBody>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder="Nombre" onChange={handleNombreChange} maxLength={50}/>
                        {nombreErr ? (
                            <FormErrorMessage>Ingrese Nombre</FormErrorMessage>
                        ) :(
                            <FormHelperText pl={"5px"} fontStyle={"italic"}>{nombre.length} /50</FormHelperText>
                        )}
                    </FormControl>

                    <HStack align={"start"} mt={"25px"}>
                    <FormControl>
                        <FormLabel>Key</FormLabel>
                        <Input placeholder="Key" onChange={handleKeyChange} maxLength={50}/>
                        <FormHelperText fontStyle={"italic"} pl={"5px"}>
                            Opcional
                        </FormHelperText>
                    </FormControl>

                    <FormControl mt={"25px"}>
                        <FormLabel>Genero</FormLabel>
                        <Input placeholder="Genero" onChange={handleGeneroChange} maxLength={50}/>
                        <FormHelperText fontStyle={"italic"} pl={"5px"}>
                            Opcional
                        </FormHelperText>
                    </FormControl>

                    <FormControl mt={"25px"}>
                        <FormLabel>Autor</FormLabel>
                        <Input placeholder="Autor" onChange={handleAutorChange} maxLength={50}/>
                        <FormHelperText fontStyle={"italic"} pl={"5px"}>
                            Opcional
                        </FormHelperText>
                    </FormControl>
                    </HStack>

                    <FormControl mt={"25px"}>
                        <FormLabel>Instrumentos</FormLabel>
                        <Input placeholder="Instrumentos" onChange={handleInstrumentosChange} maxLength={300}/>
                        <FormHelperText fontStyle={"italic"} pl={"5px"}>
                            Opcional
                        </FormHelperText>
                    </FormControl>

                    <HStack mt={"25px"} justify={"space-between"} align={"start"}>
                        <VStack>
                            <Button>
                                Subir Letra
                                <Input
                                type="file"
                                height="100%"
                                width="100%"
                                position="absolute"
                                top="0"
                                left="0"
                                opacity="0"
                                aria-hidden="true"
                                accept="application/*"
                                onChange={handleLetraChange}
                                />
                            </Button>
                            <Text>{letra ? letra.name: "No hay letra"}</Text>
                        </VStack>
                        <VStack>
                            <Button>
                                Subir Audio
                                <Input
                                type="file"
                                height="100%"
                                width="100%"
                                position="absolute"
                                top="0"
                                left="0"
                                opacity="0"
                                aria-hidden="true"
                                accept="audio/*"
                                onChange={handleAudioChange}
                                />
                            </Button>
                            <Text>{audio ? audio.name: "No hay audio"}</Text>
                        </VStack>
                    </HStack>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button
                    ref={cancelRef}
                    mr={3}
                    onClick={() => {
                        setNombre("");
                        setNombreErr(false);
                        setKey("");
                        setLetra(null);
                        setUploadLetra(false);
                        setGenero("");
                        setAutor("");
                        setInstrumentos("");
                        setAudio(null);
                        setUploadAudio(false);
                        onClose();
                    }}
                    >Cancelar</Button>
                    <Button colorScheme="blue"
                    onClick={()=> {
                        if (validation()){
                            const fecha: Date = new Date();
                            const fechaStd: string = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
                            mutation.mutate({
                                nombre,
                                clave,
                                letra: letra ? `${fechaStd}-${letra.name}`:"" ,
                                genero,
                                autor,
                                instrumentos,
                                id_song: audio ? `${fechaStd}-${audio.name}`:"" ,
                            });
                            if (letra) {
                                uploadDocLetra(letra, {
                                    fileName: `${letra.name}`,
                                    tagCategoria: "Canciones",
                                    mimetype: letra.type,
                                    url: `${fechaStd}-${letra.name}`,
                                    userSubida: "user",
                                    publico: true,
                            });
                            }
                            if (audio) {
                                uploadSong(audio, {
                                    fileName: `${audio.name}`,
                                    tagCategoria: "Canciones",
                                    mimetype: audio.type,
                                    url: `${fechaStd}-${audio.name}`,
                                    userSubida: "user",
                                    publico: true,
                            });
                        }
                        setNombre("");
                        setNombreErr(false);
                        setKey("");
                        setLetra(null);
                        setUploadLetra(false);
                        setGenero("");
                        setAutor("");
                        setInstrumentos("");
                        setAudio(null);
                        setUploadAudio(false);
                        onClose();
                    }
                    }}>
                        Aceptar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>

        </>
    );
}

export {NuevaCancion};