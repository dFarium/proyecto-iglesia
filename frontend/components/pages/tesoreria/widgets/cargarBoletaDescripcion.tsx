import { Text, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'

interface CargarBoletaDescripcionProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    descripcion: string;
    nombre: string;
}

const CargarBoletaDescripcion: React.FC<CargarBoletaDescripcionProps> = ({ isOpen, onClose, id, descripcion, nombre }) => {
    const cancelRef = useRef(null);
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

                            <Text>
                                ID: {id}
                            </Text>
                            <Text>
                                Descripción: {descripcion}
                            </Text>
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
