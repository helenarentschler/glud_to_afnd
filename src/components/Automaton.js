import { instance } from "@viz-js/viz";
import { useEffect, useState } from "react";
import FormalAutomaton from "../processing/FormalAutomaton";

const Automaton = ({ grammar }) => {

  const [ automaton, setAutomaton ] = useState('');
  
  useEffect(() => {

    async function renderAutomaton() {
      
      if(grammar) {
        const formalAutomaton = new FormalAutomaton(grammar.V, grammar.T, grammar.P, grammar.S);
        const dot = formalAutomaton.generateDot();
        const viz = await instance();
        const svg = viz.renderSVGElement(dot);
        setAutomaton(svg.outerHTML);
      }
    }

    renderAutomaton();
  }, [ grammar ]);

  return (
    <div className="containerDiagrama">
    <h2>Diagrama de Estados (&#948;)</h2>
      <div className="diagrama" dangerouslySetInnerHTML={{ __html: automaton }} />
    </div>
  );
}



export default Automaton;