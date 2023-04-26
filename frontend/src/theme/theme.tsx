import {
  extendTheme,
  StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const fonts = {
  body: `'Inter', sans-serif`,
};

const components = {
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
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("#F6F6F6", "#2D2D2D")(props),
      color: mode("black", "white")(props),
    },
  }),
};

const colors = {
  container: {
    light: "white",
    dark: "#414141",
  },
  sideBarItemHover: {
    light: "#FEEBC8",
    dark: "#414141",
  },
  circleAvatar: {
    light: "#FFA5A5",
    dark: "",
  },
  iconSideBar: {
    light: "#2D3748",
    dark: "#F6AD55",
  },
  inventarioItemEditBg: {
    light: "#cce6ff",
    dark: "#EDF2F7",
  },
};

{
  /* <chakra.span>
  {header.column.getIsSorted() ? (
    header.column.getIsSorted() === "desc" ? (
      <MdArrowDropDown aria-label="sorted descending" />
    ) : (
      <MdArrowDropUp aria-label="sorted ascending" />
    )
  ) : null}
</chakra.span>; */
}

const theme = extendTheme({
  config,
  fonts,
  components,
  styles,
  colors,
});

export default theme;
