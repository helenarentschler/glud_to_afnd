export default class Grammar {
    V; T; P; S;

    constructor() {
        this.V = [""];
        this.T = [""];
        this.P = [
            ["",[""]]
        ];
        this.S = "";
    }
}