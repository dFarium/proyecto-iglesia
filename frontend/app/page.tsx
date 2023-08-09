"use client";

import {Box, Button, FormControl, FormLabel, Input, VStack, useColorMode, Text, InputGroup, InputLeftElement, Icon} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
// Installar --> npm install react-icons
import { FaEnvelope as EmailIcon, FaLock as LockIcon, FaUser } from "react-icons/fa";
import { FcConferenceCall } from "react-icons/fc";

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
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        // Guarda el token en el local storage
        localStorage.setItem('auth-token', data.data.token);
        console.log("Token guardado:", data.data.token);
        // Pide el token del local storage(Prueba)
        const token = localStorage.getItem('auth-token');
        console.log("Token recibido:", token);
        router.push("/home");
      } else if (res.status === 401) {
        Swal.fire('', 'Correo incorrecto');
        console.log("Correo inválida");
      } else if (res.status === 400) {
        Swal.fire('', 'Contraseña incorrecta');
        console.log("Contraseña inválida");
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
        <Text textStyle={"titulo"}>Inicio de sesión</Text>
        <Icon as={FcConferenceCall} boxSize="8rem"/>
        <FormControl>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={EmailIcon} />} // Icono de correo
          />
          <Input placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={LockIcon} />} // Icono simbólico de contraseña
            />
            <Input placeholder="*******" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputGroup>
        </FormControl>
        <Button type="submit" style={{backgroundColor: '#005FFF', color: '#FFFFFF'}}>Iniciar sesión</Button>
      </VStack>
    </Box>
  );
}
