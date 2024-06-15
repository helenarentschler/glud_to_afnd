import { instance } from "@viz-js/viz";
import { useEffect, useState } from "react";

const Automaton = () => {

  const [ automaton, setAutomaton ] = useState('');
  
  useEffect(() => {

    async function renderAutomaton() {
      const viz = await instance();
      const svg = viz.renderSVGElement("digraph { a -> b }");
      setAutomaton(svg.outerHTML);
    }

    renderAutomaton();
  }, []);

  return (
    <div className="containerDiagrama">
    <h2>Diagrama de Estados (&#948;)</h2>
      <div className="diagrama" dangerouslySetInnerHTML={{ __html: automaton }} />
    </div>
  );
}



export default Automaton;