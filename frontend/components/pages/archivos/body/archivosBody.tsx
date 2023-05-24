import { Container, Heading, Button, Table, Thead, Tr, Td, Tbody, Box } from "@chakra-ui/react";
import router from "next/router";
import { MdArrowBack } from "react-icons/md";


export default function ArchivosBody() {
    return (
        <Box>
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>
                    Biblioteca de Archivos
                </Heading>
                <Button
                    leftIcon={<MdArrowBack />}
                    colorScheme={"teal"}
                    my={15}
                    mx={15}
                    float={"left"}
                    //onClick={() => router.push("/")}
                >
                    Volver
                </Button>
                <Table my={15} variant="simple">
                    <Thead>
                        <Tr>
                            <Td>Archivo</Td>
                            <Td>Asamblea</Td>
                            <Td>Fecha</Td>
                            <Td>Descargar</Td>
                        </Tr>
                    </Thead>
                </Table>
            </Container>
        </Box>
    );
}
