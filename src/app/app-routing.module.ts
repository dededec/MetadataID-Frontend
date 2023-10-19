import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyserComponent } from './analyser/analyser.component';
import { AnalysisReportComponent } from './analysis-report/analysis-report.component';
import { AnalysisHistoryComponent } from './analysis-history/analysis-history.component';

const routes: Routes = [
  {path: '', component:AnalyserComponent},
  {path: 'report', component:AnalysisReportComponent},
  {path: 'history', component:AnalysisHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
