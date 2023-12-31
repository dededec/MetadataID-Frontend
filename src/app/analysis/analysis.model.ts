export class AnalysisStateModel {
    selectedAnalysis: Analysis;
}

export interface Analysis {
    id: number;
    url: string;
    title: string;
    description: string;
    keywords: string[];
    headings: Object;
    html5: boolean;
    images: number;
    lastModified: Date
}
