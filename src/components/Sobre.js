
const Sobre = () => {
    return (
        <div className="sobre">
            <div>
                 <h2>Sobre</h2>
                <p>
                    Este Conversor de Gramática Regular para Autômato transforma Gramáticas Lineares Unitárias à Direita (GLUD) 
                    em Autômatos Finitos Não Determinísticos com Transições Vazias (AFND-&#949;). 
                    A ferramenta não realiza a conversão da gramática caso não esteja no formato GLUD, fazendo necessário ao usuário realizar a conversão.
                </p>
                <p>
                    O conversor gera um AFND-&#949; equivalente, fornecendo a definição formal e um diagrama de estados.
                </p>
            </div>
           <div>
                <h3>Orientações</h3>
                <ul>
                    <li>Espaços em branco são utilizados pelo conversor para diferenciar símbolos terminais de variáveis, portanto, não se deve utilizá-los ao definir um destes símbolos.</li>
                    
                    <li>Separar símbolo terminal de variável utilizando espaço em brancos</li>
                </ul>
           </div>
        </div>
    )
}

export default Sobre;