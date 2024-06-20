import { useState } from "react";
import Grammar from "../models/Grammar";

const Form = ({ setGrammar }) => {

    const [G, setG] = useState({
        V: ["S","A"],
        T: ["a"],
        P: [["S","aA","eps"]],
        S: "S"
    });

    //armazenar quais campos estão como label
    const [isLabel, setIsLabel] = useState({
        V: Array(G.V.length).fill(true),
        T: Array(G.T.length).fill(true),
        P: G.P.map(rule => Array(rule.length).fill(true)),
        S: true
    });

    function handleChange(prop, i, event) {
        const newState = { ...G };
        newState[prop][i] = event.target.value;
        setG(newState);
    }

    function handleAdd(prop) {
        const newState = { ...G };
        newState[prop] = [...newState[prop], ""];
        setG(newState);

        //update isLabel
        const newIsLabel = { ...isLabel };
        newIsLabel[prop] = [...newIsLabel[prop], false];
        setIsLabel(newIsLabel);
    }

    function handleChangeP(i, j, event) {
        const newState = { ...G };
        newState.P[i][j] = event.target.value;
        setG(newState);
    }

    function handleAddRule(i) {
        const newState = { ...G };
        newState.P[i] = [...newState.P[i], ""];
        setG(newState);

        //update isLabel
        const newIsLabel = { ...isLabel };
        newIsLabel.P[i] = [...newIsLabel.P[i], false];
        setIsLabel(newIsLabel);
    }

    function handleAddRuleSet() {
        const newState = { ...G };
        newState.P = [...newState.P, ["","eps"]];
        setG(newState);

        //update isLabel
        const newIsLabel = { ...isLabel };
        newIsLabel.P = [...newIsLabel.P, [false]];
        setIsLabel(newIsLabel);
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

    function handleRemoveRuleSet(i) {
        const newState = { ...G };
        if (newState.P.length > 1) {
            newState.P.splice(i, 1);
            setG(newState);
        }
        const newIsLabel = { ...isLabel };
        newIsLabel.P.splice(i, 1);
        setIsLabel(newIsLabel);
    }
    
    function handleRemove(prop, i) {
        const newState = { ...G };
        if (newState[prop].length > 1) {
            newState[prop].splice(i, 1);
            setG(newState);

            // Update isLabel for removed element
            const newIsLabel = { ...isLabel };
            newIsLabel[prop].splice(i, 1);
            setIsLabel(newIsLabel);
        }
    }

    function handleBlur(prop, i, j = null) {
    const newIsLabel = { ...isLabel };
    if (prop === 'P') {
        if (j === 0 && G.P[i][j].trim() === "") {
            handleRemoveRuleSet(i);
        } else if (G.P[i][j].trim() !== "") {
            newIsLabel.P[i][j] = true;
        } else {
            handleRemoveRule(i, j);
        }
    } else if (G[prop][i].trim() !== "") {
        newIsLabel[prop][i] = true;
    } else {
        handleRemove(prop, i);
    }
    setIsLabel(newIsLabel);
}


    function handleLabelClick(prop, i, j = null) {
        const newIsLabel = { ...isLabel };
        if (prop === 'P') {
            newIsLabel.P[i][j] = false;
        } else {
            newIsLabel[prop][i] = false;
        }
        setIsLabel(newIsLabel);
    }

    function handleRemoveRule(i, j) {
        const newState = { ...G };
        if (newState.P[i].length > 1) {
            newState.P[i].splice(j, 1);
            setG(newState);

            // Update isLabel for removed rule
            const newIsLabel = { ...isLabel };
            newIsLabel.P[i].splice(j, 1);
            setIsLabel(newIsLabel);
        }
    }

    const canAdd = (prop) => {
        return G[prop].length === 0 || G[prop][G[prop].length - 1].trim() !== "";
    };

    const canAddRuleSet = () => {
        const lastRuleSet = G.P[G.P.length - 1];
        return lastRuleSet.length > 0 && lastRuleSet[0].trim() !== "";
    };

    const canAddRule = (prop) => {
        return prop.trim() !== "";
    };

    return (
        <form action="">
            <h1>Gramática</h1>
            {Object.keys(G).slice(0, 2).map((prop) => (
                <div className="grammarDef" id={prop} key={prop}>
                    <span>{prop}: </span>
                    {G[prop].map((el, i) => (
                        isLabel[prop][i] ? (
                            <span className="insert" key={i} onClick={() => handleLabelClick(prop, i)}>{el}</span>
                        ) : (
                            <input
                                key={i}
                                type="text"
                                value={el}
                                onChange={(event) => handleChange(prop, i, event)}
                                onBlur={() => handleBlur(prop, i)}
                            />
                        )
                    ))}
                    <button type="button" onClick={() => { if (canAdd(prop)) handleAdd(prop); }}>+</button>
                </div>
            ))}

            <div className="grammarDef" id="P">
                <span>P: {"{"}</span>
                {G.P.map((rule, i) => (
                    <div className="rule" key={i}>
                        {isLabel.P[i][0] ? (
                            <span className="insert" onClick={() => handleLabelClick('P', i, 0)}>{rule[0]}</span>
                        ) : (
                            <input
                                type="text"
                                value={rule[0]}
                                onChange={(event) => handleChangeP(i, 0, event)}
                                onBlur={() => handleBlur('P', i, 0)}
                            />
                        )}
                        <span> &rarr; </span>
                        {rule.slice(1).map((el, j) => (
                            isLabel.P[i][j + 1] ? (
                                <span className="insert" key={j + 1} onClick={() => handleLabelClick('P', i, j + 1)}>{el}</span>
                            ) : (
                                <input
                                    key={j + 1}
                                    type="text"
                                    value={el}
                                    onChange={(event) => handleChangeP(i, j + 1, event)}
                                    onBlur={() => handleBlur('P', i, j + 1)}
                                />
                            )
                        ))}
                        <button type="button" onClick={() => { if (canAddRule(rule[rule.length-1])) handleAddRule(i) }}>+</button>
                    </div>
                ))}
                <button type="button" onClick={() => { if (canAddRuleSet()) handleAddRuleSet(); }}>+</button>
                {"}"}
            </div>
            <div id="S">
                <span>S: </span>
                {isLabel.S ? (
                    <span className="insert" onClick={() => setIsLabel({ ...isLabel, S: false })}>{G.S}</span>
                ) : (
                    <input
                        type="text"
                        value={G.S}
                        onChange={(event) => handleChangeS(event)}
                        onBlur={() => setIsLabel({ ...isLabel, S: G.S.trim() !== "" })}
                    />
                )}
            </div>
            <button className="submit" type="submit" onClick={(event) => handleSubmit(event)}>Gerar Autômato</button>
        </form>
    );
}

export default Form;
