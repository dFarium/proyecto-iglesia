"use client";

import {Box, Button, FormControl, FormLabel, Input, VStack, useColorMode,} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsuariosBody() {
    const { colorMode } = useColorMode();
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [rut, setRut] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
        const res = await fetch('http://localhost:3001/api/usuario/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        if (res.status === 200) {
            router.push("/home/inventario");
        } else {
            const errorData = await res.json();
            console.log(errorData);
        }
        } catch (error) {
        console.log("error de inicio de sesión");
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
                <FormLabel>Nombre</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Rut</FormLabel>
                <Input value={rut} onChange={(e) => setRut(e.target.value)} />
            </FormControl>
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
            <Button type="submit">Crear cuenta</Button>
        </VStack>
        </Box>
    );
}
