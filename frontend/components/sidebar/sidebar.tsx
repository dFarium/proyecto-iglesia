import {
  Avatar,
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  MdCalendarMonth,
  MdDarkMode,
  MdLogout,
  MdMusicNote,
  MdOutlineDarkMode,
  MdOutlineInventory,
  MdOutlineInventory2,
  MdPerson,
  MdPiano,
  MdOutlineSavings,
} from "react-icons/md";
import NextLink from "next/link";
import {usePathname, useRouter} from "next/navigation";

export default function SideBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem('auth-token');  // Elimina el token del local storage
    router.push('/');
  }
  return (
    <Box
      height={"100%"}
      borderRadius={"25px"}
      pt={"25px"}
      display={{ base: "none", md: "block" }}
      overflowY={"auto"}
      minW={"260px"}
    >
      <VStack justify={"space-between"} h={"100%"}>
        <VStack spacing={88} align={"left"}>
          <Menu autoSelect={false} variant={"custom"}>
            <MenuButton
              as={Avatar}
              src="/image.png"
              size={"2xl"}
              ml={"25px"}
              cursor={"pointer"}
            />
            <MenuList>
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

        <MenuItemSideBar icon={MdLogout} option="Cerrar Sesión" onClick={handleLogout} />
      </VStack>
    </Box>
  );
}

function MenuItemSideBar(prop: {
  icon: IconType;
  option: string;
  href?: string;
  onClick?: () => void;
}) {
  const pathName: string = usePathname();

  const { colorMode } = useColorMode();
  return (
      <Link as={NextLink} href={prop.href || '#'} onClick={prop.onClick}> {/* '#' usado en caso de que href sea null o undefine */}
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
    </Link>
  );
}

function SideMenu() {
  return (
    <Box>
      <VStack spacing={4} align={"left"}>
        <MenuItemSideBar
          icon={MdOutlineInventory2}
          option="Archivos"
          href="/home/archivos"
        />
        <MenuItemSideBar
          icon={MdCalendarMonth}
          option="Calendario"
          href="/home/calendario"
        />
        <MenuItemSideBar
          icon={MdMusicNote}
          option="Canciones"
          href="/home/canciones"
        />
        <MenuItemSideBar
          icon={MdPiano}
          option="Préstamos"
          href="/home/instrumentos"
        />
        <MenuItemSideBar
          icon={MdOutlineInventory}
          option="Inventario"
          href="/home/inventario"
        />
        <MenuItemSideBar
          icon={MdOutlineSavings}
          option="Tesoreria"
          href="/home/tesoreria"
        />
        <MenuItemSideBar
          icon={MdPerson}
          option="Usuarios"
          href="/home/usuarios/getUsuarios"
        />
      </VStack>
    </Box>
  );
}
