import {
  Button,
  Container,
  Row,
  Table,
  Col,
  InputGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

export default function TabelaDeClientes(props) {
  const cpf = useRef("");

  return (
    <Container>
      <Row className="mt-3 mb-3 border d-flex text-center">
        <h2>Formulário de Cadastro de Cliente</h2>
      </Row>
      <Row>
        <Col as={Col} md="7">
          <Button
            onClick={() => {
              props.editaCliente({}, false);
              props.onTabela(false);
            }}
          >
            Novo Cliente
          </Button>
        </Col>
      </Row>
      <Row className="mt-3 p-2 border">
        <Table striped bordered hover size="sm" style={{ fontSize: '0.7em' }}>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Data Nascimento</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>CEP</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((cliente) => {
              return (
                <tr key={cliente.cpf}>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.sobrenome}</td>
                  <td>{cliente.dataNasc}</td>
                  <td>{cliente.cidade}</td>
                  <td>{cliente.uf}</td>
                  <td>{cliente.cep}</td>
                  <td>{cliente.email}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      style={{ marginRight: "3px" }}
                      size="sm"
                      variant="warning"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          props.editaCliente(cliente, true);
                        }}
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </Button>
                    {}
                    <Button size="sm" variant="danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          props.excluiCliente(cliente, true);
                        }}
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
