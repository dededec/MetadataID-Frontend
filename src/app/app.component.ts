import { Component } from '@angular/core';
import { Analysis } from './analysis/analysis.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedAnalysis:Observable<Analysis>

  constructor(private store:Store) {
    this.selectedAnalysis = this.store.select(state => state.selectedAnalysis.selectedAnalysis)
  }
}
