export default class Grammar {
    V; T; P; S;

    constructor() {
        this.V = ["S"];
        this.T = ["a"];
        this.P = [
            ["S",["eps"]]
        ];
        this.S = "S";
    }
}