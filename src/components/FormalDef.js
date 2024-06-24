import { useEffect, useState } from "react";
import Automaton from "../models/Automaton";

const FormalDef = ({ automaton }) => {
    
    const [A, setA] = useState(new Automaton([], [], "", [], []));

    useEffect(() => {
        if (automaton) {
            setA(automaton);
        }
    }, [automaton]);

    return (
        <div className="formalDef">
            <h2>Definição Formal</h2>
            <div className="containerDef">
              <div>
                  <p>&#931; = &#123;
                      {A.sigma.map((symbol, i) => (
                          <span key={i}>
                              {symbol}{A.sigma.length - 1 !== i ? "," : ""}
                          </span>
                      ))}
                      &#125;</p>
                  <p>Q = &#123;
                      {A.states.map((state, i) => (
                          <span key={i}>
                              {state}{A.states.length - 1 !== i ? "," : ""}
                          </span>
                      ))}
                      &#125;</p>
                  <p>&#948; = &#123;
                      {Object.keys(A.transitions).map((state, i) => (
                          Object.keys(A.transitions[state]).map((symbol, j) => (
                              A.transitions[state][symbol].map((nextState, k) => (
                                  <span key={`${i}-${j}-${k}`}>
                                    &#120691;
                                      {`(${state}, ${symbol}) = ${nextState}`}
                                      {i !== Object.keys(A.transitions).length - 1 ||
                                        j !== Object.keys(A.transitions[state]).length - 1 || 
                                        k !== A.transitions[state][symbol].length - 1 ? ", " : ""}
                                  </span>
                              ))
                          ))
                      ))}
                      &#125;</p>
                  <p>q&#8320; = {A.initialState}</p>
                  <p>F = &#123;
                      {A.finalStates}
                      &#125;</p>
              </div>
            </div>
        </div>
    );
}

export default FormalDef;
