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
    Select,
    VStack
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
    const queryClient = useQueryClient();

    const [imagen, setImagen] = useState<File | null>(null);
    const [uploadImg, setUploadImg] = useState<boolean>(false);

    const [acceso, setAcceso] = useState<boolean>(false);

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValid = /^[a-zA-Z0-9._ -]*$/.test(value);
        setNombreErr(value === "" || !isValid);
        if (isValid) {
            setNombre(value);
        }
    };

    const handleValorCajaChange = (e: any) => {
        const value = e.target.value;
        const r = value.replace(/\D/g, "");
        if (r === "") {
            setValorCaja(0);
            setValorCajaErr(true);
        } else if (parseInt(r) < 99999999) {
            setValorCaja(parseInt(r));
            setValorCajaErr(false);
        } else {
            setValorCajaErr(true);
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
        if (nombre.trim() == "") {
            setNombreErr(true);
            error = true;
        }
        if (valorCaja.toString().trim() == "") {
            setValorCajaErr(true);
            error = true;
        }
        if (error) {
            return false;
        } else {
            setValorCajaErr(false);
            setNombreErr(false);
        }
        return true;
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
                            <FormControl isInvalid={!valorCaja}>
                                <FormLabel>Ingreso</FormLabel>
                                <Input
                                    placeholder="Monto"
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
                                <FormLabel>Fecha de Ingreso</FormLabel>
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
                                            //accept="image/*"
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
                                    setDescripcionErr(false)
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
                                        const fecha: Date = new Date();
                                        const fechaStd: string = `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
                                        mutation.mutate({
                                            nombre,
                                            valorCaja,
                                            fechaGasto,
                                            descripcion,
                                            tipo: "Ingreso",
                                            boleta: imagen ? `${fechaStd}-${imagen.name}` : "",
                                        });

                                        if (imagen) {
                                            uploadPicture(imagen, {
                                                originalName: `${imagen.name}`,
                                                fileName: `${fechaStd}-${imagen.name}`,
                                                tagCategoria: "Boletas",
                                                mimetype: imagen.type,
                                                //url: `${fechaStd}-${imagen.name}`,
                                                url: "./upload/Boletas",
                                                userSubida: "user",
                                                publico: true,
                                            });
                                        }

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const date = new Date();


    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [valorCaja, setValorCaja] = useState<number>(1);
    const [valorCajaErr, setValorCajaErr] = useState<boolean>(false);

    const [fechaGasto, setFechaGasto] = useState<Date>();
    const [descripcion, setDescripcion] = useState<string>("");

    const [tipo, setTipo] = useState<string>("");

    const queryClient = useQueryClient();

    const handleNombreChange = (e: any) => {
        setNombre(e.target.value);
        setNombreErr(false);
    }

    const handleValorCajaChange = (e: any) => {
        const r = e.target.value.replace(/\D/g, "");
        setValorCaja(r);
        setValorCajaErr(false);
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaGasto(date);
    };

    const handleDescripcionChange = (e: any) => {
        setDescripcion(e.target.value);
    };


    const validation = (): boolean => {
        let error: boolean = false;
        if (nombre.trim() == "") {
            setNombreErr(true);
            error = true;
        }
        if (valorCaja.toString().trim() == "") {
            setValorCajaErr(true);
            error = true;
        }
        if (error) {
            valorCaja
            return false;
        } else {
            setValorCajaErr(false);
            setNombreErr(false);
        }
        return true;
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

            {/* AGREGAR GASTO */}


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
                            {/* <HStack align={"start"}> */}
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gasto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    onChange={handleValorCajaChange}
                                    maxLength={50}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un valor</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {valorCaja} / 999999999
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha de Ingreso</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaGastoChange}
                                    min={minDate(date)}
                                />
                            </FormControl>
                            {/* </HStack> */}
                            <FormControl mt={"25px"}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    onChange={handleDescripcionChange}
                                />
                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {descripcion.length} / 200
                                </FormHelperText>
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombreErr(false);
                                    setValorCajaErr(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    if (validation()) {
                                        mutation.mutate({
                                            nombre,
                                            valorCaja,
                                            fechaGasto,
                                            descripcion,
                                            tipo: "Gasto",
                                        });
                                        setNombre("");
                                        setNombreErr(false)
                                        setValorCaja(1);
                                        setValorCajaErr(false);
                                        setFechaGasto(undefined);
                                        setDescripcion("");
                                        setTipo("")
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
    );
}


function NuevoGastoIngresoTesoreria() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const date = new Date();

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [valorCaja, setValorCaja] = useState<number>(1);
    const [valorCajaErr, setValorCajaErr] = useState<boolean>(false);

    const [fechaGasto, setFechaGasto] = useState<Date>();
    const [descripcion, setDescripcion] = useState<string>("");

    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);
    const [tipo, setTipo] = useState<string>("");

    const queryClient = useQueryClient();

    const handleNombreChange = (e: any) => {
        setNombre(e.target.value);
        setNombreErr(false);
    }

    const handleValorCajaChange = (e: any) => {
        const r = e.target.value.replace(/\D/g, "");
        setValorCaja(r);
        setValorCajaErr(false);
    };

    const handleFechaGastoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaGasto(date);
    };

    const handleDescripcionChange = (e: any) => {
        setDescripcion(e.target.value);
        setDescripcionErr(false);
    };

    const handleTipoChange = (e: any) => {
        setTipo(e.target.value);
    };

    const validation = (): boolean => {
        let error: boolean = false;
        if (nombre.trim() == "") {
            setNombreErr(true);
            error = true;
        }
        if (valorCaja.toString().trim() == "") {
            setValorCajaErr(true);
            error = true;
        }
        if (error) {
            valorCaja
            return false;
        } else {
            setValorCajaErr(false);
            setNombreErr(false);
        }
        return true;
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
                            {/* <HStack align={"start"}> */}
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder="Nombre"
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                                {nombreErr ? (
                                    <FormErrorMessage>Ingrese nombre</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {nombre.length} / 50
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box>
                                <FormLabel>Tipo</FormLabel>
                                <Select value={tipo} onChange={handleTipoChange}>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Gasto">Gasto</option>
                                </Select>
                            </Box>
                            <FormControl>
                                <FormLabel>Monto</FormLabel>
                                <Input
                                    placeholder="Monto"
                                    onChange={handleValorCajaChange}
                                    maxLength={50}
                                />
                                {valorCajaErr ? (
                                    <FormErrorMessage>Ingrese un valor</FormErrorMessage>
                                ) : (
                                    <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                        {valorCaja} / 100000000000000
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"25px"}>
                                <FormLabel>Fecha de Ingreso</FormLabel>
                                <Input
                                    type="date"
                                    onChange={handleFechaGastoChange}
                                    min={minDate(date)}
                                />
                            </FormControl>
                            {/* </HStack> */}
                            <FormControl mt={"25px"}>
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    maxH={"300px"}
                                    onChange={handleDescripcionChange}
                                />
                                <FormHelperText pl={"5px"} fontStyle={"italic"}>
                                    {descripcion.length} / 200
                                </FormHelperText>
                            </FormControl>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                mr={3}
                                onClick={() => {
                                    setNombreErr(false);
                                    setValorCajaErr(false);
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    if (validation()) {
                                        (console.log("tipo"))
                                        mutation.mutate({
                                            nombre,
                                            valorCaja,
                                            fechaGasto,
                                            descripcion,
                                            tipo,
                                        });
                                        setNombre("");
                                        setNombreErr(false)
                                        setValorCaja(1);
                                        setValorCajaErr(false);
                                        setFechaGasto(undefined);
                                        setDescripcion("");
                                        setDescripcionErr(false);
                                        setTipo("")
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