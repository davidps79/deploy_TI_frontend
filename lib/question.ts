export type Question = {
    fact: string;
    statement: string;
    options: string[];
    answer_mode: 1|2|3;
    round: number;
}