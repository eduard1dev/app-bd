import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Details } from './pages/details';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="group/:id" element={<Details />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
