import { createSelector } from '@ngrx/store';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';

export const selectExpeditions = (state: { expedition: ExpeditionInfo[]; }) => state.expedition;
export const selectQuestss = (state: { quests: ExpeditionQuest[]; }) => state.quests;

export const selectQuestData = createSelector(
  selectQuestss,
  (state) => state
);

export const selectExpeditionData = createSelector(
  selectExpeditions,
  (state) => state
);
