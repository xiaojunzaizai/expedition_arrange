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
export class ExpeditionInfoComponent implements OnInit {
  @Input() expedition: ExpeditionInfo[]  = [];
  @Input() selectedQuests: ExpeditionQuest[] = [];
  selectedQuestsExpeditionList:ExpeditionInfoInQuest[]=[];
  constructor() {}

  ngOnInit(): void {}

  get_expedition_list(){
    this.selectedQuests.forEach(quest =>{
      quest.expeditions.forEach(item =>{
        this.selectedQuestsExpeditionList.push(item);
      })
    })
  }
}
