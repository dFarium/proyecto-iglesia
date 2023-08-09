import { Box, VStack, Image } from "@chakra-ui/react";
import Script from "next/script";

export default function LandingPage() {
  return (
    <>
      <VStack
        pos={"relative"}
        h={"100%"}
        w={"100%"}
        fontSize="xl"
        textAlign="center"
      >
        <Image
          borderRadius="full"
          pos={"absolute"}
          top={"50%"}
          boxSize={"md"}
          h={"auto"}
          transform={"translateY(-50%)"}
          src="ifa.jpg"
        ></Image>
        <Box mb={7} id="dailyVersesWrapper" pos={"absolute"} bottom={"25px"}></Box>
        <Script
          async
          defer
          src="https://dailyverses.net/get/verse.js?language=nvi"
        ></Script>
      </VStack>
    </>
  );
}
