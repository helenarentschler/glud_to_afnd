import Automaton from "./Automaton.js"


export class Grammar{
    V = ["S","A","B"];
    T = ["a","b"];
    P = [
        ["S","aA","bB"],
        ["A","bB","eps"],
        ["B","aA","bB"],
    ]
    S = "S";

    generateAutomaton(){
        let automaton = new Automaton(this.V,this.T,this.P,this.S);
        return automaton;
    }
}