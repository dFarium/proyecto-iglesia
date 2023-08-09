import { obtenerGastoTesoreria, obtenerIngresoTesoreria } from '@/data/tesoreria/item';
import { Box, useColorMode, useDisclosure, Text, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryLine, VictoryPie, VictoryTheme } from 'victory';
import { useQuery, useMutation } from "@tanstack/react-query";

interface IngresoDataItem {
    valorCaja: number;
}

interface GastoDataItem {
    valorCaja: number;
}

const GraficosTesoreria = () => {
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode();

    const ingresoQuery = useQuery({
        queryKey: ["obtenerIngresoTesoreria"],
        queryFn: async () => {
            const data = obtenerIngresoTesoreria();
            return data;
        },
        initialData: [],
    });

    const [ingresoData, setIngresoData] = useState<IngresoDataItem[]>([]);

    useEffect(() => {
        setIngresoData(ingresoQuery.data);
    }, [ingresoQuery.data]);

    const gastoQuery = useQuery({
        queryKey: ["obtenerGastoTesoreria"],
        queryFn: async () => {
            const data = obtenerGastoTesoreria();
            return data;
        },
        initialData: [],
    });

    const [gastoData, setGastoData] = useState<GastoDataItem[]>([]);

    useEffect(() => {
        setGastoData(gastoQuery.data);
    }, [gastoQuery.data]);

    const totalGasto = gastoData.reduce((acumulador: number, item: GastoDataItem) => {
        return acumulador + item.valorCaja;
    }, 0);

    const totalIngreso = ingresoData.reduce((acumulador: number, item: IngresoDataItem) => {
        return acumulador + item.valorCaja;
    }, 0);

    const totalTotal = totalIngreso - totalGasto;

    function formatCLP(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            <Text
                textAlign={"center"}
                marginTop={10}
                fontSize={"4xl"}
                fontWeight={"bold"}
            >Balance general</Text>
            <Grid marginTop={5} w={"100%"} marginEnd={2} >
                <GridItem w='100%' h='10'>
                    <Text marginLeft={5}>Ingreso total: ${formatCLP(totalIngreso)}</Text>
                    <Text marginLeft={5}>Gasto total: ${formatCLP(totalGasto)}</Text>
                    <Text marginLeft={5}>Total: ${formatCLP(totalTotal)}</Text>
                </GridItem>
            </Grid>
            <Grid marginTop={10} marginLeft={5}>
                <VictoryPie
                    key={`${totalGasto}-${totalIngreso}`}
                    data={[
                        { x: "Gastos", y: totalGasto, label: `${Math.round((totalGasto / (totalGasto + totalIngreso)) * 100)}%` },
                        { x: "Ingresos", y: totalIngreso, label: `${Math.round((totalIngreso / (totalGasto + totalIngreso)) * 100)}%` },
                    ]}
                    animate={{
                        duration: 2500
                    }}
                    colorScale={["#F97D08", "#084DF9"]}
                    theme={VictoryTheme.material}
                />
            </Grid>
            <Grid alignContent={"left"}>
                <VictoryLegend x={125} y={50}
                    centerTitle
                    orientation="horizontal"
                    gutter={20}
                    data={[
                        { name: "Ingresos", symbol: { fill: "#084DF9" } },
                        { name: "Gastos", symbol: { fill: "#F97D08" } },
                    ]}
                />
            </Grid>
        </>
    )
}

export default GraficosTesoreria;
