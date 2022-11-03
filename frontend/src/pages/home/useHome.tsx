import { useState } from 'react';
import { api } from '../../service/api';

export default function useHome() {
  interface Client {
    nome: string;
    cpf: string;
    data_nascimento: string;
  }

  interface Sales {
    venda_id: number;
    tipo_pagamento: string;
    valor: number;
    data: string;
    veiculo_id: number;
    vendedor_cpf: string;
    pagamento_id: number;
    avaliacao_id: number;
    cliente_cpf: string;
  }

  const [clients, setClients] = useState<Client[]>([]);
  const [sales, setSales] = useState<Sales[]>([]);

  async function getAllClients() {
    try {
      const { data } = await api.get('/cliente');
      setClients(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllSales() {
    try {
      const { data } = await api.get('/venda');
      setSales(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addSale(values: any) {
    try {
      const { data } = await api.post('/venda', values);
      setSales([...sales, values]);
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(values: any) {
    addSale(values);
  }

  return { getAllSales, getAllClients, clients, sales, addSale, onSubmit };
}
