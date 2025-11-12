// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";


// Cria o hook para inserir um Clientes
export function useInserirCliente() {
  // Recebe os dados do Clientes e faz a requisição para a API
  // com o método POST
  const inserirCliente = async (data) => {
    const req = await fetch(`${url}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Cliente inserido:", res);
    // Retorna o Clientes inserido
    return res;
  };

  return { inserirCliente };
}
