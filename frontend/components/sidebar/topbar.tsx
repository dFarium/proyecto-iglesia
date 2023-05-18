import {
  Box,
  Button,
  Circle,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  Text,
  Icon,
} from "@chakra-ui/react";
import { MdDarkMode, MdMenu, MdOutlineDarkMode } from "react-icons/md";

function TopNavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      width={"100%"}
      display={{ base: "flex", md: "none" }}
      justifyContent={"end"}
    >
      <Menu autoSelect={false} variant={"custom"}>
        <MenuButton
          as={IconButton}
          icon={<MdMenu />}
          bg={colorMode == "light" ? "container.light" : "container.dark"}
          shadow={"md"}
          w={"100px"}
          h={"60px"}
          fontSize={"2em"}
          borderRadius={"15px"}
        />
        <MenuList>
          <MenuItem h={"50px"}>Inventario</MenuItem>
          <MenuItem h={"50px"}>Usuarios</MenuItem>
          <MenuItem h={"50px"}>Instrumentos</MenuItem>
          <MenuItem h={"50px"}>Archivos</MenuItem>
          <MenuItem h={"50px"}>Canciones</MenuItem>
          <MenuItem h={"50px"}>Calendario</MenuItem>
          <MenuItem h={"50px"}>Cerrar Sesión</MenuItem>
          <MenuItem onClick={toggleColorMode} h={"50px"}>
            <Text mr={"5px"}>Cambiar Modo</Text>
            <Icon as={colorMode == "light" ? MdOutlineDarkMode : MdDarkMode} />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default TopNavBar;
