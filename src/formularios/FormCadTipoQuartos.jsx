import { useState, useEffect } from "react";
import {Form, Row, Col, InputGroup, Button, Container} from "react-bootstrap";


export default function FormCadTipoQuartos(props) {
  const [validacao, setValidacao] = useState(false);
  const [listaTipoQuartos, setListaTipoQuartos] = useState([]);
  const [tipoQuartoSelecionado, setTipoQuartoSelecionado] = useState({});

  const [tipo_quarto, setQuarto] = useState({
    codigo : 0,
    descricao : "",
    preco : 0,
  });

  useEffect(() => {
    fetch('http://localhost:5000/tipoquarto/', {method: "GET"})
    .then((resposta) => {
        return resposta.json();
    })
    .then((listaTipoQuartos)=>{
      setListaTipoQuartos(listaTipoQuartos);
    })
    .catch((erro) => {
        console.log("Não foi possível recuperar dados do tipo do quarto no backend");
    });
  },[]);

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if(e.target.type === "checkbox"){
      setQuarto({...listaTipoQuartos, [alvo]: e.target.checked});
    }
    else{
      setQuarto({...listaTipoQuartos, [alvo]: e.target.value});
      console.log("O usuário digitou: " + e.target.value);
    }
  }

  function gravarTipoQuarto(){
    fetch('http://localhost:5000/tipoquarto/', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({         
        "codigo": tipo_quarto.codigo,
        "descricao": tipo_quarto.descricao,
        "preco": tipo_quarto.preco, 
      })

    })
    .then((resposta) => {
        return resposta.json();
    })
    .then((listaTipoQuartos)=>{
      setListaTipoQuartos(listaTipoQuartos);
    })
    .catch((erro) => {
        erro.message("Não foi possível gravar o Tipo de Quarto");
    });
  }

  const manipulaSubmissao = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
       setValidacao(false);
       gravarTipoQuarto();
    }
    else{
       setValidacao(true);
    }
    event.preventDefault();
    event.stopPropagation();

  };

  return (
    <Container>
      <Row className="mt-3 mb-3 border d-flex text-center">
        <h2>Cadastro de Tipos de Quartos</h2>
      </Row>
      <Row>
        <Form noValidate validated={validacao} onSubmit={manipulaSubmissao}>
          <Form.Group as={Col} md="1">
              <Form.Label>descricao</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
                  id="descricao"
                  name="descricao"   
                  value = {tipo_quarto.descricao}  
                  onChange={manipularMudanca}                               
                />
                <Form.Control.Feedback type="invalid">
                   Informe a descrição!
                </Form.Control.Feedback>
              </InputGroup>
          </Form.Group> 
          <Form.Group as={Col} md="1">
              <Form.Label>Preço</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
                  id="preco"
                  name="preco"   
                  value = {tipo_quarto.preco}  
                  onChange={manipularMudanca}                               
                />
                <Form.Control.Feedback type="invalid">
                   Informe o Preço!
                </Form.Control.Feedback>
              </InputGroup>
          </Form.Group>          
          
          <Button type="submit">Cadastrar</Button>
          <Button
            type="button"
            onClick={() => {
              
            }}
          >
            Voltar
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
