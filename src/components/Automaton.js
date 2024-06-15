import { instance } from "@viz-js/viz";
import { useEffect, useState } from "react";
import FormalAutomaton from "../processing/FormalAutomaton";

const Automaton = ({ grammar }) => {

  const [ automaton, setAutomaton ] = useState('');
  
  useEffect(() => {

    async function renderAutomaton() {
      
      if(grammar) {
        console.log(grammar);
        const formalAutomaton = new FormalAutomaton(grammar.V, grammar.T, grammar.P, grammar.S);
        const dot = formalAutomaton.generateDot();
        console.log(dot)
        const viz = await instance();
        const svg = viz.renderSVGElement(dot);
        setAutomaton(svg.outerHTML);
      }
    }

    renderAutomaton();
  }, [ grammar ]);

  return (
    <div className="Diagrama" dangerouslySetInnerHTML={{ __html: automaton }} />
  );
}



export default Automaton;