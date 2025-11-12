// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";


// Cria o hook para inserir um Funcionario
export function useInserirFuncionario() {
  // Recebe os dados do Funcionario e faz a requisição para a API
  // com o método POST
  const inserirFuncionario = async (data) => {
    const req = await fetch(`${url}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Funcionario inserido:", res);
    // Retorna o Funcionario inserido
    return res;
  };

  return { inserirFuncionario };
}
