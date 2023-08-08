import { Stack, Box, useColorMode } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../sidebar/sidebar";
import TopNavBar from "../sidebar/topbar";
import Swal from 'sweetalert2'

export default function HomePage({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();
  const padB = "10px";
  const padMd = "15px";

  const router = useRouter();
  const [isTokenVerified, setTokenVerified] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
          Swal.fire({
              icon: 'error',
              title: 'Acceso no autorizado',
              backdrop: '#000000',  // Overlay oscuro detrás de la alerta
              allowOutsideClick: false,  // No permite cerrar la alerta haciendo clic fuera de ella
              showConfirmButton: true,
              confirmButtonText: 'Entendido',
              willClose: () => {
                  router.push('/');
              }
          });
      } else {
          setTokenVerified(true);
      }
  }, [router]);

  if (!isTokenVerified) {
    return null;
  }

  return (
    <Stack
      bg={colorMode == "light" ? "body.light" : "body.dark"}
      color={colorMode == "light" ? "colorFont.light" : "colorFont.dark"}
      direction={{ base: "column", md: "row" }}
      width={"100vw"}
      height={"100svh"}
      pt={{ base: padB, md: padMd }}
      pb={{ base: padB, md: padMd }}
      pr={{ base: padB, md: padMd }}
      pl={{ base: padB, md: padMd }}
    >
      {/* top nav bar */}
      <TopNavBar />

      {/* sidebar */}
      <SideBar />

      {/*caja blanca */}
      <Box
        flexGrow={1}
        minW={"30%"}
        p={"20px"}
        h={{ base: "85%", md: "100%" }}
        borderRadius={"25px"}
        bg={colorMode == "light" ? "container.light" : "container.dark"}
        shadow={"md"}
      >
        {/* children */}
        {children}
      </Box>
    </Stack>
  );
}
