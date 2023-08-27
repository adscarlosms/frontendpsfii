import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento';
import STATUS from '../Utilitarios/util';
import TelaErro from '../TelasDeCadastro/TelaErro';

export default function FormCadCamareiro(props){

      function cadastrarCamareiro(camareiro){
        fetch('http://localhost:4000/camareiro', {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(camareiro)
        }).then((resposta) => {
          return resposta.json();
        }).then((dados) => {  
            setStatus(STATUS.carregado);
            alert(dados.mensagem);
            props.listaCamareiros.push(camareiro);
            props.onTabela(true);          
        }).catch((erro) => {
            setStatus(STATUS.erro);
            console.log(erro.message);
        });
      }
    
        const [formValidado, setformValidado] = useState(false);
        const [status, setStatus] = useState(STATUS.carregado);
        const cpf = useRef("");
        const nome = useRef("");
        const dataNasc = useRef("");
        const endereco = useRef("");
        const bairro = useRef("");
        const cidade = useRef("");
        const uf = useRef("");
        const nis = useRef("");
        const genero = useRef("");

        function validarDados(){
          const camareiro = {
            cpf: cpf.current.value,
            nome: nome.current.value,
            dataNasc: dataNasc.current.value,
            endereco: endereco.current.value,
            bairro: bairro.current.value,
            cidade: cidade.current.value,
            uf: uf.current.value,
            nis: nis.current.value,
            genero: genero.current.value
          }
          if (camareiro.cpf && camareiro.dataNasc && camareiro.endereco && 
            camareiro.bairro && camareiro.cidade && camareiro.uf && camareiro.nis && camareiro.genero)
            return camareiro;
          else
            return undefined;
        }
       
      
        function manipularSubmissao(evento){
          const formulario = evento.currentTarget;
          if (formulario.checkValidity()) {
            const camareiro = validarDados();
            if (camareiro){
                setStatus(STATUS.ocioso);
                cadastrarCamareiro(camareiro);
                //props.listaCamareiros.push(camareiro); //gambiarra não
               }
          }
          evento.preventDefault();
          evento.stopPropagation();
      
          setformValidado(true);
        };

        if (status == STATUS.carregado) {      
        return (
        <Container>
            <Row className="mt-3 mb-3 border d-flex text-center">
                <h2>Cadastro de Camareiros</h2>
            </Row>
            <Row>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>CPF:</Form.Label>
                <Form.Control
                  id="cpf"
                  name="cpf"
                  required
                  type="text"
                  placeholder="CPF"
                  ref={cpf}
                />
                <Form.Control.Feedback type="invalid">
                Informe o cpf do(a) camareiro(a)!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Digite o nome do(a) camareiro(a)"
                  id="nome"
                  name="nome"
                  ref={nome}
                />
                <Form.Control.Feedback type="invalid">
                Informe o nome do camareiro!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="date" 
                placeholder="Data de nascimento" 
                id="dataNasc" 
                name="dataNasc"
                required
                ref={dataNasc}/>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe a data de nascimento do camareiro!
                </Form.Control.Feedback>
                </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Endereço</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    id="endereco"
                    nome="endereco"
                    required
                    ref={endereco}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe o endereço do camareiro!
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>Bairro</Form.Label>
                <Form.Control type="text" 
                placeholder="" 
                id="bairro" 
                name="bairro"
                required
                ref={bairro} />
                <Form.Control.Feedback type="invalid">
                  Informe o bairro do camareiro!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" 
                placeholder="" 
                id="cidade" 
                name="cidade"
                required
                ref={cidade} />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe a cidade do camareiro!
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                <Form.Label>UF</Form.Label>
                <Form.Control type="text" 
                placeholder="" 
                id="uf" 
                name="uf"
                required
                ref={uf} />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o estado do camareiro!
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                <Form.Label>NIS</Form.Label>
                <Form.Control type="text" 
                placeholder="" 
                id="nis" 
                name="nis"
                required
                ref={nis} />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o NIS do camareiro!
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                <Form.Label>Gênero</Form.Label>
                <Form.Control type="text" 
                placeholder="" 
                id="genero" 
                name="genero"
                required
                ref={genero} />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o gênero do camareiro!
                </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Button type="submit">Cadastrar Camareiro</Button>
                <Button type="button" onClick={ ()=>{
                  props.onTabela(true);
                }}>Voltar</Button>
                
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