import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AnalysisStateModel } from './analysis.model';
import { SelectAnalysisAction } from './analysis.actions';
import { Injectable } from '@angular/core';

@State({
  name: 'selectedAnalysis',
  defaults: {
    selectedAnalysis: null
  }
})
@Injectable({
  providedIn: 'root'
})
export class AnalysisState {
  @Selector()
  static getSelectedAnalysis(state: AnalysisStateModel) { return state.selectedAnalysis; }


  @Action(SelectAnalysisAction)
  add({ patchState }: StateContext<AnalysisStateModel>, { payload }: SelectAnalysisAction) {
    patchState({
        selectedAnalysis: payload
    });
  }
}