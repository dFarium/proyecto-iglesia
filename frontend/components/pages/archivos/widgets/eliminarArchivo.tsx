import { deleteFile } from "@/data/archivos/archivos";
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
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

function EliminarItemArchivo(props: { name: string; id: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await deleteFile(props.id)
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
                borderColor={
                    colorMode == "light"
                        ? "inventarioDeleteItem.light"
                        : "inventarioDeleteItem.dark"
                }
                isRound
                fontSize={"1.4em"}
                aria-label={"Editar"}
                icon={<MdDeleteOutline />}
                onClick={onOpen}
                color={
                    colorMode == "light"
                        ? "inventarioDeleteItem.light"
                        : "inventarioDeleteItem.dark"
                }
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Eliminar archivo &quot;{props.name}&quot;
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Esta acción es irreversible, ¿continuar?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button mr={3} ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
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
    );
}

export default EliminarItemArchivo;
