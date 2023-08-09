import {deleteItemInventario, editItemInventario} from "@/data/inventario/item";
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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {use, useRef} from "react";
import {MdDeleteOutline} from "react-icons/md";
import {deletePrestamoInstrumento, getPrestamoInstrumento} from "@/data/prestamos/prestamos";

function EliminarPrestamoInstrumento(props: { instrumentoId: string, id: string, devuelto:boolean }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef(null);
    const {colorMode} = useColorMode();
    const queryClient = useQueryClient();
    let devueltoStatus = false;

    //Se obtiene si el objeto ha sido devuelto
    const getDevueltoStatus = useMutation({
        mutationFn: async () => {
            const res = await getPrestamoInstrumento(props.id);
            devueltoStatus = res.devuelto;
            return res
        },
        onSuccess: () => {
            prestamoMutation.mutate();
        }
    })

    //Se borra el prestamo
    const prestamoMutation = useMutation({
        mutationFn: async () => {
            const res = await deletePrestamoInstrumento(props.id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["allPrestamos"]});
            if (!props.devuelto) {
                itemMutationToEstadoActivo.mutate({estado: "Activo"})
            }
        },
    });

    //Si el objeto prestado está en prestable = false, se convierte a true
    const itemMutationToEstadoActivo = useMutation({
        mutationFn: async (newItem: any) => {
            const res = await editItemInventario(props.instrumentoId, newItem);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["instrumentosPrestables"]})
        }
    })

    return (
        <>
            <IconButton
                borderColor={
                    colorMode == "light"
                        ? "prestamoDeleteItem.light"
                        : "prestamoDeleteItem.dark"
                }
                isRound
                fontSize={"1.4em"}
                aria-label={"Editar"}
                icon={<MdDeleteOutline/>}
                onClick={onOpen}
                color={
                    colorMode == "light"
                        ? "prestamoDeleteItem.light"
                        : "prestamoDeleteItem.dark"
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
                            ¿Eliminar préstamo?
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
                                    getDevueltoStatus.mutate();
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

export default EliminarPrestamoInstrumento;
