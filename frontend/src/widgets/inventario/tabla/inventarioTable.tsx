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

import { MOCK_DATA } from "../../../mockdata/MOCK_DATA";

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
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import EditarItemInventario from "../alertas/editarItem";
import NuevoItemInventario from "../alertas/nuevoItem";
import { useMemo, useState } from "react";
import { epochToDate, textDate } from "../../utils/dateUtils";

export interface Item {
  id: number;
  name: string;
  category: string;
  state: string;
  inDate: string;
  outDate: string;
  desc: string;
}

export function InventarioTable() {
  const [data, setData] = useState(() => [...MOCK_DATA]);
  const [columnVisibility, setColumnVisibility] = useState({
    // id: false,
    desc: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const { colorMode } = useColorMode();

  // definicion de las columnas de la tabla
  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      { id: "id", accessorKey: "id" },
      {
        id: "name",
        header: "Nombre",
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        id: "category",
        header: "Categoría",
        accessorKey: "category",
        cell: (info) => info.getValue(),
      },
      {
        id: "state",
        header: "Estado",
        accessorKey: "state",
        cell: (info) => info.getValue(),
      },
      {
        id: "inDate",
        header: () => {
          return (
            <Text textAlign={"center"} minW={"100%"}>
              Fecha de Ingreso
            </Text>
          );
        },
        accessorKey: "inDate",
        cell: ({ row }) => {
          let date = epochToDate(row.getValue("inDate"));
          return (
            <Text minW={"100%"} textAlign={"center"}>
              {textDate(date)}
            </Text>
          );
        },
        sortingFn: "basic",
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
          let date = epochToDate(row.getValue("outDate"));
          return (
            <Text minW={"100%"} textAlign={"center"}>
              {textDate(date)}
            </Text>
          );
        },
        sortingFn: "basic",
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
              item={row.getValue("name")}
              category={row.getValue("category")}
              outDate={row.getValue("outDate")}
              desc={row.getValue("desc")}
            />
          );
        },
      },
    ],
    []
  );

  // api react table
  const table = useReactTable({
    data,
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
          <Text fontWeight={"bold"} fontSize={{ base: "2.7em", md: "3em" }}>
            Inventario
          </Text>
          <NuevoItemInventario />
        </HStack>
        <TableContainer overflowY={"auto"} width={"100%"}>
          <Table variant={"striped"} size={"sm"}>
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
                        // bg={"red"}
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
        <VStack
          flexGrow={1}
          minH={"50px"}
          // bg={"red"}
          w={"100%"}
          justifyContent={"end"}
        >
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
