import { Container } from "react-bootstrap";

export default function Rodape(props){
  return (
    <Container className='bg-light blue border text-center' style={{
     'position':'fixed',
     'bottom':'0'
     } }>
       <h5>{props.texto || "Informe o texto do rodapé"}</h5>
       </Container>    
 );
}