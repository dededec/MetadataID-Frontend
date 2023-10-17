import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalysisReportComponent } from './analysis-report/analysis-report.component';
import { AnalyserComponent } from './analyser/analyser.component';
import { AnalysisHistoryComponent } from './analysis-history/analysis-history.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisReportComponent,
    AnalyserComponent,
    AnalysisHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
