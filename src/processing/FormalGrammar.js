import Grammar from "../models/Grammar";

export default class FormalGrammar {

    constructor() {
        this.base = new Grammar();
    }

    reducer = (state, action) => {

        const params = action.payload;
    
        switch (action.type) {
    
            case 'updateSet':

                return this.updateSet(state, params.set, params.i, params.event);
            
            case 'verifyProductions':

                return this.verifyProductions(state, params.i, params.j, params.event);

            case 'updateS':

                return this.updateS(state, params.event);

            case 'addSetElement': 

                return this.addSetElement(state, params.set);
            
            case 'addRule': 

                return this.addRule(state, params.i);   

            case 'addRuleSet': 

                return this.addRuleSet(state);    

            case 'checkInput':

                return this.checkInput(state, params.set);

            default:
                return state;
        }
    }

    // updates V or T element
    updateSet = (state, set, i, event) => {
        const newState = { ...state };
        newState[set][i] = event.target.value;
        return newState;
    }

    verifyProductions = (state, i, j, event) => {

        const newState = { ...state };
        let input = event.target.value.trim();
        let splitInput =input.split(" ");
        let errors = [];
    
        try {
            //is head
            if (j == 0) {

                if(i > 0 && input === "" && state.P[i][j + 1][0] === "") {
                    newState.P.splice(i, 1);
                    return newState;
                }

                if (splitInput.length != 1) {
                    errors.push("Cabeça deve ter tamanho 1");
                }
    
                if (!state.V.includes(splitInput[0])) {
                    errors.push("Cabeça deve ser variavel");
                }
    
                for (let line in state.P) {
                    if (input === state.P[line][0] && line != i) {
                        errors.push("Cabeça deve ser única");
                    }
                }
    
                if (errors.length > 0) {
                    throw new Error(errors.join("\n"));
                }
    
                newState.P[i][j] = splitInput[0];
                return newState;
            //is body
            } else {

                if(input === "" && j >= 2) {
                    newState.P[i].splice(j, 1);
                    return newState;
                }

                if (input === "eps") {
                    newState.P[i][j] = ['eps'];
                    return newState;
                }
    
                if (splitInput.length !== 2) {
                    errors.push("Corpo deve ter tamanho 2");
                }
    
                if (!state.T.includes(splitInput[0])) {
                    errors.push("Corpo deve começar com terminal válido");
                }
    
                if (!state.V.includes(splitInput[1])) {
                    errors.push("Corpo deve terminar com variável válida");
                }
    
                if (errors.length > 0) {
                    throw new Error(errors.join("\n"));
                }
    
                newState.P[i][j] = [splitInput[0], splitInput[1]];
                return newState;
            }
        } catch (error) {
            alert(error.message);
            event.target.value = "";
            newState.P[i][j] = j === 0 ? "" : [""];
            return newState;
        }
    }

    // updates S
    updateS = (state, event) => {

        const newState = { ...state };

        if (!state.V.includes(event.target.value)) {
            alert("Deve ser variavel");
            event.target.value = "";
            return newState;
        }

        newState.S = event.target.value;

        return newState;
    }

    // pushes new empty string to V or T to trigger new input field 
    addSetElement = (state, set) => {
        const newState = { ...state };
        newState[set] = [...newState[set], ""];
        return newState;
    }

    // pushes new element or "rule" to a P head (an element is an array)
    addRule = (state, i) => {
        const newState = { ...state };
        newState.P[i] = [...newState.P[i], [""]];
        return newState;
    }

    // pushes new line or "ruleset" to P array 
    //(an element is an array with a string as head and an array as body)
    addRuleSet = (state) => {
        const newState = { ...state };
        newState.P = [...newState.P, ["", [""]]];
        return newState;
    }
 
    checkInput = (state, set) => {

        const newState = { ...state };
        
        if(newState[set].slice(-1)[0] == "" && newState[set].length > 1) {
            newState[set] = [...newState[set].slice(0, -1)];
        }
        
        return newState;
    }

    checkGrammarSubmit(state) {

        let errors = [];

        if(state.V.some(el => el === "")) errors.push("V invalido");
        if(state.T.some(el => el === ""))  errors.push("T invalido");

        for (let i in state.P) {
            if(state.P[i].some(el => el === "" || el[0] == "")) errors.push("P invalido");
        }

        if(state.S === "") errors.push("S invalido");

        if (errors.length > 0) {
            throw new Error(errors.join("\n"));
        }
    }

}