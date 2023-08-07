import { Box, Flex, Grid, Link, useColorMode, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
// instalar para las alertas --> npm install sweetalert2
// instalar para usar el token --> npm install --save-dev @types/jsonwebtoken
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useEffect, useState } from 'react';


export function ElegirBody() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      console.error('No hay token guardado.');
      return;
    }

    // Variable usada para decodificar el contenido del token
    // El token contiene, el nombre de quién inició sesión, su id y el arreglo con el/los roles asignados
    // A su vez, el arreglo contiene el id y el nombre del rol.
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

  // const handleClick = (e: React.MouseEvent) => {
  //   Swal.fire('Se hizo clic en un botón');
  // };

  return (
    <VStack w={"full"} h={"full"}>
      <Text textStyle={"titulo"}>Prueba</Text>
      <VStack w={"full"} h={"full"} justify={"space-between"} overflow={"auto"} p={"20px"} >
        <Grid templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)", }} gap={"40px"} m={"auto"} >
          {/* {admin && (
            <Categoria titulo="crear usuario" href="/home/usuarios/register"/>
          )} */}
          <Categoria titulo="Ver usuario" href="/home/usuarios/getUsuarios"/>
        </Grid>
      </VStack>
    </VStack>
  );
}

function Categoria(props: { titulo: string; href: string}) { // Agregación de función onclick , onClick: (e: any) => void 
  const { colorMode } = useColorMode();
  const outlineDark = "2px white solid";
  const outlineLight = "2px grey solid";
  const borderRadius = "10px";
  
  return (
    <Link as={NextLink} href={props.href}  pos={"relative"}> {/* onClick={props.onClick}*/ }
      <Box
        h={"100px"}
        w={"320px"}
        borderRadius={borderRadius}
        outline={colorMode == "light" ? outlineLight : outlineDark}
        overflow={"hidden"}
        fontSize={"1.5em"}
        _hover={{ transform: "scale(1.03)" }}
        transition={"0.5s"}
      >
        <Box
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"bottom"}
          h={"100%"}
          w={"100%"}
          _hover={{ transform: "scale(1.05)" }}
          transition={"0.5s"}
        ></Box>
        <Flex
          borderRadius={borderRadius}
          bg="rgb(0,0,0,0.75)"
          w={"100%"}
          h={"100%"}
          bottom={"0px"}
          pos={"absolute"}
          align={"center"}
          justify={"center"}
          color={"white"}
        >
          {props.titulo}
        </Flex>
      </Box>
    </Link>
  );
}