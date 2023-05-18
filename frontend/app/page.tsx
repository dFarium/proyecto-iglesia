"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <Box
      bg={colorMode == "light" ? "body.light" : "body.dark"}
      // bgImage={"/background.jpg"}
      color={colorMode == "light" ? "colorFont.light" : "colorFont.dark"}
      display={"flex"}
      width={"100vw"}
      height={"100svh"}
    >
      <VStack
        minW={"30%"}
        margin={"auto"}
        bg={colorMode == "light" ? "container.light" : "container.dark"}
        borderRadius={"25px"}
        p={"50px"}
        spacing={"30px"}
        shadow={"md"}
      >
        <FormControl>
          <FormLabel>Ingrese su RUN</FormLabel>
          <Input />
        </FormControl>
        <Button onClick={() => router.push("/home/inventario")}>
          Ingresar
        </Button>
      </VStack>
    </Box>
  );
}
