import { useEffect, useState } from 'react';
import useHome from './useHome';
//import { api } from '../../service/api';
//import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

function Home() {
  const {
    getAllSales,
    getAllClients,
    clients,
    sales,
    isEditSaleMode,
    removeSale,
    onSubmit,
    onClickSale,
    setEditSaleMode,
    getAllSellers,
    sellers,
  } = useHome();

  const {
    isOpen: saleDrawerIsOpen,
    onOpen: saleDrawerOnOpen,
    onClose: saleDrawerOnClose,
  } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    getAllClients();
    getAllSales();
    getAllSellers();
  }, []);

  return (
    <>
      <Box paddingX={16} paddingY={28}>
        <Center w="100%" flexDirection="column">
          <Box borderWidth="1px" borderRadius="lg" w="100%" p={8}>
            <Accordion defaultIndex={[-1]} allowMultiple={true}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Vendedores
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Nome</Th>
                          <Th>CPF</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sellers.map((item, index) => (
                          <Tr key={index.toString()}>
                            <Td>{item.nome}</Td>
                            <Td>{item.cpf}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion defaultIndex={[-1]} allowMultiple={true}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Clientes
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Nome</Th>
                          <Th>CPF</Th>
                          <Th>Data de Nascimentos</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {clients.map((item, index) => (
                          <Tr key={index.toString()}>
                            <Td>{item.nome}</Td>
                            <Td>{item.cpf}</Td>
                            <Td>{item.data_nascimento}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion defaultIndex={[-1]} allowMultiple={true}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Vendas
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>ID</Th>
                          <Th>Cliente</Th>
                          <Th>Tipo de Pagamento</Th>
                          <Th>ID do Veiculo</Th>
                          <Th>ID do Pagamento</Th>
                          <Th>CPF do Vendedor</Th>
                          <Th isNumeric>Valor</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sales.map((item, index) => (
                          <Tr key={index.toString()}>
                            <Td display={'flex'} flexDir={'row'}>
                              {item.venda_id}
                            </Td>
                            <Td
                              onClick={() =>
                                onClickSale(item, setValue, saleDrawerOnOpen)
                              }
                              cursor={'pointer'}
                            >
                              {item.cliente_cpf}
                            </Td>
                            <Td>{item.tipo_pagamento}</Td>
                            <Td>{item.veiculo_id}</Td>
                            <Td>{item.pagamento_id}</Td>
                            <Td>{item.vendedor_cpf}</Td>
                            <Td isNumeric>{item.valor}</Td>
                            <Td
                              onClick={() => removeSale(item.venda_id)}
                              marginLeft={4}
                              color={'blue'}
                              cursor={'pointer'}
                            >
                              Remover
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Center p={8} gap={8}>
              <Button onClick={saleDrawerOnOpen}>Adicionar uma Venda</Button>
              <Button>Adicionar um Cliente</Button>
            </Center>
          </Box>
        </Center>
      </Box>
      <Drawer
        onOverlayClick={() => setEditSaleMode(false)}
        onClose={saleDrawerOnClose}
        isOpen={saleDrawerIsOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            {!isEditSaleMode ? 'Nova venda' : 'Editar venda'}
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.tipo_pagamento}>
                <FormLabel htmlFor="tipo_pagamento">
                  Tipo de Pagamento
                </FormLabel>
                <Input
                  id="tipo_pagamento"
                  placeholder="PIX"
                  {...register('tipo_pagamento', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormLabel htmlFor="valor">Valor</FormLabel>
                <Input
                  id="valor"
                  placeholder="0"
                  {...register('valor', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormLabel htmlFor="data">Data</FormLabel>
                <Input
                  id="data"
                  {...register('data', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                  type={'date'}
                />
                <FormLabel htmlFor="veiculo_id">ID do Veiculo</FormLabel>
                <Input
                  id="veiculo_id"
                  {...register('veiculo_id', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormLabel htmlFor="pagamento_id">ID do Pagamento</FormLabel>
                <Input
                  id="pagamento_id"
                  {...register('pagamento_id', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormLabel htmlFor="avaliacao_id">ID do Avalia????o</FormLabel>
                <Input
                  id="avaliacao_id"
                  {...register('avaliacao_id', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormLabel htmlFor="vendedor_cpf">CPF do Vendedor</FormLabel>
                <Input
                  id="vendedor_cpf"
                  {...register('vendedor_cpf', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormLabel htmlFor="cliente_cpf">CPF do Cliente</FormLabel>
                <Input
                  id="cliente_cpf"
                  {...register('cliente_cpf', {
                    required: 'Esse campo ?? obrigat??rio',
                  })}
                />
                <FormErrorMessage>
                  {/* {!!errors.tipo_pagamento && errors.tipo_pagamento.message} */}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                {!isEditSaleMode ? 'Adicionar' : 'Editar'}
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { Home };
