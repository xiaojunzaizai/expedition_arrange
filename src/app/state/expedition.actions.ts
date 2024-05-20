// expedition.actions.ts
import { createAction, props } from '@ngrx/store';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';

export const loadQuestData = createAction('[Expedition] Load Quest Data');
export const loadQuestDataSuccess = createAction('[Expedition] Load Quest Data Success', props<{ questData: ExpeditionQuest[] }>());
export const loadQuestDataFailure = createAction('[Expedition] Load Quest Data Failure', props<{ error: any }>());

export const loadExpeditionData = createAction('[Expedition] Load Expedition Data');
export const loadExpeditionDataSuccess = createAction('[Expedition] Load Expedition Data Success', props<{ expeditionData: ExpeditionInfo[] }>());
export const loadExpeditionDataFailure = createAction('[Expedition] Load Expedition Data Failure', props<{ error: any }>());
