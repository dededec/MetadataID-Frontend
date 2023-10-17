import { Component } from '@angular/core';
import { AnalysisService } from '../analysis/analysis.service';
import { Analysis } from '../analysis/analysis';

@Component({
  selector: 'app-analysis-history',
  templateUrl: './analysis-history.component.html',
  styleUrls: ['./analysis-history.component.css']
})
export class AnalysisHistoryComponent {

  latestAnalyses: Analysis[]
  analysesLimit: number = 15;

  constructor(private analysisService:AnalysisService) {
  }

  async ngOnInit() {
    this.latestAnalyses = await this.analysisService.fetchLatestAnalyses(this.analysesLimit);
  }
}
