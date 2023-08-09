"use client";
import { ItemCalendario, obtenerListaCalendario } from '@/data/calendario/item';
import { textDate } from '@/utils/dateUtils';
import { Box, Circle, HStack, Text, VStack, useColorMode } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, SortingState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react'
import { MdDelete } from 'react-icons/md';

export function CalendarioBody() {

  const todoQuery = useQuery({
    queryKey: ["obtenerListaCalendario"],
    queryFn: async () => {
      const data = obtenerListaCalendario();
      return data;
    },
    initialData: [],
  });

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
    <Box w={"100%"} h={"100%"}>
      <VStack w={"100%"} h={"100%"} spacing={"30px"}>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Text> Botón Agregar</Text>
        </HStack>
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
