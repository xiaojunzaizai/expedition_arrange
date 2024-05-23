import { ExpeditionInfoInQuest } from "./interfaceManagement";

export interface ExtendedExpeditionInfoInQuest extends ExpeditionInfoInQuest {
    quest_codes_list: string[];
    completed_count: number;
    remaining_count: number;
    status:string;
  }