import '@fontsource/overpass';

import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { ChakraProvider, Flex, Heading } from '@chakra-ui/react';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
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
        <Heading fontFamily={theme} fontSize={'2xl'}>
          Sistema de Gerenciamento da Concessionária
        </Heading>
      </Flex>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
