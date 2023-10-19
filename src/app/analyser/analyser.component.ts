import { Component } from '@angular/core';
import { Analysis } from '../analysis/analysis';
import { AnalysisService } from '../analysis/analysis.service';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.css']
})
export class AnalyserComponent {

  lastAnalysis: Analysis;
  url:string;

  constructor(private analysisService:AnalysisService) {}

  async fetchAnalysis(url:string) {
    this.lastAnalysis = await this.analysisService.fetchAnalysis(url);
    this.url = '';
  }


}
