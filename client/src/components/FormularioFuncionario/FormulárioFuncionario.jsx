// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { useNavigate, useParams } from "react-router-dom";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Importando o hook useInserirFuncionario
import {
  useInserirFuncionario
} from "../../hooks/useFuncionarios";

const FormularioFuncionario = (props) => {
  // IMPORTAÇÃO E USO DO HOOK FORM
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // IMPORTAÇÃO DOS HOOKS PARA INSERIR, E ATUALIZAR
  // Usando a funcao de inserir Funcionario vinda do hook
  const { inserirFuncionario } = useInserirFuncionario();

  // Criando o navigate
  const navigate = useNavigate();

  //Link Funcionario sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  // Caso o campo de imagem recebe um novo valor, atualiza a imagem de acordo com o campo
  const imagemAtual = watch("imagemUrl");

  // FUNCOES QUE LIDAM COM O SUCESSO E ERRO DO FORMULÁRIO
  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      // Envia o objeto data para o hook inserir o Funcionario
      inserirFuncionario(data);
      alert("Funcionario cadastrado com sucesso!");
    } else {

    }
    navigate("/home");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col md={12} lg={6}>
            {/* Caixinha de nome */}
            <FloatingLabel
              controlId="floatingInputNome"
              label="Nome"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o nome do produto"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O nome deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>

            {/* Caixinha de email */}
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-5"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Email inválido",
                  },
                  validate: (value) => value.includes("@") || "Email inválido",
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>

            {/* Caixinha de senha */}
            <FloatingLabel
              controlId="floatingPassword"
              label="Senha"
              className="mb-5"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("senha", {
                  required: "A senha é obrigatória",
                })}
              />
              {errors.senha && <p className="error">{errors.senha.message}</p>}
            </FloatingLabel>

            {/* Select de tipo */}
            <FloatingLabel
              controlId="floatingSelectTipo"
              label="Tipo de Funcionário"
              className="mb-5"
            >
              <Form.Select
                {...register("tipo", {
                  validate: (value) => value !== "0" || "Escolha um tipo",
                })}
              >
                <option value="0"> Escolha uma categoria </option>
                <option value="Funcionário"> Funcionário </option>
                <option value="Gerente"> Gerente </option>
                <option value="Administrador"> Administrador </option>
              </Form.Select>
              {errors.categoria && (
                <p className="error">{errors.categoria.message}</p>
              )}
            </FloatingLabel>
          </Col>
          <Col md={12} lg={6}>
            <Form.Group controlId="formFileLg" className="mb-5">
              {/* Caixinha de imagem */}
              <FloatingLabel
                controlId="floatingInputImagem"
                label="Envie o link da imagem do funcionário"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Envie o link da imagem do funcionário"
                  {...register("imagemUrl", {
                    required: "A imagem é obrigatória",
                    pattern: {
                      value: /^(http|https):\/\/[^ "]+$/,
                      message: "Insira um link válido",
                    },
                  })}
                />
                {errors.imagemUrl && (
                  <p className="error">{errors.imagemUrl.message}</p>
                )}
              </FloatingLabel>
              <Image
                src={imagemAtual == "" ? linkImagem : imagemAtual}
                rounded
                width={200}
                height={200}
              />
            </Form.Group>
            {/* Botão para enviar o formulário de cadastro de produto */}
            <Button variant="primary" size="lg" type="submit">
              {props.page === "editar" ? "Atualizar" : "Cadastrar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormularioFuncionario;
