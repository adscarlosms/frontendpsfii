import { Container } from "react-bootstrap";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TelaMenu from "./TelasDeCadastro/TelaMenu";
import Tela404 from "./TelasDeCadastro/Tela404";
import TelaCadastroDeQuartos from "./TelasDeCadastro/TelaDeCadastroDeQuartos";
import TelaCadastroTipoQuartos from "./TelasDeCadastro/TelaDeCadastroTipoQuartos";
import TelaDeCadastroDeCliente from "./TelasDeCadastro/TelaDeCadastroDeCliente";


function App() {
  return (
    <Container className="w-100">
      <BrowserRouter>
      <Routes>
        <Route path="/cliente" element={<TelaDeCadastroDeCliente/>}/>
        <Route path="/quarto" element={<TelaCadastroDeQuartos/>}/> 
        <Route path="/tipoquarto" element={<TelaCadastroTipoQuartos/>}/>        
        <Route path="/" element={<TelaMenu/>}/>
        <Route path="*" element={<Tela404/>}/>
      </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
