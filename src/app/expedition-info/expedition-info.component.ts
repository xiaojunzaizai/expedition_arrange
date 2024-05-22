import {  Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {NzmoduleModule} from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo, ExpeditionQuest,ExpeditionInfoInQuest, ExtendedExpeditionInfoInQuest } from '../interface/interfaceManagement';

@Component({
  selector: 'app-expedition-info',
  standalone: true,
  imports: [NzmoduleModule],
  templateUrl: './expedition-info.component.html',
  styleUrl: './expedition-info.component.css'
})
export class ExpeditionInfoComponent implements OnInit, OnChanges {
  @Input() expedition: ExpeditionInfo[]  = [];
  @Input() selectedQuests: ExpeditionQuest[] = [];
  selectedQuestsExpeditionList:ExtendedExpeditionInfoInQuest[]=[];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['selectedQuests']) {
        this.reset_expedition_list();
        this.get_selected_expedition_list();
      }
  }

  get_selected_expedition_list(){
    this.selectedQuests.forEach(quest =>{
      quest.expeditions.forEach(item =>{
        const index = this.selectedQuestsExpeditionList.findIndex(exp => exp.expedition_code === item.expedition_code);
        if (index !== -1) {
          const existingItem = this.selectedQuestsExpeditionList[index];
          existingItem.expedition_need_count += item.expedition_need_count;
          
          // Check if the quest code is already in the list
          if (!existingItem.quest_codes.includes(quest.code)) {
              existingItem.quest_codes.push(quest.code);
          }       
        } else {
          // Add the new item with the additional field as a list
          // this.selectedQuestsExpeditionList.push({ ...item, quest_codes: [quest.code] });        
        }
      })
    })
  }

  merge_or_condition_expedition(expedition_list:ExpeditionInfoInQuest[],quest_code:string):ExtendedExpeditionInfoInQuest[]{
    let result: ExtendedExpeditionInfoInQuest[] = [];
    const tempExpeditionMap = new Map<string, ExtendedExpeditionInfoInQuest>();
    expedition_list.forEach(item =>{
      if(item.condition_status.toLowerCase() ===  "or".toLowerCase()){
        const key = "or_"+quest_code;
        if (tempExpeditionMap.has(key)) {
          const existItem = tempExpeditionMap.get(key);
          if (existItem) {
            existItem.name += "/" + item.name;
            if (existItem.expedition_code <= item.expedition_code){
              existItem.expedition_code += "/"+item.expedition_code;
              existItem.expedition_consume_time = existItem.expedition_consume_time.toString() + "/" + item.expedition_consume_time.toString();
            }
          }
        } else {
          tempExpeditionMap.set(key, {
            ...item,
            name: item.name,
            expedition_code: item.expedition_code,
            quest_codes: [quest_code],
            completed_count: 0,
            remaining_count: item.expedition_need_count - 0,
            status: "In Progress",
          });
        }
      } else {
        result.push({
          ...item,
          quest_codes: [quest_code],
          completed_count: 0,
          remaining_count: item.expedition_need_count - 0,
          status: "In Progress",  
        })
      }
    })

    if (tempExpeditionMap.size>0){
      tempExpeditionMap.forEach(value => result.push(value));
    }

    return result
  }

  reset_expedition_list(){
    this.selectedQuestsExpeditionList = [];
  }
}
