import { useEffect, useState } from "react";
import Automaton from "../models/Automaton";

const FormalDef = ({automaton}) =>{
    
    const [ A, setA ] = useState(new Automaton([],[], "", [], []));

    useEffect(() => {
        if(automaton) {
          setA(automaton);
        }
    }, [automaton])

    return (
        <div className="formalDef">
          <h2>Definição Formal</h2>
           <div className="containerDef">
            <div>
            <p>&#931;</p>
              <p>Q</p>
              <p>&#948;</p>
              <p>q&#8320;</p>
              <p>F</p>
            </div>
            <div>
              <p>= &#123; {console.log(A)}&#125;</p>
              <p>= &#123;&#125;</p>
              <p>=</p>
              <p>=</p>
              <p>=&#123;&#125;</p>
            </div>
          </div>
        </div>
    )
}
export default FormalDef;
