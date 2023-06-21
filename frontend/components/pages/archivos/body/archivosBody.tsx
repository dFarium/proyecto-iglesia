import { Box, Grid } from "@chakra-ui/react";
import OpcionArchivos from "../widgets/opcionArchivos";

export default function ArchivosBody() {
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
                    titulo="Favoritos"
                    href="/home/inventario/instrumentos"
                    image="star.png"
                />
                <OpcionArchivos
                    titulo="Biblioteca Pública"
                    href="/home/inventario/equipos"
                    image="libro.png"
                />
                <OpcionArchivos
                    titulo="Biblioteca Privada"
                    href="/home/inventario/total"
                    image="varios.webp"
                />
            </Grid>
        </Box>
    );
}
