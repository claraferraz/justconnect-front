import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './routes/MainRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import initialTheme from './theme/theme';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [currentTheme] = useState(initialTheme);

  return (
    <Router>
      <ChakraProvider theme={currentTheme}>
        <Sidebar>
          <MainRoutes />
        </Sidebar>
      </ChakraProvider>
    </Router>
  );
}

export default App;
