import {  Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {NzmoduleModule} from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo, ExpeditionQuest,ExpeditionInfoInQuest } from '../interface/interfaceManagement';

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
  selectedQuestsExpeditionList:ExpeditionInfoInQuest[]=[];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['selectedQuests']) {
        this.reset_expedition_list();
        this.get_expedition_list();
      }
  }

  get_expedition_list(){
    this.selectedQuests.forEach(quest =>{
      quest.expeditions.forEach(item =>{
        const index = this.selectedQuestsExpeditionList.findIndex(exp => exp.expedition_code === item.expedition_code);
        if (index !== -1) {
          // Update the existing item
          // const updatedItem = {
          //   ...this.selectedQuestsExpeditionList[index],
          //   expedition_need_count: this.selectedQuestsExpeditionList[index].expedition_need_count + item.expedition_need_count
          // };
          // this.selectedQuestsExpeditionList[index] = updatedItem; 
          // Update the existing item
          const existingItem = this.selectedQuestsExpeditionList[index];
          existingItem.expedition_need_count += item.expedition_need_count;
          
          // Check if the quest code is already in the list
          if (!existingItem.quest_codes.includes(quest.code)) {
              existingItem.quest_codes.push(quest.code);
          }       
        } else {
          // Add the new item with the additional field as a list
          this.selectedQuestsExpeditionList.push({ ...item, quest_codes: [quest.code] });        }
      })
    })
  }

  reset_expedition_list(){
    this.selectedQuestsExpeditionList = [];
  }
}
