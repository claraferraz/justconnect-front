import { BrowserRouter as Router } from "react-router-dom";
import '@fontsource/poppins'; 

import { MainRoutes } from "./routes/MainRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import initialTheme from "./theme/theme";

function App() {
  const [currentTheme] = useState(initialTheme);

  return (
    <Router>
      <ChakraProvider theme={currentTheme}>
        <MainRoutes />
      </ChakraProvider>
    </Router>
  );
}

export default App;
