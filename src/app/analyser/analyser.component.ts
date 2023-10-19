import { Component } from '@angular/core';
import { Analysis } from '../analysis/analysis.model';
import { AnalysisService } from '../analysis/analysis.service';
import { Store } from '@ngxs/store';
import { SelectAnalysisAction } from '../analysis/analysis.actions';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.css']
})
export class AnalyserComponent {
  url:string;

  constructor(private analysisService:AnalysisService, private store:Store) {}

  async fetchAnalysis(url:string) {
    let analysis = await this.analysisService.fetchAnalysis(url);
    if(analysis) {
      this.store.dispatch(new SelectAnalysisAction(analysis));
    } else {
      alert("An error ocurred with your request!");
    }

    this.url = '';
  }


}
