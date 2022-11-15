import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Details } from './pages/details';
import { ChakraProvider, Flex, Text } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Flex
        as="header"
        position="fixed"
        backgroundColor="rgba(244, 
 244, 244, 0.6)"
        backdropFilter="saturate(180%) blur(1px)"
        w="100%"
        justifyContent={'center'}
        p={6}
      >
        <Text fontSize={'2xl'}>Sistema de Gerenciamento da Concessionária</Text>
      </Flex>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="group/:id" element={<Details />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
