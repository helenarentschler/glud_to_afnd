
const Sobre = () => {
    return (
        <div className="Sobre">
            <h2>Sobre</h2>
            <p>
                Este Conversor de Gramática Regular para Autômato transforma Gramáticas Lineares Unitárias à Direita (GLUD) 
                em Autômatos Finitos Não Determinísticos com Transições Vazias (AFND-ε). 
                A ferramenta não realiza a conversão da gramática caso não esteja no formato GLUD, fazendo necessário ao usuário realizar a conversão.
            </p>
            <h3>Exemplo de Entrada</h3>
            <p>inserir um print </p>
            <p>
                O conversor gera um AFND-ε equivalente, fornecendo a definição formal e um diagrama de estados.
            </p>
        </div>
    )
}

export default Sobre;