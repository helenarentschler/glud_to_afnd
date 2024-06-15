
// V = ["S","A","B"];
//     T = ["a","b"];
//     P = [
//         ["S","aA"],
//         ["A","bB","eps"],
//         ["B","aA"]
//     ]
//     S = "S";

export default class Grammar {

    V; T; P; S;

    constructor() {
        this.V = [""];
        this.T = [""];
        this.P = [[""]];
        this.S = "";
    }
}