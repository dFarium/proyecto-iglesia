import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import InventarioPage from "./pages/inventario/inventario";
import theme from "./theme/theme";
import DefaultPage from "./pages/defaultPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <DefaultPage />
      {/* <InventarioPage /> */}
    </ChakraProvider>
  </React.StrictMode>
);
