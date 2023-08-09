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
    Switch,
    Box,
    Select,
    VStack,
    Text
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
import { minDate } from "@/utils/dateUtils";
import { ItemTesoreria, crearGastoIngresoTesoreria } from "@/data/tesoreria/item";
import { IArchivos, uploadNewFile, uploadNewFileData } from "@/data/archivos/archivos";
import { getUsers, IUsuarioModel } from "@/data/usuarios/usuarios";

function NuevoIngresoTesoreria() {

    const hoy = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [valorCaja, setValorCaja] = useState<number>(0);
    const [valorCajaErr, setValorCajaErr] = useState<boolean>(false);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);

    const [fechaGastoErr, setFechaGastoErr] = useState<boolean>(false);
    const [fechaGasto, setFechaGasto] = useState<Date>(hoy);

    const [tipo, setTipo] = useState<string>("");

    const [imagen, setImagen] = useState<File | null>(null);
    const [uploadImg, setUploadImg] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValid = /^(?!.*[ ]{2,})[a-zA-Z0-9._-]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleValorCajaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.match(/[a-zA-Z]/)) {
            setValorCaja(0);
            setValorCajaErr(true);
        } else {
            const parsedValue = parseInt(value);

            if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 99999999) {
                setValorCaja(parsedValue);
                setValorCajaErr(false);
            } else {
                setValorCaja(0);
                setValorCajaErr(true);
            }
        }
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        if (date <= hoy) {
            setFechaGasto(date);
            setFechaGastoErr(!!e.target.value);
        }
    };


    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const isValid = /^[a-zA-Z0-9,._-]*$/.test(value) && value.length <= 250;
        setDescripcionErr(!isValid);
        if (isValid) {
            setDescripcion(value);
        }
    };

    const validation = (): boolean => {

        let error: boolean = false;

        if (nombre.trim() === "") {
            setNombreErr(true);
            error = true;
        } else {
            setNombreErr(false);
        }

        if (valorCaja.toString().trim() === "" || valorCaja <= 0) {
            setValorCajaErr(true);
            error = true;
        } else {
            setValorCajaErr(false);
        }

        if (descripcion.trim() === "") {
            setDescripcionErr(true);
            error = true;
        } else {
            setDescripcionErr(false);
        }

        return !error;
    };


    function formatCLP(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handlePicChange = async (file: any) => {
        const imagen = file.target.files?.[0] || null;
        setImagen(imagen);
        setUploadImg(true);
    };

    const uploadPicture = async (file: any, fileData: IArchivos) => {
        const formFile = new FormData();
        formFile.append("archivos", file);
        try {
            await uploadNewFile(formFile, "Boletas", fileData.fileName, fileData.tagCategoria, fileData.publico);
            console.log("file si arriba");
        } catch (error) {
            console.log("file no arriba:", fileData.fileName);
        }
    };

    const mutation = useMutation({
        mutationFn: async (newItem: ItemTesoreria) => {
            const res = await crearGastoIngresoTesoreria(newItem);
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
                onClick={onOpen}
            >
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
            {/* AGREGAR INGRESO */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Agregar Ingreso
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
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl isInvalid={valorCajaErr}>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    //value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={8}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {"$ "}{formatCLP(valorCaja)} / {"$ "}{"99.999.999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={!fechaGasto}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaGastoChange}
                                    max={hoy.toISOString().split('T')[0]}
                                    value={fechaGasto.toISOString().split('T')[0]}
                                />
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

                            <HStack mt={"25px"} justify={"space-between"} align={"start"}>
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
                                            accept="image/*"
                                            onChange={handlePicChange}
                                        />
                                    </Button>
                                    <Text>{imagen ? imagen.name : "No hay imagen"}</Text>
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
                                    setValorCaja(0);
                                    setValorCajaErr(false);
                                    setFechaGasto(hoy);
                                    setFechaGastoErr(false);
                                    setDescripcion("");
                                    setDescripcionErr(false);
                                    setTipo("");
                                    setImagen(null);
                                    setUploadImg(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    if (validation()) {
                                        const fecha = new Date();
                                        const fechaStd = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
                                        if (imagen) {
                                            const formData = {
                                                nombre,
                                                valorCaja,
                                                fechaGasto,
                                                descripcion,
                                                tipo: "Ingreso",
                                                boleta: imagen ? `${fechaStd}-${imagen.name}` : "",
                                            };
                                            console.log("AAAAAAAAAAAAAAAAAAAAaa")
                                            console.log(formData);
                                            mutation.mutate(formData);
                                            const uploadData = {
                                                originalName: imagen.name,
                                                fileName: `${fechaStd}-${imagen.name}`,
                                                tagCategoria: "Boletas",
                                                mimetype: imagen.type,
                                                url: "./upload/Boletas",
                                                userSubida: "user",
                                                publico: true,
                                            };
                                            uploadPicture(imagen, uploadData);

                                        } else {
                                            const formData = {
                                                nombre,
                                                valorCaja,
                                                fechaGasto,
                                                descripcion,
                                                tipo: "Ingreso",
                                            };

                                            mutation.mutate(formData);
                                        };
                                        setNombre("");
                                        setNombreErr(false);
                                        setValorCaja(0);
                                        setValorCajaErr(false);
                                        setFechaGasto(hoy);
                                        setFechaGastoErr(false);
                                        setDescripcion("");
                                        setDescripcionErr(false)
                                        setTipo("");
                                        setImagen(null);
                                        setUploadImg(false);
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
    );
}


function NuevoGastoTesoreria() {

    const hoy = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [valorCaja, setValorCaja] = useState<number>(0);
    const [valorCajaErr, setValorCajaErr] = useState<boolean>(false);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);

    const [fechaGastoErr, setFechaGastoErr] = useState<boolean>(false);
    const [fechaGasto, setFechaGasto] = useState<Date>(hoy);

    const [tipo, setTipo] = useState<string>("");

    const [imagen, setImagen] = useState<File | null>(null);
    const [uploadImg, setUploadImg] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValid = /^(?!.*[ ]{2,})[a-zA-Z0-9._-]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleValorCajaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.match(/[a-zA-Z]/)) {
            setValorCaja(0);
            setValorCajaErr(true);
        } else {
            const parsedValue = parseInt(value);

            if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 99999999) {
                setValorCaja(parsedValue);
                setValorCajaErr(false);
            } else {
                setValorCaja(0);
                setValorCajaErr(true);
            }
        }
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        if (date <= hoy) {
            setFechaGasto(date);
            setFechaGastoErr(!!e.target.value);
        }
    };


    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const isValid = /^[a-zA-Z0-9,._-]*$/.test(value) && value.length <= 250;
        setDescripcionErr(!isValid);
        if (isValid) {
            setDescripcion(value);
        }
    };

    const validation = (): boolean => {

        let error: boolean = false;

        if (nombre.trim() === "") {
            setNombreErr(true);
            error = true;
        } else {
            setNombreErr(false);
        }

        if (valorCaja.toString().trim() === "" || valorCaja <= 0) {
            setValorCajaErr(true);
            error = true;
        } else {
            setValorCajaErr(false);
        }

        if (descripcion.trim() === "") {
            setDescripcionErr(true);
            error = true;
        } else {
            setDescripcionErr(false);
        }

        return !error;
    };


    function formatCLP(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handlePicChange = async (file: any) => {
        const imagen = file.target.files?.[0] || null;
        setImagen(imagen);
        setUploadImg(true);
    };

    const uploadPicture = async (file: any, fileData: IArchivos) => {
        const formFile = new FormData();
        formFile.append("archivos", file);
        try {
            await uploadNewFile(formFile, "Boletas", fileData.fileName, fileData.tagCategoria, fileData.publico);
            console.log("file si arriba");
        } catch (error) {
            console.log("file no arriba:", fileData.fileName);
        }
    };

    const mutation = useMutation({
        mutationFn: async (newItem: ItemTesoreria) => {
            const res = await crearGastoIngresoTesoreria(newItem);
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
                onClick={onOpen}
            >
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
            {/* AGREGAR INGRESO */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Agregar Gasto
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
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl isInvalid={valorCajaErr}>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    //value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={8}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {"$ "}{formatCLP(valorCaja)} / {"$ "}{"99.999.999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={!fechaGasto}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaGastoChange}
                                    max={hoy.toISOString().split('T')[0]}
                                    value={fechaGasto.toISOString().split('T')[0]}
                                />
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

                            <HStack mt={"25px"} justify={"space-between"} align={"start"}>
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
                                            accept="image/*"
                                            onChange={handlePicChange}
                                        />
                                    </Button>
                                    <Text>{imagen ? imagen.name : "No hay imagen"}</Text>
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
                                    setValorCaja(0);
                                    setValorCajaErr(false);
                                    setFechaGasto(hoy);
                                    setFechaGastoErr(false);
                                    setDescripcion("");
                                    setDescripcionErr(false);
                                    setTipo("");
                                    setImagen(null);
                                    setUploadImg(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    if (validation()) {
                                        const fecha = new Date();
                                        const fechaStd = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;

                                        if (imagen) {
                                            const formData = {
                                                nombre,
                                                valorCaja,
                                                fechaGasto,
                                                descripcion,
                                                tipo: "Gasto",
                                                boleta: imagen ? `${fechaStd}-${imagen.name}` : "",
                                            };

                                            mutation.mutate(formData);
                                            const uploadData = {
                                                originalName: imagen.name,
                                                fileName: `${fechaStd}-${imagen.name}`,
                                                tagCategoria: "Boletas",
                                                mimetype: imagen.type,
                                                url: "./upload/Boletas",
                                                userSubida: "user",
                                                publico: true,
                                            };
                                            uploadPicture(imagen, uploadData);

                                        } else {
                                            const formData = {
                                                nombre,
                                                valorCaja,
                                                fechaGasto,
                                                descripcion,
                                                tipo: "Gasto",
                                            };

                                            mutation.mutate(formData);
                                        };
                                        setNombre("");
                                        setNombreErr(false);
                                        setValorCaja(0);
                                        setValorCajaErr(false);
                                        setFechaGasto(hoy);
                                        setFechaGastoErr(false);
                                        setDescripcion("");
                                        setDescripcionErr(false)
                                        setTipo("");
                                        setImagen(null);
                                        setUploadImg(false);
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
    );
}


function NuevoGastoIngresoTesoreria() {


    const hoy = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [valorCaja, setValorCaja] = useState<number>(0);
    const [valorCajaErr, setValorCajaErr] = useState<boolean>(false);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);

    const [fechaGastoErr, setFechaGastoErr] = useState<boolean>(false);
    const [fechaGasto, setFechaGasto] = useState<Date>(hoy);

    const [tipo, setTipo] = useState<string>("Ingreso");
    const [tipoErr, setTipoErr] = useState<boolean>(false);

    const [imagen, setImagen] = useState<File | null>(null);
    const [uploadImg, setUploadImg] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValid = /^(?!.*[ ]{2,})[a-zA-Z0-9._-]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleValorCajaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.match(/[a-zA-Z]/)) {
            setValorCaja(0);
            setValorCajaErr(true);
        } else {
            const parsedValue = parseInt(value);

            if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 99999999) {
                setValorCaja(parsedValue);
                setValorCajaErr(false);
            } else {
                setValorCaja(0);
                setValorCajaErr(true);
            }
        }
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        if (date <= hoy) {
            setFechaGasto(date);
            setFechaGastoErr(!!e.target.value);
        }
    };


    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const isValid = /^[a-zA-Z0-9,._-]*$/.test(value) && value.length <= 250;
        setDescripcionErr(!isValid);
        if (isValid) {
            setDescripcion(value);
        }
    };

    const validation = (): boolean => {

        let error: boolean = false;

        if (nombre.trim() === "") {
            setNombreErr(true);
            error = true;
        } else {
            setNombreErr(false);
        }

        if (valorCaja.toString().trim() === "" || valorCaja <= 0) {
            setValorCajaErr(true);
            error = true;
        } else {
            setValorCajaErr(false);
        }

        if (descripcion.trim() === "") {
            setDescripcionErr(true);
            error = true;
        } else {
            setDescripcionErr(false);
        }

        return !error;
    };


    function formatCLP(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handlePicChange = async (file: any) => {
        const imagen = file.target.files?.[0] || null;
        setImagen(imagen);
        setUploadImg(true);
    };

    const uploadPicture = async (file: any, fileData: IArchivos) => {
        const formFile = new FormData();
        formFile.append("archivos", file);
        try {
            await uploadNewFile(formFile, "Boletas", fileData.fileName, fileData.tagCategoria, fileData.publico);
        } catch (error) {
        }
    };

    const mutation = useMutation({
        mutationFn: async (newItem: ItemTesoreria) => {
            const res = await crearGastoIngresoTesoreria(newItem);
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["obtenerTodoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerIngresoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerGastoTesoreria"] });
        },
    });


    const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTipo = e.target.value;
        setTipo(newTipo);

        if (newTipo === "") {
            setTipoErr(true);
        } else {
            setTipoErr(false);
        }
    };

    return (
        <>
            <Button
                fontSize={"1.6em"}
                fontWeight={"bold"}
                p={"35px"}
                colorScheme={"newTesoreriaItemButton"}
                display={{ base: "none", md: "flex" }}
                onClick={onOpen}
            >
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
            {/* AGREGAR TODO */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Agregar
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
                                    <FormErrorMessage>Ingrese nombre válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}

                            </FormControl>
                            <FormControl isInvalid={tipoErr}>
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    {/* <option value="">Seleccione una opción</option> */}
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                                <FormErrorMessage>
                                    {tipoErr && "Por favor, seleccione una opción"}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={valorCajaErr}>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    //value={valorCaja}
                                    onChange={handleValorCajaChange}
                                    maxLength={8}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un monto válido</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {"$ "}{formatCLP(valorCaja)} / {"$ "}{"99.999.999"}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"} isInvalid={!fechaGasto}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaGastoChange}
                                    max={hoy.toISOString().split('T')[0]}
                                    value={fechaGasto.toISOString().split('T')[0]}
                                />
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

                            <HStack mt={"25px"} justify={"space-between"} align={"start"}>
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
                                            accept="image/*"
                                            onChange={handlePicChange}
                                        />
                                    </Button>
                                    <Text>{imagen ? imagen.name : "No hay imagen"}</Text>
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
                                    setValorCaja(0);
                                    setValorCajaErr(false);
                                    setFechaGasto(hoy);
                                    setFechaGastoErr(false);
                                    setDescripcion("");
                                    setDescripcionErr(false);
                                    setTipo("Ingreso");
                                    setImagen(null);
                                    setUploadImg(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    if (validation()) {
                                        const fecha = new Date();
                                        const fechaStd = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
                                        if (imagen) {
                                            const formData = {
                                                nombre,
                                                valorCaja,
                                                fechaGasto,
                                                descripcion,
                                                tipo,
                                                boleta: imagen ? `${fechaStd}-${imagen.name}` : "",
                                            };

                                            mutation.mutate(formData);

                                            const uploadData = {
                                                originalName: imagen.name,
                                                fileName: `${fechaStd}-${imagen.name}`,
                                                tagCategoria: "Boletas",
                                                mimetype: imagen.type,
                                                url: "./upload/Boletas",
                                                userSubida: "user",
                                                publico: true,
                                            };
                                            uploadPicture(imagen, uploadData);

                                        } else {
                                            const formData = {
                                                nombre,
                                                valorCaja,
                                                fechaGasto,
                                                descripcion,
                                                tipo,
                                            };

                                            mutation.mutate(formData);
                                        };
                                        setNombre("");
                                        setNombreErr(false);
                                        setValorCaja(0);
                                        setValorCajaErr(false);
                                        setFechaGasto(hoy);
                                        setFechaGastoErr(false);
                                        setDescripcion("");
                                        setDescripcionErr(false)
                                        setTipo("Ingreso");
                                        setImagen(null);
                                        setUploadImg(false);
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
    );
}


export { NuevoIngresoTesoreria, NuevoGastoTesoreria, NuevoGastoIngresoTesoreria }


