/* import { Link, Text, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, FormLabel, Image, Stack, useColorMode, VStack, Spinner } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { viewImg } from "@/data/archivos/archivos";

function CargarBoletaDescripcion(props: {
    id: string;
    descripcion: string;
    nombre: string;
    boleta: string;
}) {

    const [nombre, setNombre] = useState<string>(props.nombre);
    const [descripcion, setDescripcion] = useState<string>(props.descripcion);
    const [boleta, setBoleta] = useState<string>(props.boleta);
    const [identificador, setIdentificador] = useState<string>(props.id);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { colorMode } = useColorMode();
    const cancelRef = useRef(null);

    const lightBorderImage = "5px #5c5c5c solid";
    const darkBorderImage = "5px #ffe1af solid";

    return (
        <>

            <Link
                onClick={() => {
                    setNombre(props.nombre);
                    setDescripcion(props.descripcion);
                    setBoleta(props.boleta);
                    onOpen();
                }}
            >
                {nombre}
            </Link>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
                            Item {nombre}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Stack spacing={3}>
                                <FormLabel>
                                    <Text fontWeight={"bold"}>Descripción</Text>
                                </FormLabel>

                                <Text
                                    borderRadius="10px"
                                    border="1px"
                                    p={2}
                                >
                                    {descripcion}
                                </Text>
                                <FormLabel>
                                    <Text fontWeight={"bold"}>Archivo adjunto</Text>
                                </FormLabel>

                                {boleta ? (
                                    <Image
                                        src={`${process.env.API_URL}/upload/Boletas/${boleta}`}
                                        fallback={
                                            <VStack minH={"300px"} justify={"center"} align={"center"}>
                                                <Spinner size={"xl"} />
                                            </VStack>
                                        }
                                        objectFit={"contain"}
                                        borderRadius={"15px"}
                                        border={
                                            colorMode === "light" ? lightBorderImage : darkBorderImage
                                        }
                                    />
                                ) : (
                                    <FormLabel>
                                        <Text>No hay archivo disponible</Text>
                                    </FormLabel>
                                )}

                            </Stack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => {
                                setNombre("");
                                setDescripcion("");
                                setBoleta("");
                                setIdentificador("");
                                onClose();
                            }}
                            >
                                Cerrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog >

        </>
    )
}

export default CargarBoletaDescripcion;
 */

import React, { useRef } from 'react';
import {
    Link,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    FormLabel,
    Image,
    Stack,
    VStack,
    Spinner,
    useColorMode,
} from '@chakra-ui/react';

interface CargarBoletaDescripcionProps {
    id: string;
    descripcion: string;
    nombre: string;
    boleta: string;
}

function CargarBoletaDescripcion(props: CargarBoletaDescripcionProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode } = useColorMode();
    const cancelRef = useRef(null);

    const lightBorderImage = '5px #5c5c5c solid';
    const darkBorderImage = '5px #ffe1af solid';

    return (
        <>
            <Link onClick={onOpen}>{props.nombre}</Link>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
                            Item {props.nombre}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Stack spacing={3}>
                                <FormLabel>
                                    <Text fontWeight={"bold"}>Descripción</Text>
                                </FormLabel>

                                <Text
                                    borderRadius="10px"
                                    border="1px"
                                    p={2}
                                >
                                    {props.descripcion}
                                </Text>
                                <FormLabel>
                                    <Text fontWeight={"bold"}>Archivo adjunto</Text>
                                </FormLabel>

                                {props.boleta ? (
                                    <Image
                                        src={`${process.env.API_URL}/upload/Boletas/${props.boleta}`}
                                        fallback={
                                            <VStack minH={"300px"} justify={"center"} align={"center"}>
                                                <Spinner size={"xl"} />
                                            </VStack>
                                        }
                                        objectFit={"contain"}
                                        borderRadius={"15px"}
                                        border={
                                            colorMode === "light" ? lightBorderImage : darkBorderImage
                                        }
                                    />
                                ) : (
                                    <FormLabel>
                                        <Text>No hay archivo disponible</Text>
                                    </FormLabel>
                                )}

                            </Stack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => {
                                onClose();
                            }}
                            >
                                Cerrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog >

        </>
    );
}

export default CargarBoletaDescripcion;
