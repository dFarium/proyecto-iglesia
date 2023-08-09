"use client";

import {Box, Button, Text, FormControl, FormLabel, Input, VStack, HStack, useColorMode, Checkbox,
    CheckboxGroup, FormErrorMessage, InputGroup, InputLeftAddon, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2';

function formatRUT(rut: string): string {
    const cleanRut = rut.replace(/[^0-9kK]/g, '');  
    let body = cleanRut.slice(0, -1);  
    const dv = cleanRut.slice(-1);  
    body = body.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})$/, '$1.$2.$3');
    return `${body}-${dv}`;
}

function RegisterUserBody() {

    const { colorMode } = useColorMode();
    const router = useRouter();

    const [name, setName] = useState("");
    const [isValidName, setIsValidName] = useState(true);
    const [nameTouched, setNameTouched] = useState(false);

    const [rut, setRut] = useState("");
    const [isValidRut, setIsValidRut] = useState(true);
    const [rutTouched, setRutTouched] = useState(false);

    const [fechaNacimiento, setFechaNacimiento] = useState<Date>();

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailTouched, setEmailTouched] = useState(false);

    const [telefono, setTelefono] = useState("");
    const [isValidTelefono, setIsValidTelefono] = useState(true);
    const [telefonoTouched, setTelefonoTouched] = useState(false);

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [direccion, setDireccion] = useState("");

    const [num_emergencia, setNumEmergencia] = useState("");
    const [isValidNumEmer, setIsValidNumEmer] = useState(true);
    const [numEmerTouched, setNumEmerTouched] = useState(false);

    const [RRSS, setRRSS] = useState("");

    const [rol, setRoles] = useState<string[]>([]);

    // Estados para menejo de errores
    const [nameError, setNameError] = useState("");
    const [rutError, setRutError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [telefonoError, setTelefonoError ] = useState("");
    const [numEmerError, setNumEmerError ] = useState("");

    // Manejadores de eventos de 'onBlur'
    const handleNameBlur = () => setNameTouched(true);
    const handleRutBlur = () => {
        const re = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
        if (!re.test(rut)) {
            setIsValidRut(false);
            setRutError("El formato debe ser xx.xxx.xxx-x");
            return;
        }
        setRutTouched(true);
    };
    const handleEmailBlur = () => setEmailTouched(true);
    const handlePasswordBlur = () => setPasswordTouched(true);
    const handleTelefonoBlur = () => setTelefonoTouched(true);
    const handleNumEmerBlur = () => setNumEmerTouched(true);

    // Funciones de manejo de cambio actualizadas para incluir la validación
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Permitir solo caracteres de la A a la Z, tanto en mayúsculas como en minúsculas.
        const re = /^[a-zA-Z\s]*$/;
        if (!re.test(e.target.value)) {
            return;
        }
        setName(e.target.value);
        if(e.target.value.length < 4){
            setIsValidName(false);
            setNameError("Debe tener 4 o más caracteres");
        } else if(e.target.value.length > 255){
            setIsValidName(false);
            setNameError("Debe tener 255 o menos caracteres");
        }
        else{
            setIsValidName(true);
            setNameError("");
        }
    };

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedRUT = formatRUT(e.target.value);
        setRut(formattedRUT);
        if(e.target.value.length < 12){
            setIsValidRut(false);
            setRutError("Debe tener 9 digitos");
        } else{
            setIsValidRut(true);
            setRutError("");
        }
    };

    const handleFechaNacimientoChange = (e: any) => {
        const d = new Date(e.target.value);
        const date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        setFechaNacimiento(date);
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
        setIsValidEmail(isValid);
        if(!isValid){
            setEmailError("Debe tener el formato email@email.com");
        }
        else{
            setEmailError("");
        }
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if(e.target.value.length < 5){
            setIsValidPassword(false);
            setPasswordError("Debe tener más de 4 caracteres");
        }
        else if(e.target.value.length > 1024){
            setIsValidPassword(false);
            setPasswordError("No puede tener más de 1024 caracteres");
        }
        else{
            setIsValidPassword(true);
            setPasswordError("");
        }
    };
    
    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefono(e.target.value);
        if(e.target.value.length < 9){
            setIsValidTelefono(false);
            setTelefonoError("Debe tener 9 números");
        } else{
            setIsValidTelefono(true);
            setTelefonoError("");
        }
    };

    const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDireccion(e.target.value);
    };

    const handleNumEmergenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumEmergencia(e.target.value);
        if(e.target.value.length < 9){
            setIsValidNumEmer(false);
            setNumEmerError("Debe tener 9 números");
        } else{
            setIsValidNumEmer(true);
            setNumEmerError("");
        }
    };

    const handleRRSSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRRSS(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        console.log(email);
        console.log(name)
        console.log(password);
        event.preventDefault();
        try {
            const token = localStorage.getItem('auth-token'); // Recupera el token
            if (!token) {
                console.log('No hay token guardado.');
                return;
            }

            // Construcción condicional del cuerpo de la solicitud
            const requestBody: { name: string; rut: string; fecha_nacimiento?: string; email: string; password: string; rol?: string[]; telefono?: string;
            direccion?: string; num_emergencia?: string; RRSS?: string, estado?: string; archivos?: string } = {
                name,
                rut,
                email,
                password,
            };

            // startsWith('+56') verifica si el número ya comienza con el prefijo +56.
            // Si ya tiene el prefijo, no se modifica, pero si no lo tiene, se concatena.
            if (telefono) { requestBody.telefono = telefono }

            if (direccion) { requestBody.direccion = direccion }

            if (num_emergencia) { requestBody.num_emergencia = num_emergencia }

            if (RRSS) { requestBody.RRSS = RRSS }

            if (fechaNacimiento) {
                requestBody.fecha_nacimiento = fechaNacimiento.toISOString();
            }

            // Si se seleccionó al menos un rol, añade el campo 'rol' al cuerpo de la solicitud
            if (rol.length > 0) {
                requestBody.rol = rol;
            }
            const res = await fetch(`${process.env.API_URL}/usuario/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': token
                },
                body: JSON.stringify(requestBody)
            });
            if (res.status === 200) {
                Swal.fire({
                    title: 'Usuario Creado',
                    text: 'El usuario ha sido creado con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    router.push("/home/usuarios/getUsuarios");
                }, 2500);
                setName("");
                setRut("");
                setEmail("");
                setPassword("");
                setTelefono("");
                setDireccion("");
                setNumEmergencia("");
                setRRSS("");
                setRoles([]);
                setFechaNacimiento(undefined);
            } else if(res.status === 400){
                const errorData = await res.json();
                console.log("ERROR 400", errorData)
                if (errorData.message === 'RUT ya registrado') {
                    setIsValidRut(false);
                    setRutError('RUT en uso');
                } else if (errorData.message === 'Email ya registrado') {
                    setIsValidEmail(false);
                    setEmailError('Correo en uso');
                } else if (errorData.message === 'Teléfono ya registrado') {
                    setIsValidTelefono(false);
                    setTelefonoError('Teléfono en uso');
                } else {
                    console.log(errorData);
                }
            }
        } catch (error) {
        console.log("Error durante el registro de usuario:", error);
        }
    };

    const handleRolesChange = (values: string[]) => {
        setRoles(values);
    };

    // Constante usada para establecer el calendario hasta la fecha actual.
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <Box
        color={colorMode === "light" ? "colorFont.light" : "colorFont.dark"}
        display={"flex"}
        >
            <VStack
                minW={"30%"}
                maxH={"90vh"}
                margin={"auto"}
                bg={colorMode === "light" ? "container.light" : "container.dark"}
                borderRadius={"10px"}
                p={"40px"}
                boxShadow="0 0 10px 2px #88AAFF">
                <VStack>
                    <Text textStyle={"titulo"}>Registro de usuario</Text>
                </VStack>
                <VStack
                as="form"
                onSubmit={handleSubmit}
                overflowY="auto"
                p={"40px"}
                margin={"auto"}
                >
                    <FormControl isInvalid={!isValidName && nameTouched}>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Nombre y Apellido' value={name} onChange={handleNameChange} onBlur={handleNameBlur} required minLength={4} maxLength={255}/>
                        {!isValidName && nameTouched && (
                            <FormErrorMessage>{nameError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={!isValidRut && rutTouched}>
                        <FormLabel>Rut</FormLabel>
                        <Input placeholder='xx.xxx.xxx-x' value={rut} onChange={handleRutChange} onBlur={handleRutBlur} required minLength={9} maxLength={12}/>
                        {!isValidRut && rutTouched && (
                            <FormErrorMessage>{rutError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={"25px"}>
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <Input type="date" max={currentDate} value={fechaNacimiento ? fechaNacimiento.toISOString().split('T')[0] : ''} onChange={handleFechaNacimientoChange} required />
                    </FormControl>
                    <FormControl isInvalid={!isValidEmail && emailTouched}>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='email@gmail.com' value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
                        {!isValidEmail && emailTouched && (
                            <FormErrorMessage>{emailError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={!isValidPassword && passwordTouched}>
                        <FormLabel>Contraseña</FormLabel>
                        <Input placeholder='*****' type="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} required/>
                        {!isValidPassword && passwordTouched && (
                            <FormErrorMessage>{passwordError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={!isValidTelefono && telefonoTouched}>
                        <FormLabel>Teléfono</FormLabel>
                        <InputGroup>
                            <InputLeftAddon p={2}>
                                +56
                            </InputLeftAddon>
                            <Input
                            onChange={handleTelefonoChange}
                            onBlur={handleTelefonoBlur}
                            minLength={9}
                            maxLength={9}
                            pl={"10px"}  // Un padding izquierdo para que no se superponga con el prefijo.
                            placeholder="9xxxxxxxx"
                            value={telefono}
                            />
                        </InputGroup>
                        {!isValidTelefono && telefonoTouched && (
                            <FormErrorMessage>{telefonoError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Dirección</FormLabel>
                        <Input placeholder="Calle N°" value={direccion} onChange={handleDireccionChange} />
                    </FormControl>
                    <FormControl isInvalid={!isValidNumEmer && numEmerTouched}>
                        <FormLabel>Numero de emergencia</FormLabel>
                        <InputGroup
                        onChange={handleNumEmergenciaChange}
                        onBlur={handleNumEmerBlur}>
                            <InputLeftAddon p={2}>
                                +56
                            </InputLeftAddon>
                            <Input
                                pl={"10px"}  // Un padding izquierdo para que no se superponga con el prefijo.
                                placeholder="9xxxxxxxx"
                                minLength={9}
                                maxLength={9}
                                value={num_emergencia}
                            />
                        </InputGroup>
                        {!isValidNumEmer && numEmerTouched && (
                            <FormErrorMessage>{numEmerError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Facebook</FormLabel>
                        <Input placeholder="Nombre en Facebook" value={RRSS} onChange={handleRRSSChange}/>
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
                    <HStack p={"10px"}>
                        <Button type="submit" colorScheme="green">Crear usuario</Button>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    );
}

export { RegisterUserBody };
