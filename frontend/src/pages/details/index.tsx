import React, { useEffect, useState } from 'react';
import { api } from '../../service/api';
import { useParams } from 'react-router-dom';

function Details() {
  const params = useParams();
  const [details, setDetails] = useState<any[]>([]);

  const onDetails = async (id: number) => {
    const response = await api.get(`/groups/${id}`);
    console.log(response.data);
    setDetails(response.data);
  };

  useEffect(() => {
    if (params.id) onDetails(Number(params.id));
  }, [params.id]);

  return (
    <div>
      <h1>App banco de dados</h1>
      <h3>Teste de listagem de detalhes</h3>
      <p>Integrantes do grupo</p>
      <ul>
        {details.map((detail) => (
          <li
            key={detail.id}
          >{`grupo: ${detail.grupo} - nome: ${detail.name} - ${detail.linkedin}`}</li>
        ))}
      </ul>
    </div>
  );
}

export { Details };
