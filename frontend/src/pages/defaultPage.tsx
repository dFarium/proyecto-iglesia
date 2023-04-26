import { Box, Stack, useColorMode } from "@chakra-ui/react";
import SideBar from "../widgets/sidebar/sidebar";
import TopNavBar from "../widgets/sidebar/topbar";

export default function DefaultPage() {
  const { colorMode } = useColorMode();

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      width={"100vw"}
      height={"100svh"}
      pt={{ base: "15px", md: "25px" }}
      pb={{ base: "15px", md: "25px" }}
      pr={{ base: "15px", md: "25px" }}
      pl={{ base: "15px", md: "0px" }}
    >
      {/* top nav bar */}
      <TopNavBar />
      {/* sidebar */}
      <SideBar />
      {/*caja blanca */}
      <Box
        flexGrow={1}
        minW={"30%"}
        // maxWidth={"100%"}
        p={"25px"}
        h={"100%"}
        borderRadius={"25px"}
        bg={colorMode == "light" ? "container.light" : "container.dark"}
        shadow={"md"}
      >
        {/* children */}

        {/*  */}
      </Box>
    </Stack>
  );
}
