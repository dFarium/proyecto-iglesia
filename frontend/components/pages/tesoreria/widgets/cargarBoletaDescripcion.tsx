import { Text, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, FormLabel, Image, Stack, useColorMode, VStack, Spinner } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { viewImg } from "@/data/archivos/archivos";

interface CargarBoletaDescripcionProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    descripcion: string;
    nombre: string;
    boleta: string;
}
const CargarBoletaDescripcion: React.FC<CargarBoletaDescripcionProps> = ({ isOpen, onClose, id, descripcion, nombre, boleta }) => {
    const { colorMode } = useColorMode();
    const cancelRef = useRef(null);

    const lightBorderImage = "5px #5c5c5c solid";
    const darkBorderImage = "5px #ffe1af solid";

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
                            Item "{nombre}"
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
                            <Button ref={cancelRef} onClick={onClose}>
                                Cerrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>
    )
}

export default CargarBoletaDescripcion;
