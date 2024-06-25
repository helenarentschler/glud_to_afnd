import { useEffect, useReducer, useState } from "react";
import FormalGrammar from "../processing/FormalGrammar";

const Form = ({ setGlobalGrammar }) => {

    const formalGrammar = new FormalGrammar();

    const [ G, dispatchG ] = useReducer(formalGrammar.reducer, formalGrammar.baseView);
    const [ checkedG, setCheckedG ] = useState(formalGrammar.baseChecked);

    useEffect(() => {
        setGlobalGrammar(checkedG);
    }, []);
    
    function handleChange(set, i, event) {
        dispatchG({ type: 'updateSet',  payload: { set, i, event }});
    }

    function handleChangeP(i, j, event) {
        dispatchG({ type: 'updateProduction',  payload: { i, j, event }});
    }

    function handleChangeS(event) {
        dispatchG({ type: 'updateS', payload: { event }});
    }

    function handleAdd(set) {
        dispatchG({ type: 'addSetElement',  payload: { set }});
    }

    function handleAddRule(i) {
        dispatchG({ type: 'addRule',  payload: { i }});
    }

    function handleAddRuleSet() {
        dispatchG({ type: 'addRuleSet'});
    }

    function handleSubmit(event) {

        event.preventDefault();
        try {
            formalGrammar.checkGrammarSubmit(G);
            console.log(checkedG);
            setGlobalGrammar(checkedG);
        } catch (error) {
            alert(error.message);
        }
      
    }

    function handleBlur(set) {
        dispatchG({ type: 'checkInput', payload: { set }});
    }

    function handleBlurP(i, j, event) {
        console.log(event.target.value)
        let finalG = formalGrammar.verifyProductions(checkedG, G, i, j, event.target.value);
        setCheckedG(finalG);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Gramática</h1>
            {Object.keys(G).slice(0, 2).map((set) => (
                <div key={set} id={set}>
                    <span>{set}: </span>
                    {G[set].map((el, i) => (
                        <input 
                            id={set+i}
                            type="text" 
                            key={i} 
                            value={el} 
                            onChange={(event) => handleChange(set, i, event)} 
                            onBlur={() => handleBlur(set)}
                            autoFocus={G[set].length - 1 === i}
                        />
                    ))}
                    <button type="button" onClick={() => handleAdd(set)}>+</button>
                </div>
            ))}
            <div id="P">
                <span>P: {"{"}</span> 
                <div>
                {G.P.map((rule, i) => (
                    <div className="rule" key={i}>
                        <input 
                            type="text" 
                            value={rule[0]} 
                            onChange={(event) => handleChangeP(i, 0, event)}
                            onBlur={(event) => handleBlurP(i, 0, event)} 
                            autoFocus= {G.P[i].length <= 2}
                        />
                        <span> ⭢ </span>
                        <div>
                            {rule.slice(1).map((el, j) => (
                                <input 
                                    type="text" 
                                    key={j + 1} 
                                    value={el} 
                                    onChange={(event) => handleChangeP(i, j + 1, event)}
                                    onBlur={(event) => handleBlurP(i, j + 1, event)} 
                                    autoFocus={
                                        G.P[i].length > 2  &&
                                        G.P[i].length - 1 === j + 1
                                    }
                                />
                            ))}
                        </div>
                        <button type="button" onClick={() => handleAddRule(i)}>+</button>
                    </div>
                ))}
                </div>
                <button type="button" onClick={handleAddRuleSet}>+</button>
                {"}"}
            </div>
            <div id="S">
                <span>S: </span>
                <input 
                    type="text" 
                    name="S"
                    defaultValue={G.S} 
                    onBlur={(event) => handleChangeS(event)} 
                />
            </div>
            <button className="submit" type="submit">Gerar Autômato</button>
        </form>
    );
};

export default Form;