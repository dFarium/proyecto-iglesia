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
    >
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(3,1fr)",
        }}
        h={"80%"}
        gap={"25px"}
        w={"full"}
      >
        <Categoria
          titulo="Instrumentos"
          href="/home/inventario/instrumentos"
          image="instrumentos.webp"
        />
        <Categoria
          titulo="Equipo Electrónico"
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
  const borderDark = "3px white solid";
  const borderLight = "3px grey solid";
  return (
    <Link as={NextLink} href={props.href} pos={"relative"}>
      <VStack
        h={"100%"}
        // bg={"#ffc361"}
        minH={"400px"}
        borderRadius={"25px"}
        // bgImage={`/${props.image}`}
        // backgroundSize={"cover"}
        // backgroundRepeat={"no-repeat"}
        // backgroundPosition={"bottom"}
        border={colorMode == "light" ? borderLight : borderDark}
        overflow={"hidden"}
        fontSize={"2em"}
        _hover={{ fontSize: "2.2em" }}
        transition={"1s"}
      >
        <Box
          // bg={"red"}
          w={"100%"}
          h={"100%"}
          transition={"0.5s"}
          bgImage={`/${props.image}`}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"bottom"}
          _hover={{ transform: "scale(1.1)" }}
        ></Box>
        <Flex
          borderBottomRadius={"25px"}
          bg="rgb(0,0,0,0.75)"
          w={"100%"}
          h={"20%"}
          bottom={"0px"}
          pos={"absolute"}
          align={"center"}
          justify={"center"}
          // fontSize={"2em"}
          color={"white"}
          borderBlockEnd={colorMode == "light" ? borderLight : borderDark}
          borderInline={colorMode == "light" ? borderLight : borderDark}
        >
          {props.titulo}
        </Flex>
      </VStack>
    </Link>
  );
}
