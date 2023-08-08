import {
    useDisclosure,
    useColorMode,
    IconButton,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    AlertDialogContent,
} from "@chakra-ui/react"

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRef} from "react";
import {MdDeleteOutline} from "react-icons/md";


import {deleteCancion} from "@/data/canciones/canciones"

function EliminarCancion (props: {id: string}){

    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef(null);
    const {colorMode} = useColorMode();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:async () => {
            const res = await deleteCancion(props.id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["allCanciones"]});
        }
    });

    return(
        <>
            <IconButton
                borderColor={
                    colorMode == "light" ? "CancionDelete.light" : "CancionDelete.dark"
                }
                isRound
                fontSize={"1.4em"}
                aria-label={"Editar"}
                icon={<MdDeleteOutline/>}
                onClick={onOpen}
                color={
                    colorMode == "light" ? "CancionDelete.light" : "CancionDelete.dark"
                }
            />
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            ¿Eliminar Cancion?
                        </AlertDialogHeader>
                        <AlertDialogBody>
                        Esta acción es irreversible, ¿continuar?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button mr={3} ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme="blue" onClick={() => {
                                mutation.mutate();
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
    )
}

export default EliminarCancion;