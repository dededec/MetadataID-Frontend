import { Component } from '@angular/core';
import { Analysis } from '../analysis/analysis.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analysis-report',
  templateUrl: './analysis-report.component.html',
  styleUrls: ['./analysis-report.component.css']
})
export class AnalysisReportComponent {
  analysis:Observable<Analysis>;

  constructor(private store:Store) {
    this.analysis = this.store.select(state => state.selectedAnalysis.selectedAnalysis);
  }
}
