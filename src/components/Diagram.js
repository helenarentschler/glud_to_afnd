import { instance } from "@viz-js/viz";
import { useEffect, useState } from "react";
import FormalAutomaton from "../processing/FormalAutomaton";

const Diagram = ({ automaton }) => {

  const [ diagram, setDiagram ] = useState('');
  
  useEffect(() => {

    async function renderDiagram() {
      
      if(automaton) {
        const dot = automaton.generateDot();
        const viz = await instance();
        const svg = viz.renderSVGElement(dot);
        setDiagram(svg.outerHTML);
      }
    }

    renderDiagram();
  }, [ automaton ]);

  return (
    <div className="containerDiagrama">
    <h2>Diagrama de Estados (&#948;)</h2>
      <div className="diagrama" dangerouslySetInnerHTML={{ __html: diagram }} />
    </div>
  );
}



export default Diagram;