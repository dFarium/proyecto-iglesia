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
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
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
          <TopbarItem option="Archivos" href="/home/archivos" />
          <TopbarItem option="Calendario" href="/home/calendario" />
          <TopbarItem option="Canciones" href="/home/canciones" />
          <TopbarItem option="Instrumentos" href="/home/instrumentos" />
          <TopbarItem option="Inventario" href="/home/inventario" />
          <TopbarItem option="Tesorería" href="/home/tesorería" />
          <TopbarItem option="Usuarios" href="/home/usuarios" />
          <MenuItem onClick={toggleColorMode} h={"50px"}>
            <Text mr={"5px"}>Cambiar Modo</Text>
            <Icon as={colorMode == "light" ? MdOutlineDarkMode : MdDarkMode} />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
function TopbarItem(props: { option: string; href: string }) {
  return (
    <Link as={NextLink} href={props.href}>
      <MenuItem h={"50px"}>{props.option}</MenuItem>
    </Link>
  );
}

export default TopNavBar;
