import {
  Avatar,
  Box,
  VStack,
  Circle,
  Text,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  MdCalendarMonth,
  MdCalendarToday,
  MdDarkMode,
  MdEdit,
  MdInventory2,
  MdList,
  MdMusicNote,
  MdOutlineDarkMode,
  MdOutlineInventory,
  MdOutlineInventory2,
  MdPerson,
  MdPiano,
} from "react-icons/md";

export default function SideBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      height={"100%"}
      // bg="red"
      display={{ base: "none", md: "block" }}
      // minW={"240px"}
    >
      <VStack spacing={88} align={"left"}>
        <Menu autoSelect={false}>
          <MenuButton
            as={Avatar}
            src="/LOGO_CORO_PNG.png"
            size={"2xl"}
            ml={"25px"}
            cursor={"pointer"}
          />
          <MenuList>
            <MenuItem h={"50px"}>Cerrar Sesión</MenuItem>
            <MenuItem h={"50px"} onClick={toggleColorMode}>
              <Text mr={"10px"}>Cambiar Modo</Text>
              <Icon
                as={colorMode == "light" ? MdOutlineDarkMode : MdDarkMode}
              />
            </MenuItem>
          </MenuList>
        </Menu>

        <SideMenu />
      </VStack>
    </Box>
  );
}

function MenuItemSideBar(prop: { icon: IconType; option: String }) {
  const { colorMode } = useColorMode();
  return (
    <Box pr={"25px"} as="button">
      <HStack
        _hover={
          colorMode == "light"
            ? { bg: "sideBarItemHover.light" }
            : { bg: "sideBarItemHover.dark" }
        }
        h={"50px"}
        borderRightRadius={"25px"}
        minW={"230px"}
      >
        <Icon
          color={
            colorMode == "light" ? "iconSideBar.light" : "iconSideBar.dark"
          }
          as={prop.icon}
          boxSize={6}
          mr={1}
          ml={"25px"}
        />
        <Text fontSize={"1.3em"}>{prop.option}</Text>
      </HStack>
    </Box>
  );
}

function SideMenu() {
  return (
    <Box>
      <VStack display={"flex"} spacing={4} align={"left"}>
        <MenuItemSideBar icon={MdOutlineInventory} option="Inventario" />
        <MenuItemSideBar icon={MdPerson} option="Usuarios" />
        <MenuItemSideBar icon={MdPiano} option="Instrumentos" />
        <MenuItemSideBar icon={MdOutlineInventory2} option="Archivos" />
        <MenuItemSideBar icon={MdMusicNote} option="Canciones" />
        <MenuItemSideBar icon={MdCalendarMonth} option="Calendario" />
      </VStack>
    </Box>
  );
}
