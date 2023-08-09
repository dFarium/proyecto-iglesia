import { obtenerGastoTesoreria, obtenerIngresoTesoreria } from '@/data/tesoreria/item';
import { Box, useColorMode, useDisclosure, Text, Grid, GridItem, Flex, useMediaQuery, Center } from '@chakra-ui/react';
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
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

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
    const totalPorce = totalIngreso + totalGasto;

    function formatCLP(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const porcentajeGasto = Math.round((totalGasto * 100) / totalPorce);

    const victoryPie = (
        <VictoryPie
            key={`${totalGasto}-${totalIngreso}`}
            data={[
                { x: "", y: totalGasto, label: `${porcentajeGasto}%` },
                { x: "", y: totalIngreso, label: `${100 - porcentajeGasto}%` },
            ]}
            animate={{
                duration: 2000
            }}
            colorScale={["#F97D08", "#084DF9"]}
            theme={VictoryTheme.material}
        />
    );

    const smallVictoryPie = (
        <VictoryPie
            key={`${totalGasto}-${totalIngreso}`}
            data={[
                { x: "", y: totalGasto, label: `${porcentajeGasto}%` },
                { x: "", y: totalIngreso, label: `${100 - porcentajeGasto}%` },
            ]}
            animate={{
                duration: 2000
            }}
            colorScale={["#F97D08", "#084DF9"]}
            theme={VictoryTheme.material}
            width={isSmallScreen ? 200 : 300}
        />
    );

    return (
        <>
            <Text textAlign={"center"} marginTop={10} fontSize={"4xl"} fontWeight={"bold"}>
                Balance general
            </Text>
            <Grid marginTop={5} w={"100%"} marginEnd={2}>
                <GridItem w='100%' h='10'>
                    <Text marginLeft={5}>Ingreso total: ${formatCLP(totalIngreso)}</Text>
                    <Text marginLeft={5}>Gasto total: ${formatCLP(totalGasto)}</Text>
                    <Text marginLeft={5}>Total: ${formatCLP(totalTotal)}</Text>
                </GridItem>
            </Grid>
            {isSmallScreen ? (
                <Grid marginTop={5} w={"100%"} marginEnd={2}>
                    <Center marginTop={5}>
                        <Grid w="100%" marginEnd={2}>
                                
                        </Grid>
                    </Center>
                </Grid>
            ) : (
                <>
                    <Grid marginTop={5} w={"100%"} marginEnd={2}>
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            {victoryPie}
                        </div>
                        <Grid justifyContent="center" alignContent="center">
                            <Text fontWeight="bold">Leyenda</Text>
                            <Flex align="center" mt={1}>
                                <Box w={4} h={4} bg="#F97D08" mr={2}></Box>
                                <Text>Gastos</Text>
                            </Flex>
                            <Flex align="center" mt={2}>
                                <Box w={4} h={4} bg="#084DF9" mr={2}></Box>
                                <Text>Ingresos</Text>
                            </Flex>
                        </Grid>

                    </Grid>
                </>
            )}
        </>
    )

}


{/* <div style={{ width: '100%', overflowX: 'auto' }}>
                        {smallVictoryPie}
                    </div>
                    <Grid justifyContent="center" alignContent="center">
                        <Text fontWeight="bold">Leyenda</Text>
                        <Flex align="center" mt={1}>
                            <Box w={4} h={4} bg="#F97D08" mr={2}></Box>
                            <Text>Gastos</Text>
                        </Flex>
                        <Flex align="center" mt={2}>
                            <Box w={4} h={4} bg="#084DF9" mr={2}></Box>
                            <Text>Ingresos</Text>
                        </Flex>
                    </Grid> */}


export default GraficosTesoreria;
