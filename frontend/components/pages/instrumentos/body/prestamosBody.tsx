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
    Icon,
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
import {useMemo, useState} from "react";
import {textDate} from "@/utils/dateUtils";
import {IPrestamoInstrumento, getAllPrestamoInstrumento} from "@/data/prestamos/prestamos";
import {useQuery} from "@tanstack/react-query";
import {NuevoPrestamoInstrumento} from "@/components/pages/instrumentos/widgets/nuevoPrestamo";
import EliminarPrestamoInstrumento from "@/components/pages/instrumentos/widgets/eliminarPrestamo";
import EditarPrestamo from "@/components/pages/instrumentos/widgets/editarPrestamo";
import {VerInstrumento} from "@/components/pages/instrumentos/widgets/verInstrumento";

const userAccess: boolean = true;

export default function PrestamoBody() {
    // query todos los items
    const allPrestamosQuery = useQuery({
        queryKey: ["allPrestamos"],
        queryFn: getAllPrestamoInstrumento,
        initialData: [],
    });
    const allPrestamosData = allPrestamosQuery.data;

    const [columnVisibility] = useState({
        id: false,
        desc: false,
        index: false,
        imgScr: false,
        instrumentoId: false,
        edit: userAccess,
        delete: userAccess,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const {colorMode} = useColorMode();

    // definicion de las columnas de la tabla
    const columns: ColumnDef<IPrestamoInstrumento>[] = useMemo<
        ColumnDef<IPrestamoInstrumento>[]
    >(
        () => [
            {id: "id", accessorKey: "_id"},
            {id: "imgScr", accessorKey: "instrumento.urlPic"},
            {id: "instrumentoId", accessorKey: "instrumento._id"},
            {
                id: "index",
                header: "#",
                accessorFn: (_row: any, i: number) => i + 1,
                sortingFn: "basic",
            },
            {
                id: "instrumento.nombre",
                header: "Instrumento",
                accessorKey: "instrumento.nombre",
                cell: ({row}) => {
                    return (
                        <VerInstrumento
                            nombre={row.getValue("instrumento.nombre")}
                            imgScr={row.getValue("imgScr")}
                        />
                    );
                },
            },
            {
                id: "prestatario.name",
                header: () => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            Solicitante
                        </Text>
                    );
                },
                accessorKey: "prestatario.name",
                cell: ({row}) => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("prestatario.name")}
                        </Text>
                    );
                },

            },
            {
                id: "prestamista.name",
                header: () => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            Prestamista
                        </Text>
                    );
                },
                accessorKey: "prestamista.name",
                cell: ({row}) => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            {row.getValue("prestamista.name")}
                        </Text>
                    );
                },
            },
            {
                id: "devuelto",
                header: () => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            ¿Devuelto?
                        </Text>
                    );
                },
                accessorKey: "devuelto",
                cell({row}) {
                    const devuelto: boolean = row.getValue("devuelto");

                    if (devuelto) {
                        return (
                            <Text
                                //  minW={"100%"} textAlign={"center"}
                            >
                                Si
                            </Text>
                        );
                    } else {
                        if (!devuelto) {
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
                }
            },
            {
                id: "fechaInicio",
                header: () => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            Fecha Prestamo
                        </Text>
                    );
                },
                accessorKey: "fechaInicio",
                cell: ({row}) => {
                    if (!row.getValue("fechaInicio")) {
                        return (
                            <Text
                                //  minW={"100%"} textAlign={"center"}
                            >
                                -
                            </Text>
                        );
                    }

                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            {textDate(row.getValue("fechaInicio"))}
                        </Text>
                    );
                },
                sortingFn: "datetime",
            },
            {
                id: "fechaDevolucion",
                header: () => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            Fecha Devolución
                        </Text>
                    );
                },
                accessorKey: "fechaDevolucion",
                cell: ({row}) => {
                    if (!row.getValue("fechaDevolucion")) {
                        return (
                            <Text
                                //  minW={"100%"} textAlign={"center"}
                            >
                                No ha sido devuelto
                            </Text>
                        );
                    }

                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            {textDate(row.getValue("fechaDevolucion"))}
                        </Text>
                    );
                },
                sortingFn: "datetime",
            },
            {
                id: "fechaLimite",
                header: () => {
                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            Fecha Límite
                        </Text>
                    );
                },
                accessorKey: "fechaLimite",
                cell: ({row}) => {
                    if (!row.getValue("fechaLimite")) {
                        return (
                            <Text
                                //  minW={"100%"} textAlign={"center"}
                            >
                                -
                            </Text>
                        );
                    }

                    return (
                        <Text
                            //  minW={"100%"} textAlign={"center"}
                        >
                            {textDate(row.getValue("fechaLimite"))}
                        </Text>
                    );
                },
                sortingFn: "datetime",
            },
            {
                id: "edit",
                enableSorting: false,
                header: () => {
                    if (userAccess) {
                        return (
                            <>
                                <Circle
                                    bg={"#F6AD55"}
                                    size={"1.5em"}
                                    fontSize={"1.2em"}
                                    color={colorMode == "light" ? "#4A5568" : "#2D3748"}
                                    cursor={"default"}
                                >
                                    <MdCreate/>
                                </Circle>
                            </>
                        );
                    }
                },
                cell: ({row}) => {
                    if (userAccess) {
                        return (
                            // <VerDetallesItem itemInventario={row.getValue("id")} />
                            <EditarPrestamo
                                id={row.getValue("id")}
                                instrumento={row.getValue("instrumento.nombre")}
                                prestatario={row.getValue("prestatario.name")}
                                prestamista={row.getValue("prestamista.name")}
                                devuelto={row.getValue("devuelto")}
                                fechaInicio={row.getValue("fechaInicio")}
                                fechaDevolucion={row.getValue("fechaDevolucion")}
                                fechaLimite={row.getValue("fechaLimite")}
                                itemId={row.getValue("instrumentoId")}
                                //comentario={row.getValue("comentario")}
                            />
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
                                    <MdDelete/>
                                </Circle>
                            </>
                        );
                    }
                },
                cell: ({row}) => {
                    if (userAccess) {
                        return (
                            <EliminarPrestamoInstrumento
                                instrumentoId={row.getValue("instrumentoId")}
                                id={row.getValue("id")}
                                devuelto={row.getValue("devuelto")}
                            />
                        );
                    }
                },
            },
        ],
        [colorMode]
    );

    // api react table
    const table = useReactTable({
        data: allPrestamosData,
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
                    <Text textStyle={"titulo"}>Prestamo de Instrumentos</Text>
                    {userAccess ? <NuevoPrestamoInstrumento/> : null}
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
                                                                <MdArrowDropDown/>
                                                            ) : (
                                                                <MdArrowDropUp/>
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
                                    icon={<MdKeyboardDoubleArrowLeft/>}
                                    aria-label="Primera página"
                                    onClick={() => table.setPageIndex(0)}
                                    isDisabled={!table.getCanPreviousPage()}
                                />
                                <IconButton
                                    icon={<MdNavigateBefore/>}
                                    aria-label="Página anterior"
                                    onClick={() => table.previousPage()}
                                    isDisabled={!table.getCanPreviousPage()}
                                />
                                <IconButton
                                    icon={<MdNavigateNext/>}
                                    aria-label="Página siguiente"
                                    onClick={() => table.nextPage()}
                                    isDisabled={!table.getCanNextPage()}
                                />
                                <IconButton
                                    icon={<MdKeyboardDoubleArrowRight/>}
                                    aria-label="Última página"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    isDisabled={!table.getCanNextPage()}
                                />
                            </HStack>
                        </HStack>
                        <HStack display={{base: "none", lg: "flex"}}>
                            <MdHelp size={"20px"}/>
                            <Text minW={"400px"}>
                                Puede ver las fotos dando click en el nombre del Item
                            </Text>
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

  