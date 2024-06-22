import { useReducer } from "react";
import FormalGrammar from "../processing/FormalGrammar";

const Form = ({ setGrammar }) => {

    const formalGrammar = new FormalGrammar();

    const [ G, dispatchG ] = useReducer(formalGrammar.reducer, formalGrammar.base);

    function handleChange(set, i, event) {
        dispatchG({ type: 'updateSet',  payload: { set, i, event }});
    }

    function handleAdd(set) {
        dispatchG({ type: 'addSetElement',  payload: { set }});
    }

    function handleChangeP(i, j, event) {
        dispatchG({ type: 'updateProductions',  payload: { i, j, event }});
    }

    function handleBlurP(i, j, event) {
        dispatchG({ type: 'checkRules',  payload: { i, j, event }});
        dispatchG({ type: 'checkInputP', payload: { i }});
    }

    function handleAddRule(i) {
        dispatchG({ type: 'addRule',  payload: { i }});
    }

    function handleAddRuleSet() {
        dispatchG({ type: 'addRuleSet'});
    }

    function handleChangeS(event) {
        dispatchG({ type: 'updateS', payload: { event }});
    }

    function handleSubmit(event) {
        event.preventDefault();
        setGrammar(G);
    }

    function handleBlur(set) {
        dispatchG({ type: 'checkInput', payload: { set }});
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Gramática</h1>
            {Object.keys(G).slice(0, 2).map((set) => (
                <div key={set} id={set}>
                    <span>{set}: </span>
                    {G[set].map((el, i) => (
                        <input 
                            type="text" 
                            key={i} 
                            defaultValue={el} 
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
                {G.P.map((rule, i) => (
                    <div className="rule" key={i}>
                        <input 
                            type="text" 
                            defaultValue={rule[0]} 
                            onChange={(event) => handleChangeP(i, 0, event)}
                            onBlur={(event) => handleBlurP(i, 0, event)} 
                        />
                        <span> ⭢ </span>
                        {rule.slice(1).map((el, j) => (
                            <input 
                                type="text" 
                                key={j + 1} 
                                defaultValue={el.join(" ")} 
                                onChange={(event) => handleChangeP(i, j + 1, event)}
                                onBlur={(event) => handleBlurP(i, j + 1, event)} 
                                autoFocus={G.P[i].length - 1 === j + 1}
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