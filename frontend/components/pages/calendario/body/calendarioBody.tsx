"use client";
import { ItemCalendario, obtenerListaCalendario } from '@/data/calendario/item';
import { textDate } from '@/utils/dateUtils';
import { Box, Circle, Flex, HStack, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useColorMode } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp, MdCreate, MdDelete, MdHelp, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import AgregarCalendario from '../widgets/agregarCalendario'
import EliminarCalendario from '../widgets/eliminarCalendario';
import EditarCalendario from '../widgets/editarCalendario';

export function CalendarioBody() {

  const todoQuery = useQuery({
    queryKey: ["obtenerListaCalendario"],
    queryFn: async () => {
      const data = obtenerListaCalendario();
      return data;
    },
    initialData: [],
  });

  console.log(todoQuery)

  const todoData = todoQuery.data;

  const [columnVisibility] = useState({
    id: false,
    nombreAct: true,
    fechaInicio: true,
    fechaTermino: true,
    estadoActividad: true,
    descripcion: true,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const { colorMode } = useColorMode();

  const columns: ColumnDef<ItemCalendario>[] = useMemo<
    ColumnDef<ItemCalendario>[]
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
        id: "nombreAct",
        header: "Nombre",
        accessorKey: "nombreAct",
        cell: ({ row }) => {
          return (
            <Text>
              {row.getValue("nombreAct")}
            </Text>
          )
        },
      },
      {
        id: "fechaInicio",
        header: () => {
          return (
            <Text>
              Fecha
            </Text>
          );
        },
        accessorKey: "fechaInicio",
        cell: ({ row }) => {
          const date = textDate(row.getValue<Date>("fechaInicio"));
          return (
            <Text>
              {date}
            </Text>
          );
        },
      },
      {
        id: "fechaTermino",
        header: () => {
          return (
            <Text>
              Fecha
            </Text>
          );
        },
        accessorKey: "fechaTermino",
        cell: ({ row }) => {
          const date = textDate(row.getValue<Date>("fechaTermino"));
          return (
            <Text>
              {date}
            </Text>
          );
        },
      },
      {
        id: "estadoActividad",
        header: "Estado Actividad",
        accessorKey: "estadoActividad",
        cell: ({ row }) => {
          return (
            <Text>
              {row.getValue("estadoActividad") ? "Activo" : "Inactivo"}
            </Text>
          )
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
        id: "edit",
        enableSorting: false,
        header: () => {
          return (
            <>
              <>
                <Circle
                  //bg={"#F6AD55"}
                  border={"2px solid"}
                  size={"1.5em"}
                  fontSize={"1.2em"}
                  //color={colorMode == "light" ? "#4A5568" : "#2D3748"}
                  cursor={"default"}
                >
                  <MdCreate />
                </Circle>
              </>
            </>
          );
        }, cell: ({ row }) => {
          return (
            <EditarCalendario
              id={row.getValue("id")}
              nombre={row.getValue("nombreAct")}
              fechaInicio={row.getValue("fechaInicio")}
              fechaTermino={row.getValue("fechaTermino")}
              estadoActividad={row.getValue("estadoActividad")}
              descripcion={row.getValue("descripcion")}
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
            <EliminarCalendario
              name={row.getValue("nombreAct")}
              id={row.getValue("id")}
            />
          );
        },
      },
    ],
    [colorMode]
  );

  const table = useReactTable({
    data: todoData,
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
        <Box w={{ base: "100%", md: "100%" }} h={"100%"}>
          <VStack w={"100%"} h={"100%"} spacing={"30px"}>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <Text textStyle={"titulo"}>Listado Actividades</Text>
              <AgregarCalendario />
            </HStack>
            <TableContainer overflowY={"auto"} width={"100%"}>
              <Table variant={"striped"} size={"sm"} colorScheme="stripTable">
                <Thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}>
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
                  {table.getRowModel().rows.map(row => (
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
                    {table.getState().pagination.pageSize * table.getState().pagination.pageIndex + 1}
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
        {/* <Box w={{ base: "100%", md: "30%" }} h={"100%"} marginTop={{ base: "20px", md: "0" }}>

          <HStack alignContent="flex-start" justifyContent="flex-end">
            <AgregarCalendario />
          </HStack>
        </Box> */}
      </Flex>
    </>
  )
}

function showPages(maxRows: number, currentIndex: number, pageSize: number) {
  if (maxRows < pageSize * currentIndex + pageSize) {
    return maxRows;
  } else {
    return pageSize * currentIndex + pageSize;
  }
}
