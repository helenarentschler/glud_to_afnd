import './App.css';
import Form from './components/Form';
import Automaton from './components/Automaton';

function App() {
  return (
    <div className="App">
      <h1>Conversor de Gramatica Regular para Automato</h1>
      <Form />
      <Automaton />
    </div>
  );
}

export default App;
