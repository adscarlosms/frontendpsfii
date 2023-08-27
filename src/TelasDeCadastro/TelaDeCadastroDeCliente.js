import Pagina from "../templates/Pagina.js";
import FormCadCliente from "../formularios/FormCadCliente.js";
import TabelaDeClientes from "../tabelas/tabelaDeClientes.js";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento.js";
import TelaErro from "./TelaErro.js";
import STATUS from "../Utilitarios/util.js";

export default function TelaDeCadastroDeCliente(props) {
  const [status, setStatus] = useState(STATUS.ocioso);
  const [listaClientes, setListaClientes] = useState([]);
  const [exibirTabela, setExibirTabela] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [clienteEmEdicao, setClienteEmEdicao] = useState({
    cpf: "",
    nome: "",
    sobrenome: "",
    dataNasc: "",
    cidade: "",
    uf: "",
    cep: "",
    email: ""
  });

  function buscaClientes() {
    fetch("http://localhost:5000/cliente", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaClientes(dados);
        setStatus(STATUS.carregado);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
      });
  }

  function preparaClienteEdicao(cliente, edicao) {
    setAtualizando(edicao);
    setClienteEmEdicao(cliente);
    setExibirTabela(false);
  }

  function excluiCliente(cliente) {
    fetch("http://localhost:5000/cliente", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        alert(dados.mensagem);
        buscaClientes();
        setStatus(STATUS.carregado);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
      });
  }

  function alternarTelas() {
    setExibirTabela(!exibirTabela);
  }

  useEffect(() => {
    setStatus(STATUS.ocioso);
    buscaClientes();
  }, []);

  if (exibirTabela) {
    if (status === STATUS.ocioso) {
      return <TelaCarregamento />;
    } else if (status === STATUS.carregado) {
      return (
        <Pagina>
          <TabelaDeClientes
            dados={listaClientes}
            onTabela={setExibirTabela}
            editaCliente={preparaClienteEdicao}
            excluiCliente={excluiCliente}
            buscaClientes={buscaClientes}
          />
        </Pagina>
      );
    } else {
      return (
        <TelaErro mensagem="Não foi possível recuperar os dados dos Clientes. Entre em contato com o administrador do sistema." />
      );
    }
  } else {
    return (
      <Pagina>
        <FormCadCliente
          onTabela={setExibirTabela}
          listaClientes={listaClientes}
          buscaClientes={buscaClientes}
          chamarTabelaClientes={alternarTelas}
          editarCliente={atualizando}
          cliente={clienteEmEdicao}
          editaCliente={preparaClienteEdicao}
        />
      </Pagina>
    );
  }
}
