import {Form, Row, Col, InputGroup, Button, Container} from "react-bootstrap";
import BarraBusca from "../componentes/busca/BarraBusca";
import React, { useState, useEffect, useRef } from 'react';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento';
import STATUS from '../Utilitarios/util';
import TelaErro from '../TelasDeCadastro/TelaErro';

export default function FormCadQuartos(props) {

  function gravarQuarto(){
    fetch('http://localhost:5000/quarto/', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({         
        "numero": quarto.numero,
        "andar": quarto.andar,
        "status": quarto.status,
        "quarto": {
                     "codigo": tipoquartoSelecionado.codigo
                  }   
      })

    })
    .then((resposta) => {
        return resposta.json();
    })
    .then((listaQuartos)=>{
        setListaQuartos(listaQuartos);
    })
    .catch((erro) => {
        erro.message("Não foi possível gravar o Quarto");
    });
  }

  const [validacao, setValidacao] = useState(false);
  const [listaQuartos, setListaQuartos] = useState([]);
  const [tipoquartoSelecionado, setTipoQuartoSelecionado] = useState({});

  const [status, setStatus] = useState(STATUS.carregado);

  const [quarto, setQuarto] = useState({
    numero : 0,
    andar : "",
    status : "",
  });

  useEffect(() => {
    fetch('http://localhost:5000/tipoquarto/', {method: "GET"})
    .then((resposta) => {
        return resposta.json();
    })
    .then((listaQuartos)=>{
        setListaQuartos(listaQuartos);
    })
    .catch((erro) => {
        console.log("Não foi possível recuperar dados do quarto no backend");
    });
  },[]);

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if(e.target.type === "checkbox"){
      setQuarto({...listaQuartos, [alvo]: e.target.checked});
    }
    else{
      setQuarto({...listaQuartos, [alvo]: e.target.value});
      console.log("O usuário digitou: " + e.target.value);
    }
  }

    const manipulaSubmissao = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
       setValidacao(false);
       setStatus(STATUS.ocioso);
       gravarQuarto();
    }
    else{
       setValidacao(true);
    }
    event.preventDefault();
    event.stopPropagation();

  };

  if (status == STATUS.carregado) {  
    return (
      <Container>
        <Row className="mt-3 mb-3 border d-flex text-center">
          <h2>Cadastro de Quartos</h2>
        </Row>
        <Row>
          <Form noValidate validated={validacao} onSubmit={manipulaSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="1">
                <Form.Label>NºQuarto</Form.Label>
                <Form.Control
                  id="numero"
                  name="numero"
                  required
                  type="number"
                  placeholder="Nº do Quarto"
                  value = {quarto.numero}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                  Informe o Número do Quarto!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group as={Col} md="1">
                <Form.Label>Andar</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    id="andar"
                    name="andar"   
                    value = {quarto.andar}  
                    onChange={manipularMudanca}                               
                  />
                  <Form.Control.Feedback type="invalid">
                     Informe o Andar em que se localiza o Quarto!
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>          
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="status"
                  name="status"
                  onChange={manipularMudanca}
                >
                  <option value="disponível">Disponível</option>
                  <option value="ocupado">ocupado</option>
  
                </Form.Select>
              </Form.Group>
             
            </Row>
            <Form.Group as={Col} md="5">
            <Row className="mb-2">
               <BarraBusca campoBusca={"descricao"}
                           campoChave={"codigo"}
                           dados={listaQuartos}
                           funcaoSelecao={setListaQuartos} 
                           placeHolder={"Selecione um Quarto"}
                           valor=""
                           />
            </Row>
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
  else if (status == STATUS.ocioso){
    return (
      <TelaCarregamento/>
    );
   }
   else{
    return(
      <TelaErro mensagem="Não foi possível gravar o(a) camareiro(a). 
      Por favor, entre em contato com a administração do sistema!"/>
    );
   }
  
}
