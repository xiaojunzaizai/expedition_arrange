import { ExpeditionStatus } from "./expedition-status";
export interface ExpeditionInfoInQuest {
    name: string;
    expedition_code: string;
    expedition_consume_time: string | number;
    expedition_need_count: number;
    condition_status: ExpeditionStatus;
}
