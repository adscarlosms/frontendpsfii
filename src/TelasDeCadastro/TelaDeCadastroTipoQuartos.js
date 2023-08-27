import Pagina from "../templates/Pagina";
import FormCadTipoQuartos from "../formularios/FormCadTipoQuartos";
import TabelaTipoQuartos from "../tabelas/tabelaTipoQuartos";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../Utilitarios/util";

export default function TelaCadastroTipoQuartos(props){

    function buscarTipoQuartos(){
        fetch('http://localhost:5000/tipoquarto',{method:"GET"})
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaTipoQuartos(dados);
            setStatus(STATUS.carregado);      
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
            
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaTipoQuartos, setListaTipoQuartos] = useState([]);
    const [tipoquartoSelecionado, setTipoQuartoSelecionado] = useState({});
  
   
    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarTipoQuartos();
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
                <TabelaTipoQuartos dados={listaTipoQuartos} onTabela={setExibirTabela}/>
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
            <FormCadTipoQuartos onTabela={setExibirTabela} listaTiposQuartos={listaTipoQuartos}/>
        </Pagina>
    );
}
    
}