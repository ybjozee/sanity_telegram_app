import '../styles/globals.css'
import {ChakraProvider, Container} from "@chakra-ui/react";

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider>
            <Container maxW='container.xl' centerContent>
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>
    );
}

export default MyApp
