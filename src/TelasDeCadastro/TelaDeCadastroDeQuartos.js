import Pagina from "../templates/Pagina";
import FormCadQuartos from "../formularios/FormCadQuartos";
import TabelaDeQuartos from "../tabelas/tabelaDeQuartos";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../Utilitarios/util";

export default function TelaCadastroDeQuartos(props){

    function buscarQuartos(){
        fetch('http://localhost:5000/quarto',{method:"GET"})
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaQuartos(dados);
            setStatus(STATUS.carregado);      
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
            
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaQuartos, setListaQuartos] = useState([]);
    const [tipoquartoSelecionado, setTipoQuartoSelecionado] = useState({});
  
   
    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarQuartos();
    },[])

  
    if(exibirTabela){

        if (status === STATUS.ocioso){
           return(
            <TelaCarregamento/>
                 );
    }
    else if (status === STATUS.carregado) {
        return(
            <Pagina>
                <TabelaDeQuartos dados={listaQuartos} onTabela={setExibirTabela}/>
            </Pagina>
        );
    }
    else{
        return(
            <TelaErro mensagem="Não foi possível recuperar os dados dos quartos. 
            Por favor, entre em contato com a administração do sistema!"/>
        );
    }
}
else {
    return(
        <Pagina>
            <FormCadQuartos onTabela={setExibirTabela} listaCamareiros={listaQuartos}/>
        </Pagina>
    );
}
    
}