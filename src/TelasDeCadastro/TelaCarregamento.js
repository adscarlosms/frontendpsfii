import Pagina from "../templates/Pagina";
import { Button, Spinner} from "react-bootstrap";

export default function TelaCarregamento(props){
    return(
        <Pagina>
            <div className="center">
            <Button variant="primary" disabled>
            <Spinner
               as="span"
               animation="grow"
               size="sm"
               role="status"
               aria-hidden="true"
             />
               {  } Carregando Tela, aguarde...
            </Button>
            </div>
        </Pagina>

    );
}