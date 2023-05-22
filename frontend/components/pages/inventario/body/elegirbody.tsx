import {
  Box,
  Flex,
  Grid,
  HStack,
  Link,
  Stack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { use } from "react";

export function ElegirBody() {
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
        <Categoria
          titulo="Instrumentos"
          href="/home/inventario/instrumentos"
          image="instrumentos.webp"
        />
        <Categoria
          titulo="Equipos Electrónicos"
          href="/home/inventario/equipos"
          image="equipos.png"
        />
        <Categoria
          titulo="Inventario Total"
          href="/home/inventario/total"
          image="varios.webp"
        />
      </Grid>
    </Box>
  );
}

function Categoria(props: { titulo: string; href: string; image: string }) {
  const { colorMode } = useColorMode();
  const outlineDark = "2px white solid";
  const outlineLight = "2px grey solid";
  const borderRadius = "10px";
  return (
    <Link as={NextLink} href={props.href} pos={"relative"}>
      <Box
        h={"450px"}
        w={"320px"}
        borderRadius={borderRadius}
        outline={colorMode == "light" ? outlineLight : outlineDark}
        overflow={"hidden"}
        fontSize={"1.5em"}
        _hover={{ transform: "scale(1.03)" }}
        transition={"0.5s"}
      >
        <Box
          bgImage={`/${props.image}`}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"bottom"}
          h={"100%"}
          w={"100%"}
          _hover={{ transform: "scale(1.05)" }}
          transition={"0.5s"}
        ></Box>
        <Flex
          borderBottomRadius={borderRadius}
          bg="rgb(0,0,0,0.75)"
          w={"100%"}
          h={"20%"}
          bottom={"0px"}
          pos={"absolute"}
          align={"center"}
          justify={"center"}
          // fontSize={"2em"}
          color={"white"}
        >
          {props.titulo}
        </Flex>
      </Box>
    </Link>
  );
}
