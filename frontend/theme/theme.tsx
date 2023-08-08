import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// font global
const fonts = {
  body: `'Inter', sans-serif`,
};

//estilos de <Text>
const textStyles = {
  titulo: {
    fontSize: ["2em", null, "2.5em"],
    fontWeight: "bold",
  },
};

// variante boton item inventario
// const newItemInventarioButton = {
//   color: "black",
//   bg: "#F07B3F",
//   fontWeight: "bold",
//   _dark: {
//     color: "white",
//     bg: "#ff9655",
//   },
//   _hover: {
//     bg: "#dc6529",
//     _dark: {
//       bg: "#67e8f9",
//     },
//   },
// };

const components = {
  // tabla inventario
  Table: {
    variants: {
      striped: {
        th: {
          fontSize: "1.4em",
          fontWeight: "bold",
          textTransform: "none",
        },
        td: {
          fontSize: "16px",
        },
      },
    },
  },

  // menu expansible
  Menu: {
    variants: {
      custom: {
        list: {
          bg: "white", //color fondo light
          _dark: {
            bg: "#2C3639", //color fondo dark
          },
        },
        item: {
          bg: "white", //color fondo light
          _hover: {
            bg: "#EDF2F7", //hover light
          },
          _dark: {
            bg: "#2C3639", //color fondo dark
            _hover: {
              bg: "#3d4749", // hover dark
            },
          },
        },
      },
    },
  },
  // Nuevo Item Inventario
  // Button: {
  //   variants: {
  //     newItemInventarioButton: newItemInventarioButton,
  //   },
  // },
};

/*
lista posibles colores para body y container en dark

body    container

2D2D2D  414141
393646  4F4557
222831  393E46
*/

const colors = {
  //body

  // -------------------------------- //
  body: {
    light: "#F6F6F6",
    dark: "#212121",
  },
  fontColor: {
    light: "black",
    dark: "white",
  },
  loginContainer: {
    light: "#ff9655",
    dark: "#ff9655",
  },
  container: {
    light: "white",
    dark: "#323232",
  },

  // side menu
  sideBarItemHover: {
    light: "#FEEBC8",
    dark: "#414141",
  },
  iconSideBar: {
    light: "#2D3748",
    dark: "#F6AD55",
  },
  menuAvatarDropList: {
    light: "white",
    dark: "red",
    hoverLight: "grey",
    hoverDark: "blue",
  },

  // -------------------------------- //

  //inventario
  stripTable: {
    100: "#FFFAF0", // light mode
    700: "#373737", // dark mode
  },
  newInventarioItemButton: {
    500: "#F07B3F", // light mode
    600: "#dc6529", // light mode _hover
    200: "#ff9655", // dark mode
    300: "#ff7520", // dark mode _hover
  },

  editInventarioItemButton: {
    500: "#06b6d4", // light mode
    600: "#0891b2", // light mode _hover
    200: "#a5f3fc", // dark mode
    300: "#67e8f9", // dark mode _hover
  },

  inventarioItemEditHeaderBg: {
    light: "#4A5568",
    dark: "#2D3748",
  },
  inventarioItemEditBg: {
    light: "#cce6ff",
    dark: "#EDF2F7",
  },
  inventarioDeleteItem: {
    light: "#C53030",
    dark: "#FC8181",
  },

  // archivos
  newArchivoItemButton: {
    500: "#F07B3F", // light mode
    600: "#dc6529", // light mode _hover
    200: "#ff9655", // dark mode
    300: "#ff7520", // dark mode _hover
  },

  //prestamo instrumentos
  newPrestamoInstrumentoButton: {
    500: "#F07B3F", // light mode
    600: "#dc6529", // light mode _hover
    200: "#ff9655", // dark mode
    300: "#ff7520", // dark mode _hover
  },

  editPrestamoInstrumentoButton: {
    500: "#06b6d4", // light mode
    600: "#0891b2", // light mode _hover
    200: "#a5f3fc", // dark mode
    300: "#67e8f9", // dark mode _hover
  },

  prestamoInstrumentoEditHeaderBg: {
    light: "#4A5568",
    dark: "#2D3748",
  },
  prestamoInstrumentoEditBg: {
    light: "#cce6ff",
    dark: "#EDF2F7",
  },
  prestamoInstrumentoDelete: {
    light: "#C53030",
    dark: "#FC8181",
  },
};

const theme = extendTheme({
  ...config,
  textStyles,
  fonts,
  components,
  colors,
});

export default theme;
