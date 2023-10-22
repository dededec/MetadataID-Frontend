import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalysisReportComponent } from './analysis-report/analysis-report.component';
import { AnalyserComponent } from './analyser/analyser.component';
import { AnalysisHistoryComponent } from './analysis-history/analysis-history.component';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AnalysisState } from './analysis/analysis.state';
import { AppRoutingModule } from './app-routing.module';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisReportComponent,
    AnalyserComponent,
    AnalysisHistoryComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxsModule.forRoot([AnalysisState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
