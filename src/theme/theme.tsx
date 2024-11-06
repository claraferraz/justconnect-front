import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `"Montserrat", sans-serif`,
    body: `"Montserrat", sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "gray.50",
      },
    },
  },
});

export default theme;
