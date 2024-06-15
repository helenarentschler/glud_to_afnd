import { useState } from "react";
import Grammar from "../models/Grammar";

const Form = ({ setGrammar }) => {

    const [ G, setG ] = useState(new Grammar());

    function handleChange(prop, i, event) {
        const newState = {...G};
        newState[prop][i] = event.target.value;
        setG(newState);
    }

    function handleAdd(prop) {
        const newState = {...G};
        newState[prop] = [...newState[prop], ""];
        setG(newState);
    }

    function handleChangeP(i, j, event) {
        const newState = {...G};
        newState.P[i][j] = event.target.value;
        setG(newState);
    }

    function handleAddRule(i) {
        const newState = {...G};
        newState.P[i] = [...newState.P[i], ""];
        setG(newState);
    }

    function handleAddRuleSet() {
        const newState = {...G};
        newState.P = [...newState.P, [""]];
        setG(newState);
    }

    function handleChangeS(event) {
        const newState = {...G};
        newState.S = event.target.value;
        setG(newState);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setGrammar(G);
    }

    return (
        <form action="">
            <h1>Gramatica</h1>
            {Object.keys(G).slice(0, 2).map((prop) => (
                <div id={prop}>
                    <span>{prop}: </span>
                    {G[prop].map((el, i) => (
                        <input 
                            type="text" 
                            name="" 
                            id={i} 
                            defaultValue={el} 
                            key={i}
                            onChange={(event) => handleChange(prop, i, event)}
                        /> 
                    ))}
                    <button type="button" onClick={() => handleAdd(prop)}>+</button>
                </div>
            ))}
            <div id="P">
                <span>P: {"{"}</span>
                    {G.P.map((rule, i) => (
                        <div className="rule">
                            <input 
                                type="text" 
                                defaultValue={rule[0]} 
                                id="0" 
                                onChange={(event) => handleChangeP(i, 0, event)}
                            />
                            <span> | </span>
                            {rule.slice(1).map((el, j) => (
                                <input 
                                    type="text" 
                                    name="" 
                                    id={j+1} 
                                    defaultValue={el} 
                                    key={j+1}
                                    onChange={(event) => handleChangeP(i, j+1, event)}
                                /> 
                            ))}
                            <button type="button" onClick={() => handleAddRule(i)}>+</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddRuleSet()}>+</button>
                    {"}"}
            </div>
            <div id="S">
                <span>S: </span>
                <input type="text" id="S" onChange={(event) => handleChangeS(event)}/>
            </div>
            <button type="submit" onClick={(event) => handleSubmit(event)}>Gerar Automato</button>
        </form>
    )
}

export default Form;