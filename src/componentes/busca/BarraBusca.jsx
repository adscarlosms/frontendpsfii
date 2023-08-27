import { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./barraBusca.css";

export default function BarraBusca({
  placeHolder,
  dados,
  campoChave,
  campoBusca,
  funcaoSelecao,
  valor,
}) {
  //manipula o input (ciclo de vida)
  const inputBusca = useRef();
  //definição dos estados do componente
  const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
  const [dadosLista, setDadosLista] = useState(dados);
  const [itemSelecionado, setItemSelecionado] = useState(false);

  function filtrarResultado(termo) {
    //exige que o termo da busca seja conhecido e que seja utilizado como
    //critério de seleção
    setDadosLista(
      dados.filter((item) => 
      {
       return termo.length > 1 ? item[campoBusca].toLowerCase().includes(termo.toLowerCase()): false;
      }));

    let componenteResultado = document.querySelector("[data-resultado]");

    if (dados.length > 0) {
      componenteResultado.style.display = "block";
    } else {
      componenteResultado.style.display = "none";
    }
  }

  return (
    <Container>
      <div className="barra">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>

        <Form.Control
          type="text"
          placeholder={placeHolder}
          value={termoBusca}
          required
          ref={inputBusca}
          onChange={(f) => {
            setTermoBusca(f.target.value.toLowerCase());
            filtrarResultado(f.target.value.toLowerCase());
            //testar se o elemento do input é válido ou não
            if (!itemSelecionado) {
              f.target.setAttribute("aria-invalid", true);
              f.target.setCustomValidity("ocorreu um erro..");
            } else {
              f.target.removeAttribute("aria-invalid");
              f.target.setCustomValidity("");
            }
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
          onClick=
          {() => {
            setTermoBusca("");
            filtrarResultado();
            setItemSelecionado("false");
            funcaoSelecao({});

            inputBusca.current.setAttribute("aria-invalid", true);
            inputBusca.current.setCustomValidity("erro ao apagar..");
          }}
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          
        </svg>

        <div className="resultado">
          <ul data-resultado>
            {dadosLista.map((item) => {
              return (
                <li
                  key={item[campoChave]}
                  //selecionar um item da lista
                  onClick={() => {
                    setTermoBusca(item[campoBusca]);
                    funcaoSelecao(item);
                    //informar que o componente está limpo, ou válido
                    inputBusca.current.setCustomValidity("");
                    //esconder a lista criada
                    let componenteResultado =
                      document.querySelector("[data-resultado]");
                    componenteResultado.style.display = "none";
                  }}
                >
                  {item[campoChave] + "-" + item[campoBusca]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
