import { deleteItemInventario } from "@/data/inventario/item";
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

