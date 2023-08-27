import Pagina from "../templates/Pagina";
import { Alert } from "react-bootstrap";

export default function TelaErro(props){
    return(
        <Pagina>
            <div className="center">
            <Alert variant="danger">
               {props.mensagem}
            </Alert>
            </div>
        </Pagina>

    );
}