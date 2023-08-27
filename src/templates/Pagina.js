import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";

export default function Pagina(props){
    return(
        <div>
            <Cabecalho titulo="Sys Hotel"/>
            <Menu/>
            <div>
                {props.children}
            </div>
            <div>
                <Rodape texto="Presidente Prudente/SP"/>
            </div>
        </div>

    )
}