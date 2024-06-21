import { instance } from "@viz-js/viz";
import { useEffect, useState } from "react";
import FormalAutomaton from "../processing/FormalAutomaton";

const Diagram = ({ grammar }) => {

  const [ diagram, setDiagram ] = useState('');
  
  useEffect(() => {

    async function renderDiagram() {
      
      if(grammar) {
        const formalDiagram = new FormalAutomaton(grammar.V, grammar.T, grammar.P, grammar.S);
        const dot = formalDiagram.generateDot();
        const viz = await instance();
        const svg = viz.renderSVGElement(dot);
        setDiagram(svg.outerHTML);
      }
    }

    renderDiagram();
  }, [ grammar ]);

  return (
    <div className="containerDiagrama">
    <h2>Diagrama de Estados (&#948;)</h2>
      <div className="diagrama" dangerouslySetInnerHTML={{ __html: diagram }} />
    </div>
  );
}



export default Diagram;