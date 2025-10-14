// url da API:
const url = "http://localhost:5000";

// Importantdo o hook de useState para controlar as variaveis
import { useEffect, useState } from "react";

export function useVerificaLogin() {
    //  Variável para armazenar a lista de usuários

    const [usuarios, setUsuarios] = useState([1]);
    // Usando o useffect, para pegar a lista de usuários, assim que o componente for renderizado é renderizado na tela
    useEffect(() => {
            // Função para buscar os dados da API
            async function fetchData() {
              try{
              //  Variável para realizar a requisição
               const req = await fetch (`${url}/usuarios`);
             //  Converte o retorno para JSON
               const res = await req.json();
            //   Pega a resposta e guarda na variável de usuários
               setUsuarios(res);
                } catch (erro) {
                    console.log(erro.message);
        }
            }
            fetchData();
    }, []);

    // Função para verificar se o usuário passado existe na lista que puxou da API
    const verificaLogin = (data) => {
        // Verifica se há um usuário com email passado em data, na lista dque buscou da API
        const userToFind = usuarios.find((user) =>{
            return user.email === data.email        
        })

        // Se o usuário existe, verifica se a senha esta correta
        if(userToFind != undefined && userToFind.senha === data.senha){
            console.log("Usuário logado", userToFind.nome);
       }

         else{
            return "Usuário ou senha inválidos";
        }
    }

    return {verificaLogin};
}