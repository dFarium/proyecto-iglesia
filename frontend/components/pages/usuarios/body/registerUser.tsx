"use client";

import {Box, Button, FormControl, FormLabel, Input, VStack, HStack, useColorMode, Checkbox, CheckboxGroup, FormErrorMessage} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterUser() {
    const { colorMode } = useColorMode();
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [isValidName, setIsValidName] = useState(true);
    const [nameTouched, setNameTouched] = useState(false);

    const [rut, setRut] = useState("");
    const [isValidRut, setIsValidRut] = useState(true);
    const [rutTouched, setRutTouched] = useState(false);

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailTouched, setEmailTouched] = useState(false);

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [rol, setRoles] = useState<string[]>([]);

    // Estados para menejo de errores
    const [nameError, setNameError] = useState("");
    const [rutError, setRutError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Manejadores de eventos de 'onBlur'
    const handleNameBlur = () => setNameTouched(true);
    const handleRutBlur = () => setRutTouched(true);
    const handleEmailBlur = () => setEmailTouched(true);
    const handlePasswordBlur = () => setPasswordTouched(true);

    // Funciones de manejo de cambio actualizadas para incluir la validación
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if(e.target.value.length < 5){
            setIsValidName(false);
            setNameError("Debe tener 4 o más caracteres");
        }
        else if(e.target.value.length > 255){
            setIsValidName(false);
            setNameError("Debe tener 255 o menos caracteres");
        }
        else{
            setIsValidName(true);
            setNameError("");
        }
    };
    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRut(e.target.value);
        if(e.target.value.length < 9){
            setIsValidRut(false);
            setRutError("Debe tener 8 o más caracteres");
        }
        else if(e.target.value.length > 12){
            setIsValidRut(false);
            setRutError("Debe tener 13 o menos caracteres");
        }
        else{
            setIsValidRut(true);
            setRutError("");
        }
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
        setIsValidEmail(isValid);
        if(!isValid){
            setEmailError("Correo electrónico no válido");
        }
        else{
            setEmailError("");
        }
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if(e.target.value.length < 4){
            setIsValidPassword(false);
            setPasswordError("La contraseña debe tener 4 o más caracteres");
        }
        else if(e.target.value.length > 1024){
            setIsValidPassword(false);
            setPasswordError("La contraseña no puede tener más de 1024 caracteres");
        }
        else{
            setIsValidPassword(true);
            setPasswordError("");
        }
    };
    
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
        //bg={colorMode === "light" ? "body.light" : "body.dark"}
        color={colorMode === "light" ? "colorFont.light" : "colorFont.dark"}
        display={"flex"}
        //width={"100vw"}
        //height={"100vh"}
        >
        <VStack
            as="form"
            onSubmit={handleSubmit}
            minW={"30%"}
            margin={"auto"}
            bg={colorMode === "light" ? "container.light" : "container.dark"}
            borderRadius={"25px"}
            p={"50px"}
            spacing={"10px"}
            shadow={"md"}
        >
            <FormControl isInvalid={!isValidName && nameTouched}>
                <FormLabel>Nombre</FormLabel>
                <Input value={name} onChange={handleNameChange} onBlur={handleNameBlur} />
                {!isValidName && nameTouched && (
                    <FormErrorMessage>{nameError}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={!isValidRut && rutTouched}>
                <FormLabel>Rut</FormLabel>
                <Input value={rut} onChange={handleRutChange} onBlur={handleRutBlur} />
                {!isValidRut && rutTouched && (
                    <FormErrorMessage>{rutError}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={!isValidEmail && emailTouched}>
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
                {!isValidEmail && emailTouched && (
                    <FormErrorMessage>{emailError}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={!isValidPassword && passwordTouched}>
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} />
                {!isValidPassword && passwordTouched && (
                    <FormErrorMessage>{passwordError}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl>
        <FormLabel>Roles</FormLabel>
            <CheckboxGroup colorScheme="green" value={rol} onChange={handleRolesChange}>
            <HStack spacing={3}>
                <Checkbox value="admin">Admin</Checkbox>
                <Checkbox value="directiva">Directiva</Checkbox>
                <Checkbox value="miembro">Miembro</Checkbox>
            </HStack>
            </CheckboxGroup>
        </FormControl>
            <Button type="submit">Crear cuenta</Button>
        </VStack>
        </Box>
    );
}

export { RegisterUser };
