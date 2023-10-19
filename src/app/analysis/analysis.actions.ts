import { Analysis } from "./analysis.model";

export class SelectAnalysisAction {
    static readonly type = '[ANALYSIS] Select';
    constructor(public payload: Analysis) { }
}