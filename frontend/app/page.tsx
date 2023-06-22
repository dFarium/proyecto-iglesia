"use client";

import {Box, Button, FormControl, FormLabel, Input, VStack, useColorMode,} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      if (res.status === 200) {
<<<<<<< HEAD
        router.push("/home");
=======
        router.push("/home/");
>>>>>>> 0fe5293d422b40ed66b0dcae8482afac1c547a9c
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log("KE CHUCHA");
      console.log(error);
    }
  };

  return (
    <Box
      bg={colorMode === "light" ? "body.light" : "body.dark"}
      color={colorMode === "light" ? "colorFont.light" : "colorFont.dark"}
      display={"flex"}
      width={"100vw"}
      height={"100vh"}
    >
      <VStack
        as="form"
        onSubmit={handleSubmit}
        minW={"30%"}
        margin={"auto"}
        bg={colorMode === "light" ? "container.light" : "container.dark"}
        borderRadius={"25px"}
        p={"50px"}
        spacing={"30px"}
        shadow={"md"}
      >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" style={{backgroundColor: '#005FFF', color: '#FFFFFF'}}>Iniciar sesión</Button>
        <Button style={{backgroundColor: '#06FF47', color: '#FFFFFF'}} onClick={() => router.push("")}>Crear usuario</Button>
      </VStack>
    </Box>
  );
}
