"use client";
import React, { useEffect } from 'react'
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
  Grid,
  Flex,
  Container,
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
import { useQuery } from "@tanstack/react-query";
import { ItemTesoreria, obtenerTodoTesoreria } from '@/data/tesoreria/item';
import EditarTesoreria from '../widgets/editarTesoreria';
import EliminarTesoreria from '../widgets/eliminarTesoreria';
import { NuevoGastoIngresoTesoreria } from '../widgets/nuevoTesoreria';
import GraficosTesoreria from '../widgets/graficosTesoreria';


export function TotalListBody() {

  const totalQuery = useQuery({
    queryKey: ["obtenerTodoTesoreria"],
    queryFn: async () => {
      const data = obtenerTodoTesoreria();
      return data;
    },
    initialData: [],
  });

  const totalData = totalQuery.data;

  const datosXLSX: {
    nombre: string;
    monto: number;
    fecha: Date;
  } = {
    nombre: totalData.nombre,
    monto: totalData.valorCaja,
    fecha: totalData.fechaGasto,
  };

  const [columnVisibility] = useState({
    id: false,
    index: true,
    nombre: true,
    valorCaja: true,
    fechaGasto: true,
    descripcion: false,
    tipo: true,
    boleta: false
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const { colorMode } = useColorMode();

  function formatCLP(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const columns: ColumnDef<ItemTesoreria>[] = useMemo<
    ColumnDef<ItemTesoreria>[]
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
        id: "nombre",
        header: "Nombre",
        accessorKey: "nombre",
        cell: ({ row }) => {
          return (
            <Text>
              {row.getValue("nombre")}
            </Text>
          )
        },
      },
      {
        id: "valorCaja",
        header: () => {
          return (
            <Text
            //  minW={"100%"} textAlign={"center"}
            >
              Monto
            </Text>
          );
        },
        accessorKey: "valorCaja",
        cell: ({ row }) => {
          return (
            <Text
            //  minW={"100%"} textAlign={"center"}
            >
              ${formatCLP(row.getValue("valorCaja"))}
            </Text>
          );
        },
      },
      {
        id: "fechaGasto",
        header: () => {
          return (
            <Text
            >
              Fecha
            </Text>
          );
        },
        accessorKey: "fechaGasto",
        cell: ({ row }) => {
          const date = textDate(row.getValue<Date>("fechaGasto"));
          return (
            <Text
            >
              {date}
            </Text>
          );
        },
      },
      {
        id: 'descripcion',
        header: 'Descripción',
        accessorKey: "descripcion",
        cell: ({ row }) => {
          return (
            <Text>
              {row.getValue("descripcion")}
            </Text>
          )
        }
      },
      {
        id: "tipo",
        header: "Tipo",
        accessorKey: "tipo",
        cell: ({ row }) => {
          return (
            <Text>
              {row.getValue("tipo")}
            </Text>
          )
        },
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
        cell: ({ row }) => {
          return (
            <EditarTesoreria
              id={row.getValue("id")}
              nombre={row.getValue("nombre")}
              valorCaja={row.getValue("valorCaja")}
              tipo={row.getValue("tipo")}
              descripcion={row.getValue("descripcion")}
              fechaGasto={row.getValue("fechaGasto")}
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
                    ? "tesoreriaDeleteItem.light"
                    : "tesoreriaDeleteItem.dark"
                }
                size={"1.5em"}
                fontSize={"1.2em"}
                color={
                  colorMode == "light"
                    ? "tesoreriaDeleteItem.light"
                    : "tesoreriaDeleteItem.dark"
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
            <EliminarTesoreria
              name={row.getValue("nombre")}
              id={row.getValue("id")}
            />
          );
        },
      },
    ],
    [colorMode]
  );

  const table = useReactTable({
    data: totalData,
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

    <>
      <Flex w={"100%"} h={"100%"} direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "70%" }} h={"100%"}>
          <VStack w={"100%"} h={"100%"} spacing={"30px"}>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <Text textStyle={"titulo"}>Total</Text>
              {/* <NuevoGastoIngresoTesoreria /> */}
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
                  <Text minW={"400px"}>
                    Puede ver la descripción y archivos adjuntos dando click en el nombre del Item.
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </VStack>
        </Box>
        <Box w={{ base: "100%", md: "30%" }} h={"100%"} marginTop={{ base: "20px", md: "0" }}>

          <HStack alignContent="flex-start" justifyContent="flex-end">
            <NuevoGastoIngresoTesoreria />
          </HStack>
          <GraficosTesoreria />
        </Box>
      </Flex>
    </>

  );

}
function showPages(maxRows: number, currentIndex: number, pageSize: number) {
  if (maxRows < pageSize * currentIndex + pageSize) {
    return maxRows;
  } else {
    return pageSize * currentIndex + pageSize;
  }
}


/*

       {
        id: "edit",
        enableSorting: false,
        header: () => {
          return (
            <>
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
            </>
          );
        },
        cell: ({ row }) => {
          return (
            <EditarTesoreria
              id={row.getValue("id")}
              nombre={row.getValue("nombre")}
              valorCaja={row.getValue("valorCaja")}
              tipo={row.getValue("tipo")}
              descripcion={row.getValue("descripcion")}
              fechaGasto={row.getValue("fechaGasto")}

            />
          );
        },
      },     


*/