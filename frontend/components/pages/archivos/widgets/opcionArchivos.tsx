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

function OpcionArchivos(props: { titulo: string; href: string; image: string }) {
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

export default OpcionArchivos;