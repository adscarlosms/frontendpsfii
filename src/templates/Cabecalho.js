import { Container } from "react-bootstrap";
export default function Cabecalho(props){
    return (
        <Container className="w-100 bg-light border d-flex justify-content-center align-content-center">
          <h1>{props.titulo || "Sistema Hoteleiro..."}</h1>
        </Container>
    );
}
