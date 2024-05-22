import { ExpeditionInfoInQuest } from "./interfaceManagement";

export interface ExtendedExpeditionInfoInQuest extends ExpeditionInfoInQuest {
    quest_codes: string[];
    completed_count: number;
    remaining_count: number;
    status:string;
  }