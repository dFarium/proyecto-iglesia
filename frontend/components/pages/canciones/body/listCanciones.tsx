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
    buildHeaderGroups,
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

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {IModeloCancion, getAllCancion} from "@/data/canciones/canciones";
import { headers } from "next/dist/client/components/headers";
import { NuevaCancion } from "@/components/pages/canciones/widgets/nuevaCancion"

export function ListCancionesBody() {
    //query todas las canciones
    const allCancionesQuery = useQuery({
        queryKey: ["allCanciones"],
        queryFn: getAllCancion,
        initialData: [],
    });

    const allCancionesData = allCancionesQuery.data;

    const [columnVisibility] = useState({
        id: false,
        desc: false,
        ultMant: false,
        cicloMant: false,
        index: false,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const { colorMode } = useColorMode();

    //definicion de columnas
    const columns: ColumnDef<IModeloCancion>[] = useMemo<
    ColumnDef<IModeloCancion>[]
>(
        () => [
            {id: "id", accessorKey: "_id"},
            {
                id: "index",
                header: "#",
                accessorFn: (_row: any, i:number) => i+1,
                sortingFn: "basic",
            },
            {
                id: "nombre",
                header: () =>{
                return (
                    <Text
                    >
                    Nombre

                    </Text>
                );
                },
                accessorKey: "nombre",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("nombre")}
                        </Text>
                    )
                }
            },
            {
                id: "key",
                header: () =>{
                return (
                    <Text
                    >
                    Key
                    </Text>
                );
                },
                accessorKey: "key",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("key")}
                        </Text>
                    )
                }
            },
            {
                id: "letra",
                header: () =>{
                return (
                    <Text
                    >
                    Letra
                    </Text>
                );
                },
                accessorKey: "letra",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("letra")}
                        </Text>
                    )
                }
            },
            {
                id: "genero",
                header: () =>{
                return (
                    <Text
                    >
                    Genero
                    </Text>
                );
                },
                accessorKey: "genero",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("genero")}
                        </Text>
                    )
                }
            },
            {
                id: "autor",
                header: () =>{
                return (
                    <Text
                    >
                    Autor
                    </Text>
                );
                },
                accessorKey: "autor",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("autor")}
                        </Text>
                    )
                }
            },
            {
                id: "instrumentos",
                header: () =>{
                return (
                    <Text
                    >
                    Instrumentos
                    </Text>
                );
                },
                accessorKey: "instrumentos",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("instrumentos")}
                        </Text>
                    )
                }
            },
            {
                id: "id_song",
                header: () =>{
                return (
                    <Text
                    >
                    Audio
                    </Text>
                );
                },
                accessorKey: "id_song",
                cell: ({row}) => {
                    return (
                        <Text>
                            {row.getValue("id_song")}
                        </Text>
                    )
                }
            },
            {
                id: "edit",
                enableSorting: false,
                header: () => {
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
                },
                cell: ({row}) => {
                    return (
                        <Text>
                            IMPLEMENTAR EDITAR CANCION
                        </Text>
                    )
                }
            },
            {
                id: "delete",
                enableSorting: false,
                header: () => {
                return (
                    <>
                    <Circle
                        border={"2px solid"}
                        borderColor={
                        colorMode == "light"
                            ? "inventarioDeleteItem.light"
                            : "inventarioDeleteItem.dark"
                        }
                        size={"1.5em"}
                        fontSize={"1.2em"}
                        color={
                        colorMode == "light"
                            ? "inventarioDeleteItem.light"
                            : "inventarioDeleteItem.dark"
                        }
                        cursor={"default"}
                    >
                        <MdDelete />
                    </Circle>
                    </>
                );
                },
                cell: ({row}) => {
                    return (
                        <Text>
                            IMPLEMENTAR ELIMINAR CANCION
                        </Text>
                    )
                }
            }
        ],
        [colorMode]
    );

    //API REACT TABLE
    const table = useReactTable({
        data: allCancionesData,
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
            <VStack>
                <HStack justifyContent={"space-between"} w={"100%"}>
                    <Text textStyle={"titulo"}>Lista Canciones</Text>
                    <NuevaCancion/>
                </HStack>
                <TableContainer overflowY={"auto"} width = {"100%"}>
                    <Table variant={"striped"} size={"sm"} colorScheme="stripTable">
                        <Thead>
                            {table.getHeaderGroups().map((headerGroup) =>(
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header)=>(
                                        <Th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                            {header.isPlaceholder ? null : (
                                                <Box display={"flex"} flexDir={"row"} alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
                                                    {flexRender( header.column.columnDef.header, header.getContext())}
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
                            {table.getRowModel().rows.map((row)=> (
                                <Tr key = {row.id}>
                                    {row.getVisibleCells().map((cell)=>(
                                        <Td key={cell.id} maxW={"270px"}>
                                        <Box overflowX={"auto"} minH={"50px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
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
                            <Text minW={"400px"}>
                                Puede ver la letra y reproducir el audio dando click en la letra y el audio de la cancion
                            </Text>
                        </HStack>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    )
}

function showPages(maxRows: number, currentIndex: number, pageSize: number) {
    if (maxRows < pageSize * currentIndex + pageSize) {
        return maxRows;
    } else {
        return pageSize * currentIndex + pageSize;
    }
}
