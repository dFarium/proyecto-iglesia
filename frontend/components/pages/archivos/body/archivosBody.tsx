import { Box, Grid } from "@chakra-ui/react";
import OpcionArchivos from "../widgets/opcionArchivos";
import getRole from "@/utils/roleUtils";
import ArchivosPubBody from "./archivosPubBody";

export default function ArchivosBody() {
    const userAccess = getRole();

    if (userAccess) {
        // Si es directiva hacer....
        return (
            <Box
                w={"full"}
                h={"full"}
                display={"flex"}
                alignItems={"center"}
                overflow={"auto"}
                p={"20px"}
            >
                <Grid
                    templateColumns={{
                        base: "repeat(1,1fr)",
                        lg: "repeat(2,1fr)",
                        xl: "repeat(3,1fr)",
                    }}
                    gap={"40px"}
                    m={"auto"}
                >
                    <OpcionArchivos
                        titulo="Biblioteca Libre"
                        href="/home/archivos/libre"
                        image="buscador.png"
                    />
                    <OpcionArchivos
                        titulo="Biblioteca Pública"
                        href="/home/archivos/publico"
                        image="libro.png"
                    />
                    <OpcionArchivos
                        titulo="Biblioteca Privada"
                        href="/home/archivos/privado"
                        image="libropriv.png"
                    />
                </Grid>
            </Box>
        );
    } else {
        return <ArchivosPubBody />
    }
}
