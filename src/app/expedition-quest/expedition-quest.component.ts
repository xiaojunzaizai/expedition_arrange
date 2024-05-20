import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ExpeditionQuest } from '../interface/interfaceManagement';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NzmoduleModule} from '../module/nzmodule/nzmodule.module';


@Component({
  selector: 'app-expedition-quest',
  standalone: true,
  imports: [CommonModule,FormsModule,NzmoduleModule],
  templateUrl: './expedition-quest.component.html',
  styleUrl: './expedition-quest.component.css'
})



export class ExpeditionQuestComponent implements OnChanges {
  @Input() questData: ExpeditionQuest[] = [];
  @Output() selectedQuestsChange = new EventEmitter<ExpeditionQuest[]>();

  selectedQuests: ExpeditionQuest[] = [];
  dailyQuests: ExpeditionQuest[] = [];
  weekQuests: ExpeditionQuest[] = [];
  monthQuests: ExpeditionQuest[] = [];
  quarterQuests: ExpeditionQuest[] = [];
  yearQuests: ExpeditionQuest[] = [];
  specialQuests: ExpeditionQuest[] = [];

  selectedItems: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questData']) {
      this.getSelectedQuests();
      this.getDailyQuests();
      this.getWeekQuests();
      this.getMonthQuests();
      this.getQuarterQuests();
      this.getYearQuests();
      this.getSpecialQuests();
    }
  }

  getSelectedQuests(): void {
    this.selectedQuests =  this.questData.filter(item => this.selectedItems[item.code]);
    this.selectedQuestsChange.emit(this.selectedQuests);
  }

  getDailyQuests(): void {
    this.dailyQuests = this.questData.filter(item => item.code.slice(0,2).toLowerCase() === "dd".toLowerCase());
  }

  getWeekQuests(): void {
    this.weekQuests = this.questData.filter(item => item.code.slice(0,2).toLowerCase() === "dw".toLowerCase());

  }

  getMonthQuests(): void {
    this.monthQuests = this.questData.filter(item => item.code.slice(0,2).toLowerCase() === "dm".toLowerCase());

  }

  getQuarterQuests(): void {
    this.quarterQuests = this.questData.filter(item => item.code.slice(0,2).toLowerCase() === "dq".toLowerCase());

  }

  getYearQuests(): void {
    this.yearQuests = this.questData.filter(item => item.code.slice(0,2).toLowerCase() === "dy".toLowerCase());

  }

  getSpecialQuests(): void {
    this.specialQuests = this.questData.filter(item => item.code.slice(0,1).toLowerCase() !== "d".toLowerCase());

  }

  removeQuest(code: string): void {
    this.selectedItems[code] = false;
    this.getSelectedQuests();
  }
}
