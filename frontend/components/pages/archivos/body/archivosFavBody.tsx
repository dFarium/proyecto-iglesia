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

export default function ArchivosFavBody() {
    // query todos los archivos
    const filesQuery = useQuery({
        queryKey: ["AllFiles"],
        queryFn: async () => {
            const data = viewAllFiles();
            return data;
        },
        initialData: [],
    });
    const filesData = filesQuery.data;

    const [columnVisibility] = useState({
        id: false,
        index: false,
        mimetype: false,
        publico: true,
        url: false,
        userSubida: false,
        userModifica: false
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
            {
                id: "fileName",
                header: () => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            Nombre
                        </Text>
                    );
                },
                accessorKey: "fileName",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("fileName")}
                        </Text>
                    );
                },
            },
            {
                id: "mimetype",
                header: () => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            Mimetype
                        </Text>
                    );
                },
                accessorKey: "mimetype",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("mimetype")}
                        </Text>
                    );
                },
            },
            {
                id: "tagCategoria",
                header: () => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            Categoría
                        </Text>
                    );
                },
                accessorKey: "tagCategoria",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
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
                            minW={"100%"} textAlign={"center"}
                        >
                            Enlace
                        </Text>
                    );
                },
                accessorKey: "url",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("url")}
                        </Text>
                    );
                },
            },
            {
                id: "userSubida",
                header: () => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            Dueño
                        </Text>
                    );
                },
                accessorKey: "userSubida",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("userSubida")}
                        </Text>
                    );
                },
            },
            {
                id: "userModifica",
                header: () => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            Ultima modificacion
                        </Text>
                    );
                },
                accessorKey: "userModifica",
                cell: ({ row }) => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("userModifica")}
                        </Text>
                    );
                },
            },
            {
                id: "publico",
                header: () => {
                    return (
                        <Text
                            minW={"100%"} textAlign={"center"}
                        >
                            ¿Publico?
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
                                Si
                            </Text>
                        );
                    } else {
                        if (!publico) {
                            return (
                                <Text
                                //  minW={"100%"} textAlign={"center"}
                                >
                                    No
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
