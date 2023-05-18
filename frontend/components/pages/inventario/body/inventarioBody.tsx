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
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import EditarItemInventario from "../widgets/editarItem";
import NuevoItemInventario from "../widgets/nuevoItem";
import { useMemo, useState } from "react";
import { textDate } from "@/utils/dateUtils";
import { IItemInventario, getAllItemsInventario } from "@/data/inventario/item";
import { useQuery } from "@tanstack/react-query";
import EliminarItemInventario from "../widgets/eliminarItem";

export function InventarioBody() {
  // query todos los items
  const allItemsQuery = useQuery({
    queryKey: ["itemsInventario"],
    queryFn: getAllItemsInventario,
    initialData: [],
  });
  const allItemsData = allItemsQuery.data;

  const [columnVisibility] = useState({
    id: false,
    desc: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const { colorMode } = useColorMode();

  // definicion de las columnas de la tabla
  const columns = useMemo<ColumnDef<IItemInventario>[]>(
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
                color={colorMode == "light" ? "#4A5568" : "#2D3748"}
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
    <Box w={"100%"} h={"100%"}>
      <VStack w={"100%"} h={"100%"} spacing={"30px"}>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Text textStyle={"titulo"}>Inventario</Text>
          <NuevoItemInventario />
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
          <HStack w={"100%"} overflowX={"auto"}>
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
