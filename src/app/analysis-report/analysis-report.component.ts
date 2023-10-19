import { Component, Input } from '@angular/core';
import { Analysis } from '../analysis/analysis.model';

@Component({
  selector: 'app-analysis-report',
  templateUrl: './analysis-report.component.html',
  styleUrls: ['./analysis-report.component.css']
})
export class AnalysisReportComponent {
  @Input() analysis:Analysis
}
