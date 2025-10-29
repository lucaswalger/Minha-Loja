// url da API
const url = "http://localhost:5000";

// Importando o hook de useState para controlaras variaveis
import {useState, useEffect} from "react";

export function useListaCategorias(){
    // Variavel para armazenar as categorias
    const [categorias, setCategorias] = useState([])

    // Puxa os dados da API assim que o componente é iniciado
    useEffect(()=>{
        async function fecthCategorias() {
            try{
                // Fetch abre conexão com a API, na rota especificada e guarada a resposta com req
                const req = await fetch(`${url}/categorias`)
                // Como a resposta vem em texto, preciso converte para son para utilizar
                const res = await req.json()
                // Assim que tiver convertido, guarda na variavel criada para guarda as categorias
                setCategorias(res)
            } 
            // Se tiver erro na tentativa de conexão com a API, mostrar qual foi o console
             catch(erro){
                console.error(erro.message);
            }
        }
        // Executa a função de buscar as categorias na API
        fecthCategorias()
    },[])
    // Retorna pra quem chamou a função, a lista de categorias ja preenchida
    return categorias
}

export function useListaMedidas(){
    // lista com medidas
    const [medidas] = useState([
        {
            id:1, nome:"mL",
            id:2, nome:"L"
        }
    ])
    return medidas
}