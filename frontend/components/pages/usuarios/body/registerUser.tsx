"use client";

import {Box, Button, FormControl, FormLabel, Input, VStack, useColorMode, Checkbox, CheckboxGroup} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterUser() {
    const { colorMode } = useColorMode();
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [rut, setRut] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRoles] = useState<string[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('auth-token'); // Recupera el token
            if (!token) {
                console.log('No hay token guardado.');
                return;
            }

            // Construcción condicional del cuerpo de la solicitud
            const requestBody: { name: string; rut: string; email: string; password: string; rol?: string[] } = {
                name,
                rut,
                email,
                password,
            };

            // Si se seleccionó al menos un rol, añade el campo 'rol' al cuerpo de la solicitud
            if (rol.length > 0) {
                requestBody.rol = rol;
            }
            const res = await fetch('http://localhost:3001/api/usuario/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': token
                },
                body: JSON.stringify(requestBody)
            });
            if (!res.ok) {
                console.error('Error al realizar la solicitud:', res.statusText);
                return;
            }

            if (res.status === 200) {
                router.push("/home");
            } else {
                const errorData = await res.json();
                console.log(errorData);
            }
        } catch (error) {
        console.log("Error durante el registro de usuario:", error);
        }
    };

    const handleRolesChange = (values: string[]) => {
        setRoles(values);
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
            <FormControl>
        <FormLabel>Roles</FormLabel>
            <CheckboxGroup colorScheme="green" value={rol} onChange={handleRolesChange}>
            <VStack spacing={3} direction="column">
                <Checkbox value="admin">Admin</Checkbox>
                <Checkbox value="directiva">Directiva</Checkbox>
                <Checkbox value="miembro">Miembro</Checkbox>
            </VStack>
            </CheckboxGroup>
        </FormControl>
            <Button type="submit">Crear cuenta</Button>
        </VStack>
        </Box>
    );
}

export { RegisterUser };
