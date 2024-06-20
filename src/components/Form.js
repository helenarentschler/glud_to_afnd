import { useState } from "react";
import Grammar from "../models/Grammar";

const Form = ({ setGrammar }) => {
    const [G, setG] = useState(new Grammar());

    function handleChange(prop, i, event) {
        const newState = { ...G };
        newState[prop][i] = event.target.value;
        setG(newState);
    }

    function handleAdd(prop) {
        const newState = { ...G };
        newState[prop] = [...newState[prop], ""];
        setG(newState);
    }

    function handleChangeP(i, j, event) {
        const newState = { ...G };
        let input = event.target.value.trim();
        
        if (j === 0) {
            let existsRuleSet = false;
            for(let k in G.P){
                if(input === G.P[k][0] && k != i)
                    existsRuleSet=true;
            }
            if(existsRuleSet){
                newState.P[i][j] ="";
        
                return;
            }
            if(!G.V.includes(input)){
                newState.P[i][j] ="";
                return;
                
            }
            newState.P[i][j] = input;
        } else {
            if (input === "eps") {
                newState.P[i][j] = ['eps'];
            } else {
                let splitInput = input.split(" ");
                console.log(input+"-"+splitInput);
                if (splitInput.length !== 2) {
                    return;
                }
                newState.P[i][j] = [splitInput[0], splitInput[1]];
            }
        }
        setG(newState);
        console.log(G.P);
    }

    function handleBlur(i, j, event) {
        let input = event.target.value.trim();
        
        if (input === "eps") {
            event.target.value = "eps";
            return;
        }
        
        let splitInput = input.split(" ");
        if (splitInput.length !== 2) {
            if (j === 0) {
                let existsRuleSet = false;
                for(let k in G.P){
                    if(input === G.P[k][0] && k != i)
                        existsRuleSet=true;
                }
                if(existsRuleSet){
                    console.error("Já existe um rule set com essa cabeça");
                    event.target.value = G.P[i][j];
                }
                if(!G.V.includes(splitInput[0])){
                    console.error("cabeça deve estar em V");
                    event.target.value = G.P[i][j];
                }
            } else {
                event.target.value = G.P[i][j].join(" ");
                console.error("Input must contain exactly two elements separated by a space.");
            }
        }
    }

    function handleAddRule(i) {
        const newState = { ...G };
        newState.P[i] = [...newState.P[i], [""]];
        setG(newState);
    }

    function handleAddRuleSet() {
        const newState = { ...G };
        newState.P = [...newState.P, ["", [""]]];
        setG(newState);
    }

    function handleChangeS(event) {
        const newState = { ...G };
        newState.S = event.target.value;
        setG(newState);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setGrammar(G);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Gramática</h1>
            {Object.keys(G).slice(0, 2).map((prop) => (
                <div key={prop} id={prop}>
                    <span>{prop}: </span>
                    {G[prop].map((el, i) => (
                        <input 
                            type="text" 
                            key={i} 
                            defaultValue={el} 
                            onChange={(event) => handleChange(prop, i, event)} 
                        />
                    ))}
                    <button type="button" onClick={() => handleAdd(prop)}>+</button>
                </div>
            ))}
            <div id="P">
                <span>P: {"{"}</span>
                {G.P.map((rule, i) => (
                    <div className="rule" key={i}>
                        <input 
                            type="text" 
                            defaultValue={rule[0]} 
                            onChange={(event) => handleChangeP(i, 0, event)}
                            onBlur={(event) => handleBlur(i, 0, event)} 
                        />
                        <span> | </span>
                        {rule.slice(1).map((el, j) => (
                            <input 
                                type="text" 
                                key={j + 1} 
                                defaultValue={el.join(" ")} 
                                onChange={(event) => handleChangeP(i, j + 1, event)}
                                onBlur={(event) => handleBlur(i, j + 1, event)} 
                            />
                        ))}
                        <button type="button" onClick={() => handleAddRule(i)}>+</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddRuleSet}>+</button>
                {"}"}
            </div>
            <div id="S">
                <span>S: </span>
                <input 
                    type="text" 
                    defaultValue={G.S} 
                    onChange={handleChangeS} 
                />
            </div>
            <button className="submit" type="submit">Gerar Autômato</button>
        </form>
    );
};

export default Form;