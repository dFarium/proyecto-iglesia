import { eliminarItemCalendario } from "@/data/calendario/item";
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

function EliminarCalendario(props: { name: string; id: string }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await eliminarItemCalendario(props.id);
            return res;
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["obtenerListaCalendario"] });
        },
    });

    return (
        <>
            <IconButton
                borderColor={
                    colorMode == "light"
                        ? "calendarioDeleteItem.light"
                        : "calendarioDeleteItem.dark"
                }
                isRound
                fontSize={"1.4em"}
                aria-label={"Elimnar"}
                icon={<MdDeleteOutline />}
                onClick={onOpen}
                color={
                    colorMode == "light"
                        ? "calendarioDeleteItem.light"
                        : "calendarioDeleteItem.dark"
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
                            Eliminar &quot;{props.name}&quot;
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Esta acción es irreversible ¿Desea continuar?
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
    )
}

export default EliminarCalendario