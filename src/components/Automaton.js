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
    <div dangerouslySetInnerHTML={{ __html: automaton }} />
  );
}



export default Automaton;