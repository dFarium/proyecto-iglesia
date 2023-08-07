"use client";

import {
    Box,
    HStack,
    VStack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Circle,
    IconButton,
    useColorMode,
} from "@chakra-ui/react";

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    MdArrowDropDown,
    MdArrowDropUp,
    MdCreate,
    MdDelete,
    MdHelp,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
    MdNavigateBefore,
    MdNavigateNext,
} from "react-icons/md";
import { NuevoArchivo } from "../widgets/nuevoArchivo";
import { useMemo, useState } from "react";
import { textDate } from "@/utils/dateUtils";
import {
    viewAllFiles,
    viewOneFile,
    viewFavorite,
    downloadFile,
    uploadNewFile,
    deleteFile,
    IArchivos
} from "@/data/archivos/archivos";

import { useQuery } from "@tanstack/react-query";
import EditarArchivo from "../widgets/editarArchivo";
import EliminarItemArchivo from "../widgets/eliminarArchivo";
//import { VerFotoItem } from "../widgets/verFotoItem";

export default function ArchivosPubBody() {
    // query todos los archivos publicos
    const filesQuery = useQuery({
        queryKey: ["AllFiles"],
        queryFn: async () => {
            const data = viewAllFiles();
            return data;
        },
        initialData: [],
    });
    const filesData = filesQuery.data;

    const userAccess = false;

    const [columnVisibility] = useState({
        id: false,
        index: false,
        mimetype: false,
        publico: true,
        url: false,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const { colorMode } = useColorMode();

    // definicion de las columnas de la tabla
    const columns: ColumnDef<IArchivos>[] = useMemo<
        ColumnDef<IArchivos>[]
    >(
        () => [
            { id: "id", accessorKey: "_id" },
            {
                id: "index",
                header: "#",
                accessorFn: (_row: any, i: number) => i + 1,
                sortingFn: "basic",
            },
            // { id: "imgScr", accessorKey: "urlPic" },
            {
                id: "nombre",
                header: () => {
                        return (
                        <Text
                            //minW={"100%"} textAlign={"center"}
                        >
                            Nombre
                        </Text>
                    );
                },
                accessorKey: "nombre",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("nombre")}
                        </Text>
                    );
                },
            },
            {
                id: "mimetype",
                header: () => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            Mimetype
                        </Text>
                    );
                },
                accessorKey: "mimetype",
                cell: ({ row }) => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("mimetype")}
                        </Text>
                    );
                },
            },
            {
                id: "categoria",
                header: () => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            Categoría
                        </Text>
                    );
                },
                accessorKey: "tagCategoria",
                cell: ({ row }) => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("tagCategoria")}
                        </Text>
                    );
                },
            },
            {
                id: "url",
                header: () => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            Url
                        </Text>
                    );
                },
                accessorKey: "url",
                cell: ({ row }) => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("url")}
                        </Text>
                    );
                },
            },
            {
                id: "publico",
                header: () => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            Acceso
                        </Text>
                    );
                },
                accessorKey: "publico",
                cell({ row }) {
                    const publico: boolean = row.getValue("publico");

                    if (publico) {
                        return (
                            <Text
                            //  minW={"100%"} textAlign={"center"}
                            >
                                Publico
                            </Text>
                        );
                    } else {
                        if (!publico) {
                            return (
                                <Text
                                //  minW={"100%"} textAlign={"center"}
                                >
                                    Privado
                                </Text>
                            );
                        }
                        return (
                            <Text
                            //  minW={"100%"} textAlign={"center"}
                            >
                                -
                            </Text>
                        );
                    }
                },
            },
            {
                id: "fechaCreado",
                header: () => {
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            Fecha de Subida
                        </Text>
                    );
                },
                accessorKey: "fechaCreado",
                cell: ({ row }) => {
                    const date = textDate(row.getValue<Date>("fechaCreado"));
                    return (
                        <Text
                        //  minW={"100%"} textAlign={"center"}
                        >
                            {date}
                        </Text>
                    );
                },
                sortingFn: "datetime",
            },
            {
                id: "edit",
                enableSorting: false,
                header: () => {
                    if (userAccess) {  // CAMBIO USERS
                        return (
                            <>
                                <Circle
                                    bg={"#F6AD55"}
                                    size={"1.5em"}
                                    fontSize={"1.2em"}
                                    color={colorMode == "light" ? "#4A5568" : "#2D3748"}
                                    cursor={"default"}
                                >
                                    <MdCreate />
                                </Circle>
                            </>
                        );
                    } else {
                        return (
                            <>
                            </>
                        );
                    }
                },
                cell: ({ row }) => {
                    if (userAccess) {
                        return (
                            <EditarArchivo
                                id={row.getValue("id")}
                                nombre={row.getValue("nombre")}
                                estado={row.getValue("estado")}
                                prestable={row.getValue("prestable")}
                                cantidad={row.getValue("cantidad")}
                                categoria={row.getValue("categoria")}
                                cicloMant={row.getValue("cicloMant")}
                                desc={row.getValue("desc")}
                                fechaSalida={row.getValue("fechaSalida")}
                                ultMant={row.getValue("ultMant")}
                            />
                        );
                    } else {
                        return (
                            <>
                            </>
                        );
                    }
                },
            },
            {
                id: "delete",
                enableSorting: false,
                header: () => {
                    if (userAccess) {
                        return (
                            <>
                                <Circle
                                    border={"2px solid"}
                                    borderColor={
                                        colorMode == "light"
                                            ? "archivoDeleteItem.light"
                                            : "archivoDeleteItem.dark"
                                    }
                                    size={"1.5em"}
                                    fontSize={"1.2em"}
                                    color={
                                        colorMode == "light"
                                            ? "archivoDeleteItem.light"
                                            : "archivoDeleteItem.dark"
                                    }
                                    cursor={"default"}
                                >
                                    <MdDelete />
                                </Circle>
                            </>
                        );
                    } else {
                        return (
                            <>
                            </>
                        );
                    }
                },
                cell: ({ row }) => {
                    if (userAccess) {
                        return (
                            <EliminarItemArchivo
                                name={row.getValue("nombre")}
                                id={row.getValue("id")}
                            />
                        );
                    } else {
                        return (
                            <>
                            </>
                        );
                    }

                },
            },
        ],
        [colorMode]
    );

    // api react table
    const table = useReactTable({
        data: filesData,
        columns,
        initialState: {
            columnVisibility,
        },
        state: {
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        debugTable: true,
    });

    return (
        <Box w={"100%"} h={"100%"}>
            <VStack w={"100%"} h={"100%"} spacing={"30px"}>
                <HStack justifyContent={"space-between"} w={"100%"}>
                    <Text textStyle={"titulo"}>Lista Archivos</Text>
                    <NuevoArchivo />
                </HStack>
                <TableContainer overflowY={"auto"} width={"100%"}>
                    <Table variant={"striped"} size={"sm"} colorScheme="stripTable">
                        <Thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <Box
                                                    display={"flex"}
                                                    flexDir={"row"}
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    cursor={"pointer"}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    <Box fontSize={"1.5em"}>
                                                        {header.column.getIsSorted() ? (
                                                            header.column.getIsSorted() === "desc" ? (
                                                                <MdArrowDropDown />
                                                            ) : (
                                                                <MdArrowDropUp />
                                                            )
                                                        ) : null}
                                                    </Box>
                                                </Box>
                                            )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                            {table.getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id} maxW={"270px"}>
                                            <Box
                                                overflowX={"auto"}
                                                minH={"50px"}
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Box>
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <VStack flexGrow={1} minH={"50px"} w={"100%"} justifyContent={"end"}>
                    <HStack w={"100%"} overflowX={"auto"} justify={"space-between"}>
                        <HStack>
                            <Text minW={"220px"} overflowX={"auto"}>
                                Mostrando{" "}
                                {table.getState().pagination.pageSize *
                                    table.getState().pagination.pageIndex +
                                    1}
                                {"-"}
                                {showPages(
                                    table.getPrePaginationRowModel().rows.length,
                                    table.getState().pagination.pageIndex,
                                    table.getState().pagination.pageSize
                                )}
                                {" de "}
                                {table.getPrePaginationRowModel().rows.length}
                            </Text>
                            <HStack>
                                <IconButton
                                    icon={<MdKeyboardDoubleArrowLeft />}
                                    aria-label="Primera página"
                                    onClick={() => table.setPageIndex(0)}
                                    isDisabled={!table.getCanPreviousPage()}
                                />
                                <IconButton
                                    icon={<MdNavigateBefore />}
                                    aria-label="Página anterior"
                                    onClick={() => table.previousPage()}
                                    isDisabled={!table.getCanPreviousPage()}
                                />
                                <IconButton
                                    icon={<MdNavigateNext />}
                                    aria-label="Página siguiente"
                                    onClick={() => table.nextPage()}
                                    isDisabled={!table.getCanNextPage()}
                                />
                                <IconButton
                                    icon={<MdKeyboardDoubleArrowRight />}
                                    aria-label="Última página"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    isDisabled={!table.getCanNextPage()}
                                />
                            </HStack>
                        </HStack>
                        <HStack display={{ base: "none", lg: "flex" }}>
                            <MdHelp size={"20px"} />
                            {/* <Text minW={"400px"}>
                                Puede ver las fotos dando click en el nombre del Item
                            </Text> */}
                        </HStack>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    );
}

function showPages(maxRows: number, currentIndex: number, pageSize: number) {
    if (maxRows < pageSize * currentIndex + pageSize) {
        return maxRows;
    } else {
        return pageSize * currentIndex + pageSize;
    }
}
