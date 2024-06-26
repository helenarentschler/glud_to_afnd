import './App.css';
import Form from './components/Form';
import Diagram from './components/Diagram';
import Sobre from './components/Sobre';
import FormalDef from './components/FormalDef';
import { useEffect, useState } from 'react';
import FormalAutomaton from './processing/FormalAutomaton';

function App() {

  const [ grammar, setGrammar ] = useState(null);
  const [ automaton, setAutomaton ] = useState(null);
  
  useEffect(() => {
    
    if(grammar) {
      const formalAutomaton = new FormalAutomaton(grammar.V, grammar.T, grammar.P, grammar.S);
      setAutomaton(formalAutomaton);
    }

  }, [grammar]);

  return (
    <div className="App">
      <header>
        <h1>Conversor de Gramática Regular para Autômato - GLUD para AFND-&#949;</h1>
      </header>
      <div className="container">
        <Form setGlobalGrammar={setGrammar}/>
        <Sobre/> 
      </div>
      <hr></hr>
        <FormalDef automaton={automaton}/>
        <Diagram automaton={automaton}/>
        <footer>
        <div>
          Desenvolvido com <a href="https://react.dev/">React.js</a>, <a href="https://nodejs.org/">Node.js</a> and <a href="https://viz-js.com">Viz.js</a>
        </div>
        <div>
          Criado por <a href="https://github.com/helenarentschler">Helena Rentschler</a> e <a href="https://github.com/alessipg">Gabriel Alessi Posonski</a>. Código-fonte disponível no <a href="https://github.com/helenarentschler/glud_to_afnd">Github.</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
