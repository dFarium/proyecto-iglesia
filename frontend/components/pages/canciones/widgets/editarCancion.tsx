import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    useColorMode,
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

import {useRef, useState} from "react";
import {MdCreate} from "react-icons/md";
import {minDate, textDate} from "@/utils/dateUtils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { editarCancion, IModeloCancion } from "@/data/canciones/canciones";

function Editarcancion (props: {
    id: string;
    nombre:string;
    clave:string;
    //letra: string;
    genero: string;
    autor: string;
    instrumentos: string;
    //id_song: string
}){

    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef(null);
    const {colorMode} = useColorMode();

    //variables

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [clave, setClave] = useState<string>("");

    //const [letra, setLetra] = useState<File | null>(null);
    //const [uploadLetra, setUploadLetra] = useState<boolean>(false);

    const [genero, setGenero] = useState<string>("");

    const [autor, setAutor] = useState<string>("");

    const [instrumentos, setInstrumentos] = useState<string>("");

    //const [audio, setAudio] = useState<File | null>(null);
    //const [uploadAudio, setUploadAudio] = useState<boolean>(false);

    const setTodoInicio = () => {
        setNombre(props.nombre);
        setNombreErr(false);
        setClave(props.clave);
        //setLetra(props.letra);
        //setUploadLetra(props.letra);
        setGenero(props.genero);
        setAutor(props.autor);
        setInstrumentos(props.instrumentos);
    };

    const queryClient = useQueryClient();

    const handleNombreChange = (e:any)=>{
        setNombre(e.target.value);
        setNombreErr(false);
    };

    const handleKeyChange = (e:any)=>{
        setClave(e.target.value);
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

    const mutation = useMutation({
        mutationFn: async (newCancion:IModeloCancion) => {
            console.log(props.id, newCancion);
            const res = await editarCancion(props.id, newCancion);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["allCanciones"]});
        },
    });

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
            <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            onClose={onClose}>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                        Editar Canción
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder="Nombre" onChange={handleNombreChange} maxLength={50}/>
                            {nombreErr ? (
                                <FormErrorMessage>Ingrese Nombre</FormErrorMessage>
                            ) :(
                                <FormHelperText pl={"5px"} fontStyle={"italic"}> </FormHelperText>
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

                        {/* <HStack mt={"25px"} justify={"space-between"} align={"start"}>
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
                                    accept="image/*"
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
                                    accept="image/*"
                                    onChange={handleAudioChange}
                                    />
                                </Button>
                                <Text>{audio ? audio.name: "No hay audio"}</Text>
                            </VStack>
                        </HStack> */}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                        ref={cancelRef}
                        mr={3}
                        onClick={() => {
                            setNombreErr(false);
                            onClose();
                        }}
                        >Cancelar
                        </Button>
                        <Button colorScheme="blue"
                        onClick={()=> {
                            if (validation()){
                                // const fecha: Date = new Date();
                                // const fechaStd: string = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
                                mutation.mutate({
                                    nombre,
                                    clave,
                                    // letra: letra ? `${fechaStd}-${letra.name}`:"" ,
                                    genero,
                                    autor,
                                    instrumentos,
                                    // id_song: audio ? `${fechaStd}-${audio.name}`:"" ,
                                });
                                // if (letra) {
                                //     uploadDocLetra(letra, {
                                //         fileName: `${letra.name}`,
                                //         tagCategoria: "Canciones",
                                //         mimetype: letra.type,
                                //         url: `${fechaStd}-${letra.name}`,
                                //         userSubida: "user",
                                //         publico: true,
                                // });
                                // }
                                // if (audio) {
                                //     uploadSong(audio, {
                                //         fileName: `${audio.name}`,
                                //         tagCategoria: "Canciones",
                                //         mimetype: audio.type,
                                //         url: `${fechaStd}-${audio.name}`,
                                //         userSubida: "user",
                                //         publico: true,
                                // });
                            }
                            setNombreErr(false);
                            onClose();
                        }
                        }
                        >
                            Aceptar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </>
        );
}

export default Editarcancion;