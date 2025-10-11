// Importação dos componentes do bootstrap
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

// Importação do ícone de logn
import { BsBoxArrowInRight } from "react-icons/bs";

const Login = () => {
  return (
    <div>
      <Container className="justify-content-center align-content-center min-vh-100">
        {/* Linha para campos de login e icone */}
        <Row className="bg-success">
          {/* Coluna com o ícone da página */}
          <Col>
             {/* ícone de login */}
             <BsBoxArrowInRight style={{fontSize:"500px", color:"white"}}/>
          </Col>
          {/* Coluna com o campos dae login */}
          <Col className="d-flex flex-column">
            <Form style={{width: "75%", margin:"auto", textAlign:"center"}}>
              {/* Caixinha de email */}
              <FloatingLabel 
                controlId="InputEmail"
                label="Email"
                className="mb-5"
                >
                <Form.Control type="email"/>
              </FloatingLabel>
              {/* Fim da caixinha de email */}
              
              
                {/* Caixinha de senha */}
                <FloatingLabel 
                controlId="InputSenha"
                label="Senha"
                className="mb-5">
               
                <Form.Control type="password"/>
              </FloatingLabel>
              
              {/* Fim da caixinha de senha */}
              <Button variant="primary" type="submit" className="mb-5" size="lg">
                Login
              </Button>
              <Alert variant="danger" className="my-3 w-75 mx-auto">
                Email ou senha inválidos!
              </Alert>
              {/* Fim do alerta de email ou senha inválidos */}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login