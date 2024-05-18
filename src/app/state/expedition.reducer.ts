// state/expedition.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadQuestDataSuccess, loadExpeditionDataSuccess } from './expedition.actions';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';

export interface State {
  quests: ExpeditionQuest[];
  expeditions: ExpeditionInfo[];
}

export const initialState: State = {
  quests: [],
  expeditions: []
};

export const reducer = createReducer(
  initialState,
  on(loadQuestDataSuccess, (state, { quests }) => ({ ...state, quests })),
  on(loadExpeditionDataSuccess, (state, { expeditions }) => ({ ...state, expeditions }))
);
