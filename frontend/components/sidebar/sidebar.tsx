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
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  MdCalendarMonth,
  MdDarkMode,
  MdMusicNote,
  MdOutlineDarkMode,
  MdOutlineInventory,
  MdOutlineInventory2,
  MdPerson,
  MdPiano,
} from "react-icons/md";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box
      height={"100%"}
      borderRadius={"25px"}
      pt={"25px"}
      // bg={colorMode == "light" ? "container.light" : "container.dark"}
      display={{ base: "none", md: "block" }}
    >
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
            <MenuItem h={"50px"} onClick={() => router.push("/")}>
              Cerrar Sesión
            </MenuItem>
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

function MenuItemSideBar(prop: {
  icon: IconType;
  option: string;
  href: string;
}) {
  const pathName: string = usePathname();

  const { colorMode } = useColorMode();
  return (
    <Link as={NextLink} href={prop.href}>
      <Box pr={"25px"} as="button">
        <HStack
          _hover={
            colorMode == "light"
              ? { bg: "sideBarItemHover.light" }
              : { bg: "sideBarItemHover.dark" }
          }
          // bg={
          //   pathName == prop.href
          //     ? colorMode == "light"
          //       ? "sideBarItemHover.light"
          //       : "sideBarItemHover.dark"
          //     : ""
          // }
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
      <VStack display={"flex"} spacing={4} align={"left"}>
        <MenuItemSideBar
          icon={MdOutlineInventory}
          option="Inventario"
          href="/home/inventario"
        />
        <MenuItemSideBar
          icon={MdPerson}
          option="Usuarios"
          href="/home/usuarios"
        />
        <MenuItemSideBar
          icon={MdPiano}
          option="Instrumentos"
          href="/home/instrumentos"
        />
        <MenuItemSideBar
          icon={MdOutlineInventory2}
          option="Archivos"
          href="/home/archivos"
        />
        <MenuItemSideBar
          icon={MdMusicNote}
          option="Canciones"
          href="/home/canciones"
        />
        <MenuItemSideBar
          icon={MdCalendarMonth}
          option="Calendario"
          href="/home/calendario"
        />
      </VStack>
    </Box>
  );
}
