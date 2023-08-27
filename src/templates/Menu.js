import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default function Menu(props){
    return(<Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to="/"><Navbar.Brand>Menu de Gerenciamento</Navbar.Brand></LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Cadastro" id="basic-nav-dropdown">
            <LinkContainer to="/quarto"><NavDropdown.Item>Quarto</NavDropdown.Item></LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/tipoquarto"><NavDropdown.Item>Tipos de Quartos</NavDropdown.Item></LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

    );
}