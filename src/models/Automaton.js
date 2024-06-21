export default class Grammar {

    constructor(V, T, P, S) {
        this.sigma = T;
        this.states = V;
        this.initialState = S;
        this.finalStates = []; // To store final states
        this.transitions = {};
    }
}