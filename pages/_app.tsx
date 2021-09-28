import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import theme from "themes/chakraTheme";

const config = {};

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default App;
