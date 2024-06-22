export default class FormalAutomaton {
   
    constructor(V, T, P, S) {
        
        this.sigma = T;
        this.states = V;
        this.initialState = S;
        this.finalStates = []; // To store final states
        this.transitions = this.createTransitionFunction(P);
    }

    createTransitionFunction(P) {
        let transitions = {};

        P.forEach(rule => {
            let [state, ...productions] = rule;
            productions.forEach(production => {
                let [symbol, nextState] = this.parseProduction(production);
                if (!transitions[state]) {
                    transitions[state] = {};
                }
                if (!transitions[state][symbol]) {
                    transitions[state][symbol] = [];
                }
                transitions[state][symbol].push(nextState);
                if (nextState === "qf") {
                    this.finalStates.push(state);
                }
            });
        });

        return transitions;
    }

    parseProduction(production) {
        if (production == "eps") {
            return ["eps", "qf"]; // 'eps' transitions to a final state 'qf'
        }
        let symbol = production[0];
        let nextState = production.slice(1);
        return [symbol, nextState];
    }

    delta(state, symbol) {
        return this.transitions[state] ? this.transitions[state][symbol] || [] : [];
    }

    generateDot() {
        let dot = `
            digraph finite_state_machine {
                fontname="Helvetica,Arial,sans-serif";
                node [fontname="Helvetica,Arial,sans-serif"];
                edge [fontname="Helvetica,Arial,sans-serif"];
                rankdir=LR;
                node [shape = doublecircle]; qf;
                node [shape = circle];
                start [shape=point]; start -> ${this.initialState}; 
        `;
        for (let state in this.transitions) {
            for (let symbol in this.transitions[state]) {
                let nextStates = this.transitions[state][symbol];
                nextStates.forEach(nextState => {
                    dot += `${state} -> ${nextState} [label = "${symbol}"];\n`;
                });
            }
        }

        dot += `
            }
        `;

        return dot;
    }
}
