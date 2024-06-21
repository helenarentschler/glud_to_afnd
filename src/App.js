import './App.css';
import Form from './components/Form';
import Automaton from './components/Automaton';
import Sobre from './components/Sobre';
import FormalDef from './components/FormalDef';
import { useState } from 'react';

function App() {

  const [ grammar, setGrammar ] = useState(null);

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
        <FormalDef/>
      <Automaton grammar={grammar}/>
    </div>
  );
}

export default App;
