export default class Automaton {

    constructor(sigma, states, initialState, finalStates, transitions) {
        this.sigma = sigma;
        this.states = states;
        this.initialState = initialState;
        this.finalStates = finalStates; 
        this.transitions = transitions;
    }
}