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
      await api.post('/venda', values);
      setSales([
        ...sales,
        { venda_id: sales[sales.length - 1].venda_id + 1, ...values },
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(values: any) {
    addSale(values);
  }

  async function removeSale(id: number) {
    try {
      await api.delete(`/venda/${id}`);
      setSales((oldState) => oldState.filter((item) => item.venda_id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getAllSales,
    getAllClients,
    clients,
    sales,
    addSale,
    onSubmit,
    removeSale,
  };
}
