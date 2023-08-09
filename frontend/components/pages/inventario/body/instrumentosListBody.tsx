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
import EditarItemInventario from "../widgets/editarItem";
import { NuevoInstrumento } from "../widgets/nuevoItem";
import { useMemo, useState } from "react";
import { textDate } from "@/utils/dateUtils";
import {
  IItemInventario,
  getAllItemsInventario,
  getItemsInventarioCategoria,
} from "@/data/inventario/item";
import { useQuery } from "@tanstack/react-query";
import EliminarItemInventario from "../widgets/eliminarItem";
import { VerFotoItem } from "../widgets/verFotoItem";
import jwt, { JwtPayload } from "jsonwebtoken";
import getRole from "@/utils/roleUtils";

export function InventarioInstrumentosBody() {
  //obtener rol
  const userRole = getRole();

  // query todos los instrumentos
  const instrumentosQuery = useQuery({
    queryKey: ["itemsInventarioInstrumentos"],
    queryFn: async () => {
      const data = getItemsInventarioCategoria("Instrumento");
      return data;
    },
    initialData: [],
  });
  const instrumentosData = instrumentosQuery.data;

  const [columnVisibility] = useState({
    id: false,
    index: false,
    cantidad: false,
    categoria: false,
    desc: false,
    ultMant: false,
    cicloMant: false,
    imgScr: false,
    edit: userRole,
    delete: userRole,
    uploader: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const { colorMode } = useColorMode();

  // definicion de las columnas de la tabla
  const columns: ColumnDef<IItemInventario>[] = useMemo<
    ColumnDef<IItemInventario>[]
  >(
    () => [
      { id: "id", accessorKey: "_id" },
      {
        id: "index",
        header: "#",
        accessorFn: (_row: any, i: number) => i + 1,
        sortingFn: "basic",
      },
      { id: "imgScr", accessorKey: "urlPic" },
      { id: "uploader", accessorKey: "uploader" },
      {
        id: "nombre",
        header: "Nombre",
        accessorKey: "nombre",
        cell: ({ row }) => {
          return (
            <VerFotoItem
              nombre={row.getValue("nombre")}
              imgScr={row.getValue("imgScr")}
              uploader={row.getValue("uploader")}
            />
          );
        },
      },
      {
        id: "cantidad",
        header: "Cantidad",
        accessorKey: "cantidad",
        cell: ({ row }) => {
          return (
            <Text
            //  minW={"100%"} textAlign={"center"}
            >
              {row.getValue("cantidad")}
            </Text>
          );
        },
      },
      {
        id: "categoria",
        header: "Categoría",
        accessorKey: "categoria",
        cell: ({ row }) => {
          return (
            <Text
            //  minW={"100%"} textAlign={"center"}
            >
              {row.getValue("categoria")}
            </Text>
          );
        },
      },
      {
        id: "estado",
        header: "Estado",
        accessorKey: "estado",
        cell: ({ row }) => {
          return (
            <Text
            //  minW={"100%"} textAlign={"center"}
            >
              {row.getValue("estado")}
            </Text>
          );
        },
      },
      {
        id: "prestable",
        header: "¿Prestable?",
        accessorKey: "prestable",
        cell({ row }) {
          const prestable: boolean = row.getValue("prestable");

          if (prestable) {
            return (
              <Text
              //  minW={"100%"} textAlign={"center"}
              >
                Si
              </Text>
            );
          } else {
            if (prestable === false) {
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
      {
        id: "createdAt",
        header: "Fecha Ingreso",
        accessorKey: "createdAt",
        cell: ({ row }) => {
          const date = textDate(row.getValue<Date>("createdAt"));
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
        id: "fechaSalida",
        header: "Fecha Salida",
        accessorKey: "fechaSalida",
        cell: ({ row }) => {
          if (!row.getValue("fechaSalida")) {
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
              {textDate(row.getValue("fechaSalida"))}
            </Text>
          );
        },
        sortingFn: "datetime",
      },
      { id: "desc", accessorKey: "desc" },
      { id: "ultMant", accessorKey: "ultMant" },
      { id: "cicloMant", accessorKey: "cicloMant" },
      {
        id: "edit",
        enableSorting: false,
        header: () => {
          return (
            <>
              <Circle
                border={"2px solid"}
                size={"1.5em"}
                fontSize={"1.2em"}
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
                size={"1.5em"}
                fontSize={"1.2em"}
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
              name={row.getValue("nombre")}
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
    data: instrumentosData,
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
          <Text textStyle={"titulo"}>Instrumentos Musicales</Text>
          {userRole ? <NuevoInstrumento /> : null}
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
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
