import { useState, useRef, useEffect } from "react";
import { Form, Row, Col, InputGroup, Button, Container } from "react-bootstrap";
import TelaCarregamento from "../TelasDeCadastro/TelaCarregamento.js";
import TelaErro from "../TelasDeCadastro/TelaErro.js";
import STATUS from "../Utilitarios/util.js";

export default function FormCadCliente(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [status, setStatus] = useState(STATUS.carregado);
  //const [validacao, setValidacao] = useState(false);

  const cpf = useRef("");
  const nome = useRef("");
  const sobrenome = useRef("");
  const dataNasc = useRef("");
  const cidade = useRef("");
  const uf = useRef("");
  const cep = useRef("");
  const email = useRef("");

  function buscaCliente() {
    fetch("http://localhost:5000/cliente", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        setFormValidado(dados);
        setStatus(STATUS.carregado);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
      });
  }

  function cadastrarCliente(cliente) {
    if (!props.EditaCliente) {
      fetch("http://localhost:5000/cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          alert(dados.mensagem);
          props.buscaCliente.push(cliente);
          props.onTabela(true);
        })
        .catch((erro) => {
          setStatus(STATUS.erro);
        });
    } else {
      fetch("http://localhost:5000/cliente", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          alert(dados.mensagem);
          props.buscaCliente();
          props.onTabela(true);
        })
        .catch((erro) => {
          setStatus(STATUS.erro);
        });
    }
  }

  function preparaTela(cliente) {
    if (props.EditarCliente) {
      cpf.current.value = cliente.cpf;
      nome.current.value = cliente.nome;
      sobrenome.current.value = cliente.sobrenome;
      dataNasc.current.value = cliente.dataNasc;
      cidade.current.value = cliente.cidade;
      uf.current.value = cliente.uf;
      cep.current.value = cliente.cep;
      email.current.value = cliente.email;
    }
  }

  function validaDados() {
    const cliente = {
      cpf: cpf.current.value,
      nome: nome.current.value,
      sobrenome: sobrenome.current.value,
      dataNasc: dataNasc.current.value,
      cidade: cidade.current.value,
      uf: uf.current.value,
      cep: cep.current.value,
      email: email.current.value,
    }
    if (
      cliente.cpf &&
      cliente.nome &&
      cliente.sobrenome &&
      cliente.dataNasc &&
      cliente.cidade &&
      cliente.uf &&
      cliente.cep &&
      cliente.email
    )
      return cliente;
    else 
      return console.log("Preencha os campos corretamente");
  }

  function manipulaSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const cliente = validaDados();
      if (cliente) {
        setStatus(STATUS.ocioso);
        cadastrarCliente(cliente);
        setStatus(STATUS.carregado);
      }
    }
    evento.preventDefault();
    evento.stopPropagation();
    setFormValidado(true);
  }

  useEffect(() => {
    preparaTela(props.cliente);
    buscaCliente();
  }, []);

  if (status == STATUS.carregado) {
    return (
      <Container>
        <Row className="mt-3 mb-3 border d-flex text-center">
          <h2>Cadastro de Clientes</h2>
        </Row>
        <Row className="mt-3 p-2 border">
          <Row>
            <Form
              noValidate
              validated={formValidado}
              onSubmit={manipulaSubmissao}
            >
              <Row className="mb-3">
                <Row>
                  <Form.Group as={Col} md="2">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      id="cpf"
                      name="cpf"
                      disabled={props.EditaCliente ? "disabled" : ""}
                      required
                      type="text"
                      placeHolder="111.111.111-11"
                      ref={cpf}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, Digite o CPF do cliente
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="2">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      id="nome"
                      name="nome"
                      required
                      type="text"
                      placeHolder="Ex: José"
                      ref={nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, informe o nome do cliente
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control
                      id="sobrenome"
                      name="sobrenome"
                      required
                      type="text"
                      placeHolder="Ex: Antonio da Silva"
                      ref={sobrenome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, informe sobrenome!
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                  <InputGroup>
                    <Form.Group controlId="dataNasc">
                      <Form.Label>Data de Nascimento</Form.Label>
                      <Form.Control type="date" ref={dataNasc} />
                    </Form.Group>

                    <Form.Control.Feedback type="invalid">
                      Por favor, informe a data de nascimento do cliente!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                </Row>                
                
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    id="cidade"
                    name="cidade"
                    type="text"
                    placeHolder="Presidente Prudente"
                    required
                    ref={cidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe a cidade.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    id="uf"
                    name="uf"
                    placeHolder="SP"
                    required
                    ref={uf}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe o estado!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    id="cep"
                    name="cep"
                    placeHolder="CEP"
                    required
                    ref={cep}
                  />
                  <Form.Control.Feedback type="invalid">
                    Informe CEP válido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="5">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    name="email"
                    placeHolder="E-mail"
                    required
                    ref={email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Informe um endereço de e-mail.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit">Cadastrar</Button>
              <Button
                type="button"
                onClick={() => {
                  props.onTabela(true);
                }}
              >
                Voltar
              </Button>
            </Form>
          </Row>
        </Row>
      </Container>
    );
  } else if (status == STATUS.ocioso) {
    return <TelaCarregamento />;
  } else {
    return (
      <TelaErro mensagem="Não foi possível recuperar os dados dos clientes. Entre em contato com o administrador do sistema" />
    );
  }
}
