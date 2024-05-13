import { ExpeditionInfoInQuest } from "./expedition-info-in-quest";
export interface ExpeditionQuest {
    code: string;
    name: string;
    memo_jp: string;
    memo_chinese: string;
    expeditions: ExpeditionInfoInQuest[];
}
