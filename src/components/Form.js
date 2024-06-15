import { useState } from "react";
import Grammar from "../models/Grammar";

const Form = () => {

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
            <button type="submit">Gerar Automato</button>
        </form>
    )
}

export default Form;