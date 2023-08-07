"use client";

import { Text, FormControl, useColorModeValue, HStack, FormLabel, Input, Table, Button, 
    IconButton, Container, Tbody, Thead, Th, Tr, Td, Tooltip, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Swal from 'sweetalert2'
//instalar -> npm install react-icons
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from 'react-icons/fa';

function GetUsersBody() {

    interface Usuario {
        _id: string;
        name: string;
        rut: string;
        email: string;
        rol: {name: string}[];
        telefono: string;
        direccion: string;
        fecha_nacimiento: Date;
        num_emergencia: string;
        //más
    }
    const [usuarios, setUsers] = useState<Usuario[]>([]);
    const [admin, setAdmin] = useState(false);

    // Estados para editar el usuario
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);

    // Estados para mostrar detalles del usuario
    const [getUser, setGetUser] = useState<Usuario | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const openDetailModal = () => setShowDetailModal(true);
    const closeDetailModal = () => setShowDetailModal(false);

    // Estados de control abrir y cerrar modal
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    
    const getUsers = async () => {
        const response = await fetch(`http://localhost:3001/api/usuarios`);
        const data = await response.json();
        setUsers(data);
    }
    // Se recupera el token del localstorage del navegador
    let token = window.localStorage.getItem('auth-token');

    // Definición de colores para los botones de editar y eliminar
    const editHoverColor = useColorModeValue("green.100", "green.300");
    const editActiveColor = useColorModeValue("green.400", "green.600");

    const deleteHoverColor = useColorModeValue("red.100", "red.300");
    const deleteActiveColor = useColorModeValue("red.400", "red.600");

    const EditUser = async (event: React.FormEvent) => {
        event.preventDefault();
        if(editingUser && token){
            const res = await fetch(`http://localhost:3001/api/usuario/update/${editingUser._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    name: editingUser.name,
                    rut: editingUser.rut,
                    email: editingUser.email
                }),
            });
            if (!res.ok) {
                console.error('Error al realizar la solicitud:', res.statusText);
                return;
            }
            if (res.status === 200) {
                Swal.fire({
                    title: 'Usuario Modificado',
                    text: 'El usuario ha sido modificado con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
                // Refrescar la lista de usuarios después de editar uno.
                getUsers();
                setEditingUser(null);
            } else {
                const errorData = await res.json();
                console.log(errorData);
            }
        }
    }

    const deleteUser = async (userToDelete: Usuario) => {
        if(userToDelete && token){
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Estás a punto de eliminar este usuario",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (token !== null) {
                        fetch(`http://localhost:3001/api/usuario/delete/${userToDelete._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': token
                            },
                        })
                        .then((res) => {
                            if (!res.ok) {
                                console.error('Error al realizar la solicitud:', res.statusText);
                                return;
                            }
                            if (res.status === 200) {
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: 'Usuario eliminado con éxito',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                setTimeout(() => {
                                    getUsers();
                                }, 2500);
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    } else {
                        console.error('Error: token es null');
                    }
                }
            })
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(editingUser) {
            setEditingUser({
                ...editingUser,
                [event.target.name]: event.target.value
            });
        }
    };

    useEffect(() => {
        getUsers();

        let token = null;
        if (typeof window !== "undefined") {
            token = localStorage.getItem('auth-token');
        }

        if (!token) {
            console.log('No hay token guardado.');
            return;
        }

        let decoded = null; 
        try {
            decoded = jwt.decode(token) as JwtPayload;
        } catch (e) {
            console.error('Error al decodificar el token: ', e);
            return;
        }

        // Arreglo que contiene el rol, leído para ver si es administrador y fijar el admin como true o false
        if (decoded) {
            if (Array.isArray(decoded.rol)) {
                decoded.rol.forEach((roleObject) => {
                    if (roleObject.name === 'admin') {
                        setAdmin(true);
                    }
                });
            }
        } else {
            setAdmin(false);
        }
    }, []);

    const showUsers = () => {
        return usuarios.map((usuario, index) => {
            const roles = usuario.rol.map(rol => rol.name).join(', ');
            // Para no mostrar el usuario admin por defecto en la base de datos
            if (usuario.email === 'admin@gmail.com') {
                return null;
            }
            return(
                <Tr key={usuario._id} bgColor={index % 2 === 0 ? "gray.100" : "white"}>
                    <Td isTruncated maxWidth="400px">{usuario.name}</Td>
                    <Td isTruncated maxWidth="200px">{usuario.rut}</Td>
                    <Td isTruncated maxWidth="350px">{usuario.email}</Td>
                    <Td isTruncated maxWidth="400px">{roles}</Td>
                    {admin && (
                        <Td maxW={"70px"}>
                            <Button colorScheme="twitter" variant='link' fontWeight="thin"
                            onClick={() => { openDetailModal(); setGetUser(usuario); }}>detalle</Button>
                        </Td>)}
                    {admin && (
                        <Td maxW={"1px"}>
                            <Tooltip label="Editar">
                                <IconButton 
                                aria-label="Editar"
                                icon={<FaRegEdit />} colorScheme="green" 
                                variant="ghost" 
                                _hover={{ bg: editHoverColor }} 
                                _active={{ bg: editActiveColor }}
                                onClick={() => { setIsOpen(true); setEditingUser(usuario); }}
                                mr={3}
                                isRound
                                />
                        </Tooltip>
                        </Td>)}
                        
                    {admin &&(
                        <Td maxW={"1px"}>
                            <Tooltip label="Eliminar">
                                <IconButton 
                                aria-label="Eliminar" 
                                icon={<FaRegTrashAlt />} 
                                colorScheme="red" 
                                variant="ghost" 
                                _hover={{ bg: deleteHoverColor }} 
                                _active={{ bg: deleteActiveColor }} 
                                onClick={() => deleteUser(usuario)}
                                isRound
                                />
                            </Tooltip>
                        </Td>)}
                </Tr>
            );
        });
    }
    return(
        <Container maxW='1250px' >
            <HStack justifyContent={"space-between"} h='100px'>
                <Text textStyle={"titulo"}>Lista de usuarios</Text>
                {admin && (<Button leftIcon={<FaUserPlus/>} colorScheme="green" onClick={() => window.location.href="/home/usuarios/register"}>
                    Crear Usuario
                </Button>)}
            </HStack>
            <Box maxH="520px" overflowY="auto">
            <Table variant="simple" >
                <Thead >
                <Tr>
                    <Th>NOMBRE</Th>
                    <Th>RUT</Th>
                    <Th>CORREO</Th>
                    <Th>ROL</Th>
                </Tr>
                </Thead>
                <Tbody >
                    {showUsers()}
                </Tbody>
            </Table>
            </Box>

            {editingUser && (
                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Usuario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={EditUser}>
                            <FormControl>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input type="text" id="name" name="name" value={editingUser?.name || ''} onChange={handleInputChange} />
                                <FormLabel htmlFor="rut">RUT</FormLabel>
                                <Input type="text" id="rut" name="rut" value={editingUser?.rut || ''} onChange={handleInputChange} />
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input type="email" id="email" name="email" value={editingUser?.email || ''} onChange={handleInputChange} />
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>cancelar</Button>
                        <Button colorScheme="green" type="submit" onClick={EditUser}>aceptar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            )}
            {getUser && (
            <Modal isOpen={showDetailModal} onClose={closeDetailModal}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Detalles del Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="start">
                        <HStack>
                            <Text>Nombre: </Text>
                            <Text>{getUser.name}</Text>
                        </HStack>
                        <HStack>
                            <Text>RUT: </Text>
                            <Text>{getUser.rut}</Text>
                        </HStack>
                        <HStack>
                            <Text>Email: </Text>
                            <Text>{getUser.email}</Text>
                        </HStack>
                        <HStack>
                            <Text>Telefono: </Text>
                            <Text>{getUser.telefono}</Text>
                        </HStack>
                        <HStack>
                            <Text>Direccion: </Text>
                            <Text>{getUser.direccion}</Text>
                        </HStack>
                        <HStack>
                            <Text>Fecha_nacimiento: </Text>
                            <Text>{new Date(getUser.fecha_nacimiento).toLocaleDateString()}</Text>
                        </HStack>
                        <HStack>
                            <Text>Nro de emergencia: </Text>
                            <Text>{getUser.num_emergencia}</Text>
                        </HStack>
                        <HStack>
                            <Text>Rol: </Text>
                            <Text>{getUser.rol.map(rol => rol.name).join(', ')}</Text>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={closeDetailModal}>Cerrar</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            )}
        </Container>
    )

}

export { GetUsersBody };
