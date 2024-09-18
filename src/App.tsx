import { BrowserRouter as Router } from "react-router-dom";
import {RoutesApp} from "./routes/index";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import initialTheme from './theme/theme'; 

function App() {
  const [currentTheme] = useState(initialTheme);

  return (
    <Router>
      <ChakraProvider theme={currentTheme}>
        <RoutesApp />      
      </ChakraProvider>
    </Router>
  )
}

export default App
