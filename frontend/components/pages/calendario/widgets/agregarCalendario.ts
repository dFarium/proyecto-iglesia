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
import { minDate, textDate } from "@/utils/dateUtils";
import { ItemCalendario, crearItemCalendario } from "@/data/calendario/item";

function AgregarCalendario() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const [nombreAct, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [fechaInicio, setFechaInicio] = useState<Date>();
    const [fechaInicioErr, setFechaInicioErr] = useState<boolean>(false);

    const [fechaTermino, setFechaTermino] = useState<Date>();
    const [fechaTerminoErr, setFechaTerminoErr] = useState<boolean>(false);

    const [estadoActividad, setEstadoActividad] = useState<boolean>();
    const [estadoActividadErr, setEstadoActividadErr] = useState<boolean>(false);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const date = new Date

    const handleNombreChange = (e: any) => {
        setNombre(e.target.value);
        setNombreErr(false);
    }

    const handleFechaInicioChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaInicio(date);
    }

    const handleFechaTerminoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaTermino(date);
    }

    const handleEstadoActividadChange = (e: any) => {
        setEstadoActividad(e.target.value);
    }

    const handleDescripcionChange = (e: any) => {
        setDescripcion(e.target.value);
        setDescripcionErr(false);
    };

    const mutation = useMutation({
        mutationFn: async (newItem: ItemCalendario) => {
            const res = await crearItemCalendario(newItem);
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["obtenerTodoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerIngresoTesoreria"] });
            queryClient.invalidateQueries({ queryKey: ["obtenerGastoTesoreria"] });
        },


    });
}

export default AgregarCalendario