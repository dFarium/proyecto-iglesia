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
      const data = await res.json();
      if (res.status === 200) {
        // Guarda el token en el local storage
        localStorage.setItem('auth-token', data.data.token);
        console.log("Token guardado:", data.data.token);
        // Pide el token del local storage(Prueba)
        const token = localStorage.getItem('auth-token');
        console.log("Token recibido:", token);
        router.push("/home");
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
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
      </VStack>
    </Box>
  );
}
