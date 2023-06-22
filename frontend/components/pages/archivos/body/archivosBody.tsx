import { IItemInventario } from "@/data/inventario/item";
import { textDate } from "@/utils/dateUtils";
import {
    Container,
    TableContainer,
    Heading,
    Button,
    Table,
    Thead,
    Tr,
    Td,
    Tbody,
    Box,
    HStack,
    Text,
    IconButton,
    Icon,
    Circle,
    Th,
} from "@chakra-ui/react";
import { ColumnDef, useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { MdArrowBack, MdArrowDropDown, MdArrowDropUp, MdCreate, MdDelete, MdUploadFile } from "react-icons/md";
import EditarItemInventario from "../../inventario/widgets/editarItem";
import EliminarItemInventario from "../../inventario/widgets/eliminarItem";
import { IArchivos } from "@/data/archivos/archivos";

export default function ArchivosBody() {
    // definicion de las columnas de la tabla
    const columns = useMemo<ColumnDef<IArchivos>[]>(
        () => [
            { id: "id", accessorKey: "_id" },
            {
                id: "name",
                header: "Nombre",
                accessorKey: "name",
                cell: (info) => info.getValue(),
            },
            {
                id: "cantidad",
                header: () => {
                    return (
                        <Text minW={"100%"} textAlign={"center"}>
                            Cantidad
                        </Text>
                    );
                },
                accessorKey: "cantidad",
                cell: ({ row }) => {
                    return (
                        <Text textAlign={"center"} minW={"100%"}>
                            {row.getValue("cantidad")}
                        </Text>
                    );
                },
            },
            {
                id: "category",
                header: () => {
                    return (
                        <Text minW={"100%"} textAlign={"center"}>
                            Categoría
                        </Text>
                    );
                },
                accessorKey: "categoria",
                cell: ({ row }) => {
                    return (
                        <Text textAlign={"center"} minW={"100%"}>
                            {row.getValue("category")}
                        </Text>
                    );
                },
            },
            {
                id: "state",
                header: () => {
                    return (
                        <Text minW={"100%"} textAlign={"center"}>
                            Estado
                        </Text>
                    );
                },
                accessorKey: "state",
                cell: ({ row }) => {
                    return (
                        <Text textAlign={"center"} minW={"100%"}>
                            {row.getValue("state")}
                        </Text>
                    );
                },
            },
            {
                id: "createdAt",
                header: () => {
                    return (
                        <Text textAlign={"center"} minW={"100%"}>
                            Fecha de Ingreso
                        </Text>
                    );
                },
                accessorKey: "createdAt",
                cell: ({ row }) => {
                    const date = textDate(row.getValue<Date>("createdAt"));
                    return (
                        <Text minW={"100%"} textAlign={"center"}>
                            {date}
                        </Text>
                    );
                },
                sortingFn: "datetime",
            },
            {
                id: "outDate",
                header: () => {
                    return (
                        <Text minW={"100%"} textAlign={"center"}>
                            Fecha de Salida
                        </Text>
                    );
                },
                accessorKey: "outDate",
                cell: ({ row }) => {
                    if (!row.getValue("outDate")) {
                        return (
                            <Text minW={"100%"} textAlign={"center"}>
                                -
                            </Text>
                        );
                    }

                    return (
                        <Text minW={"100%"} textAlign={"center"}>
                            {textDate(row.getValue("outDate"))}
                        </Text>
                    );
                },
                sortingFn: "datetime",
            },
            { id: "desc", accessorKey: "desc" },
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
                                color={
                                    colorMode == "light" ? "#4A5568" : "#2D3748"
                                }
                                cursor={"default"}
                            >
                                <MdCreate />
                            </Circle>
                        </>
                    );
                },
                cell: ({ row }) => {
                    return (
                        <EditarItemInventario
                            id={row.getValue("id")}
                            item={row.getValue("name")}
                            cantidad={row.getValue("cantidad")}
                            state={row.getValue("state")}
                            category={row.getValue("category")}
                            outDate={row.getValue("outDate")}
                            desc={row.getValue("desc")}
                        />
                    );
                },
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
                cell: ({ row }) => {
                    return (
                        <EliminarItemInventario
                            name={row.getValue("name")}
                            id={row.getValue("id")}
                        />
                    );
                },
            },
        ],
        [colorMode]
    );

    // api react table
    const table = useReactTable({
        data: allItemsData,
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
        <Box>
            <HStack justifyContent={"space-between"} w={"100%"}>
                <Text textStyle={"titulo"} ml={"3.5"}>
                    Biblioteca de Archivos
                </Text>
                {/* <NuevoItemInventario /> */}
                <Button
                    as={IconButton}
                    icon={<MdUploadFile size={30} />}
                    // colorScheme={""}
                    // my={15}
                    // mx={15}
                    float={"right"}
                    //onClick={() => router.push("/")}
                ></Button>
            </HStack>
            {/* <Heading textAlign={"center"} my={15}>
                    Biblioteca de Archivos
                </Heading> */}
            {/* <Table my={15} variant="simple">
                <Thead>
                    <Tr>
                        <Td>Archivo</Td>
                        <Td>Asamblea</Td>
                        <Td>Fecha</Td>
                        <Td>Descargar</Td>
                    </Tr>
                </Thead>
            </Table> */}
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
                                                cursor={"pointer"}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                <Box fontSize={"1.5em"}>
                                                    {header.column.getIsSorted() ? (
                                                        header.column.getIsSorted() ===
                                                        "desc" ? (
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
        </Box>
    );
}
