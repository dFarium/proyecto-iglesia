import { downloadFile } from "@/data/archivos/archivos";
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
import { MdDeleteOutline, MdDownload } from "react-icons/md";

function DescargarItemArchivo(props: { id: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();

    const queryClient = useQueryClient();

    const downloadFile = () => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = `${process.env.API_URL}/file/download/${props.id}`;
        //a.download = props.archivoNombre;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <>
            <IconButton
                borderColor={
                    colorMode == "light"
                        ? "descargaButton.light"
                        : "descargaButton.dark"
                }
                isRound
                fontSize={"1.4em"}
                aria-label={"Editar"}
                icon={<MdDownload />}
                color={
                    colorMode == "light"
                        ? "descargaButton.light"
                        : "descargaButton.dark"
                }
                onClick={() => {
                    downloadFile();
                }}
            />
        </>
    );
}

export default DescargarItemArchivo;
