import { Component } from '@angular/core';
import { AnalysisService } from '../analysis/analysis.service';
import { Store } from '@ngxs/store';
import { SelectAnalysisAction } from '../analysis/analysis.actions';
import { AnalysisHistoryEntry } from './analysis-history-entry.model';

@Component({
  selector: 'app-analysis-history',
  templateUrl: './analysis-history.component.html',
  styleUrls: ['./analysis-history.component.css']
})
export class AnalysisHistoryComponent {
  analysesLimit: number = 15;

  constructor(private analysisService:AnalysisService, private store:Store) {
  }

  async ngOnInit() {
    await this.analysisService.fetchLatestAnalyses(this.analysesLimit);
  }

  getLatestAnalyses() {
    return this.analysisService.analysesHistory;
  }

  async onEntrySelect(id:number) {
    let analysis = await this.analysisService.fetchAnalysisById(id);
    this.store.dispatch(new SelectAnalysisAction(analysis));
  }

  async onDeleteEntry(id:number) {
    await this.analysisService.deleteAnalysisById(id);
  }
}
