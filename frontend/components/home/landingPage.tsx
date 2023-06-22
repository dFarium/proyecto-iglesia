import {Box, VStack, Image} from "@chakra-ui/react";
import Script from "next/script";

export default function LandingPage() {
    return (
        <>
        <VStack justify={"center"} h={"100%"} w={"100%"} fontSize="xl"  textAlign="center">
        <Image borderRadius='full' boxSize='400px' transform={"translateY(50%)"} src='ifa.jpg'></Image>
            <VStack h={"50%"} justify={"flex-end"}>
                <Box mb={7} id="dailyVersesWrapper"></Box>
                <Script
                    async
                    defer
                    src="https://dailyverses.net/get/verse.js?language=nvi"
                ></Script>
            </VStack>
        </VStack>
        </>
    );
}
