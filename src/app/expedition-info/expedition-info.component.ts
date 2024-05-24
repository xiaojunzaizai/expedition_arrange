import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzmoduleModule } from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo, ExpeditionQuest, ExpeditionInfoInQuest, ExtendedExpeditionInfoInQuest, ExpeditionCompletedCount } from '../interface/interfaceManagement';

@Component({
  selector: 'app-expedition-info',
  standalone: true,
  imports: [NzmoduleModule],
  templateUrl: './expedition-info.component.html',
  styleUrl: './expedition-info.component.css'
})
export class ExpeditionInfoComponent implements OnInit, OnChanges {
  @Input() expedition: ExpeditionInfo[] = [];
  @Input() selectedQuests: ExpeditionQuest[] = [];
  selectedQuestsExpeditionList: ExtendedExpeditionInfoInQuest[] = [];
  demoValue = 0;
  editId: string | null = null;
  storeModifyCompletedCount: ExpeditionCompletedCount[] = [];
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedQuests']) {
      this.reset_expedition_list();
      this.get_selected_expedition_list();
    }
  }

  get_selected_expedition_list(): void {
    let tmp_list: ExtendedExpeditionInfoInQuest[] = [];
    this.selectedQuests.forEach(quest => {
      tmp_list = tmp_list.concat(this.merge_or_condition_expedition(quest.expeditions, quest.code));

      this.selectedQuestsExpeditionList = this.merge_same_expedition(tmp_list);
    });
    console.log(this.storeModifyCompletedCount);
  }

  merge_or_condition_expedition(expedition_list: ExpeditionInfoInQuest[], quest_code: string): ExtendedExpeditionInfoInQuest[] {
    let result: ExtendedExpeditionInfoInQuest[] = [];
    const tempExpeditionMap = new Map<string, ExtendedExpeditionInfoInQuest>();
    expedition_list.forEach(item => {
      if (item.condition_status.toLowerCase() === "or".toLowerCase()) {
        const key = "or_" + quest_code;
        if (tempExpeditionMap.has(key)) {
          const existItem = tempExpeditionMap.get(key);
          if (existItem) {
            existItem.name += "/" + item.name;
            if (existItem.expedition_code <= item.expedition_code) {
              existItem.expedition_code += "/" + item.expedition_code;
              existItem.expedition_consume_time = existItem.expedition_consume_time.toString() + "/" + item.expedition_consume_time.toString();
            }
          }
        } else {
          tempExpeditionMap.set(key, {
            ...item,
            name: item.name,
            expedition_code: item.expedition_code,
            quest_codes_list: [quest_code],
            completed_count: 0,
            remaining_count: item.expedition_need_count - 0,
            status: "In Progress",
          });
        }
      } else {
        result.push({
          ...item,
          quest_codes_list: [quest_code],
          completed_count: 0,
          remaining_count: item.expedition_need_count - 0,
          status: "In Progress",
        })
      }
    })

    if (tempExpeditionMap.size > 0) {
      tempExpeditionMap.forEach(value => result.push(value));
    }

    return result
  }

  merge_same_expedition(expedition_list: ExtendedExpeditionInfoInQuest[]): ExtendedExpeditionInfoInQuest[] {
    let result = expedition_list.reduce<ExtendedExpeditionInfoInQuest[]>((acc, curr) => {
      let exist = acc.find(item => item.expedition_code === curr.expedition_code)
      if (exist) {
        exist.expedition_need_count += curr.expedition_need_count;
        exist.completed_count += curr.completed_count;
        exist.remaining_count += curr.remaining_count;
        exist.quest_codes_list = exist.quest_codes_list.concat(curr.quest_codes_list);
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, []);
    return result;
  }

  reset_expedition_list() {
    this.selectedQuestsExpeditionList = [];
  }

  updateSelectedList(expeditionCode: string, expeditionCompletedCount: number): void {
    let tmp: ExpeditionCompletedCount = {
      code: expeditionCode,
      count: expeditionCompletedCount
    };
    let flag = true

    this.storeModifyCompletedCount.forEach(item => {
      if (item.code === expeditionCode) {
        flag = false;
        item.count = expeditionCompletedCount;
      }
    });
    if (flag) {
      this.storeModifyCompletedCount.push(tmp)
    }
  }

  updateExpeditionCount():void{
    this.selectedQuestsExpeditionList;
    this.storeModifyCompletedCount;
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
}
