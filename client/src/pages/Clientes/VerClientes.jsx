// Import's components do Bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Import icon de lupa
import { BsSearch } from "react-icons/bs";

// Importando o hook dis clientes
import { useListaClientes, useDeletaClientes } from "../../hooks/useClientes";

// Import do link para navegar pra outra página
import { Link } from "react-router-dom";

import { useState } from "react";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const VerClientes = () => {
  // Variavel para armazenar a lista de clientes
  const clientes = useListaClientes();

  // Importando a função de deletar cliente
  const { deletarCliente } = useDeletaClientes();

  // Função para requisitar a exclusao do cliente
  const handleDelete = async (idCliente) => {
    //  Após confirmação, utiliza-se o hook de deletar para solicitar a exclusão passando o id do cliente
    if (confirm(`Deseja realmente exluir o cliente ${nome}?`)) {
      const deletado = await deletarCliente(idCliente);
      alert(`Cliente ${nome} deletado com sucesso! `);
      window.location.reload();
    }
  };

  // PARTE DE FILTROS
  // Variaveis para os filtros
  const [buscaNome, setBuscaNome] = useState();
  const [buscaTipo, setBuscaTipo] = useState();

  // Lógica do filtro
  const clientesFiltrados = clientes.filter((cli) => {
    // Verifica se o que esta na caixinha tem semelhança com algum nome de cliente
    const nomeCorresponde = cli.nome
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    // Verifica se o qeu est no filtro do dropdown tem semelhança com algum tipo de cliente
    const tipoCorresponde = buscaTipo
      ? cli.tipo?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  return (
    <div>
      <h1 className="text-center"> Ver Clientes </h1>

      {/* INÍCIO DO FILTRO */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        {/* Caixinha */}
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
          <Form.Control
            placeholder="Procure um cliente"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          ></Form.Control>
          <Button variant="primary" id="botao-filtrar">
            <BsSearch />
            Pesquisar
          </Button>
        </InputGroup>
        {/* Select */}
        <DropdownButton
          id="dropdown-categoria"
          title={buscaTipo || "Todas as categorias"}
          variant="secondary"
          className="mb-3"
        >
          <DropdownItem onClick={() => setBuscaTipo("")}>Todas</DropdownItem>
          <DropdownItem onClick={() => setBuscaTipo("PF")}>PF</DropdownItem>
          <DropdownItem onClick={() => setBuscaTipo("PJ")}>PJ</DropdownItem>
        </DropdownButton>
      </div>
      {/* FIM DO FILTRO */}

      {/* INÍCIO DA TABELA */}
      <Table striped bordered hover>
        {/* Cabeçalho da tabela */}
        <thead>
          {/* Coluna do cabeçalho */}
          <tr>
            <th>Id</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Tipo</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        {/* Corpo da tabela */}
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cli) => (
              <tr key={cli.id}>
                <td>{cli.id}</td>
                <td>{cli.nome}</td>
                <td>{cli.email}</td>
                <td>{cli.documento}</td>
                <td>{cli.tipo}</td>
                <td>{cli.telefone}</td>
                <td>{cli.endereco.cidade}</td>
                <td>{cli.status}</td>
                <td>
                  {/* Editar */}
                  <Button
                    as={Link}
                    to={`/clientes/eidtar/${cli.id}`}
                    size="sm"
                    variant="warning"
                    className="mx-2"
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="mx-2"
                    onClick={() => {
                      handleDelete(cli.id, cli.nome);
                    }}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            // Caso não haja clientes na lista
            <tr>
              <td colSpan={9} className="texte-center">
                Nenhum cliente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* FIM DA TABELA */}
    </div>
  );
};

export default VerClientes;
