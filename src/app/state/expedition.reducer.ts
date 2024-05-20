// expedition.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ExpeditionActions from './expedition.actions';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';

export interface ExpeditionState {
  questData: ExpeditionQuest[];
  expeditionData: ExpeditionInfo[];
  error: any;
}

export const initialState: ExpeditionState = {
  questData: [],
  expeditionData: [],
  error: null
};

export const expeditionReducer = createReducer(
  initialState,
  on(ExpeditionActions.loadQuestDataSuccess, (state, { questData }) => ({ ...state, questData })),
  on(ExpeditionActions.loadExpeditionDataSuccess, (state, { expeditionData }) => ({ ...state, expeditionData })),
  on(ExpeditionActions.loadQuestDataFailure, (state, { error }) => ({ ...state, error })),
  on(ExpeditionActions.loadExpeditionDataFailure, (state, { error }) => ({ ...state, error }))
);
