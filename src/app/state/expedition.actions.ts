// state/expedition.actions.ts
import { createAction, props } from '@ngrx/store';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';

export const loadQuestData = createAction('[Expedition Quest] Load Quest Data');
export const loadQuestDataSuccess = createAction('[Expedition Quest] Load Quest Data Success', props<{ quests: ExpeditionQuest[] }>());
export const loadExpeditionData = createAction('[Expedition Info] Load Expedition Data');
export const loadExpeditionDataSuccess = createAction('[Expedition Info] Load Expedition Data Success', props<{ expeditions: ExpeditionInfo[] }>());
