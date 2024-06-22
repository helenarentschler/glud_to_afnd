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
      <div className="header">
        <h1>Conversor de Gramática Regular para Autômato - GLUD para AFND-&#949;</h1>
      </div>
      <div className="container">
        <Form setGrammar={setGrammar}/>
        <Sobre/> 
      </div>
      <hr></hr>
        <FormalDef automaton={automaton}/>
      <Diagram automaton={automaton}/>
    </div>
  );
}

export default App;
