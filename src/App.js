import './App.css';
import Form from './components/Form';
import Automaton from './components/Automaton';
import Sobre from './components/Sobre';
import FormalDef from './components/FormalDef';
function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Conversor de Gramática Regular para Autômato - GLUD para AFND-&#949;</h1>
      </div>
      <div className="container">
        <Form/>
        <FormalDef/>
        <Sobre/> 
      </div>
      <hr></hr>
      <Automaton/>
    </div>
  );
}

export default App;
