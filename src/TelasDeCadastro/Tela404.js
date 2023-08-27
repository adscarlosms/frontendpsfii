import Pagina from "../templates/Pagina";

export default function Tela404(props){
    return(
        <Pagina>
            <div className="center">
                <p>A página solicitada não existe!</p>
                <p>Use o menu do sistema para selecionar a opção correta!</p>
            </div>
        </Pagina>

    );
}