import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NzmoduleModule } from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo, ExpeditionQuest, ExpeditionInfoInQuest, ExtendedExpeditionInfoInQuest, ExpeditionCompletedCount, ExpeditionSelectTeam } from '../interface/interfaceManagement';

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
  editId: string | null = null;
  storeModifyCompletedCount: ExpeditionCompletedCount[] = [];
  listOfTeams: string[] = ['Team 2', 'Team 3', 'Team 4', '------'];
  listOfSelectedTeam: ExpeditionSelectTeam[] = [];
  listOfSelectedTeamValue: string[] = [];
  listOfHide: ExtendedExpeditionInfoInQuest[] = [];
  hideListSet: Set<string> = new Set<string>();
  defaultValue: string = "------";
  sortNo = (a: ExtendedExpeditionInfoInQuest, b: ExtendedExpeditionInfoInQuest) => a.expedition_code.localeCompare(b.expedition_code);
  sortRemainCount = (a: ExtendedExpeditionInfoInQuest, b: ExtendedExpeditionInfoInQuest) => a.remaining_count - b.remaining_count;
  sortStatus = (a: ExtendedExpeditionInfoInQuest, b: ExtendedExpeditionInfoInQuest) => a.status.localeCompare(b.status);
  sortConsumeTime = (a: ExtendedExpeditionInfoInQuest, b: ExtendedExpeditionInfoInQuest) => this.parseConsumeTime(a.expedition_consume_time) - this.parseConsumeTime(b.expedition_consume_time);
  
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
      this.selectedQuestsExpeditionList = this.selectedQuestsExpeditionList.filter(item => !this.hideListSet.has(item.expedition_code));
    });
    this.updateExpeditionCount();
    this.updateExpeditionSelectedTeam();
    this.sortSelectedQuestExpeditionList();
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
            remaining_count: item.expedition_need_count,
            status: "In Progress",
            selectedTeam: this.defaultValue,
          });
        }
      } else {
        result.push({
          ...item,
          quest_codes_list: [quest_code],
          completed_count: 0,
          remaining_count: item.expedition_need_count,
          status: "In Progress",
          selectedTeam: this.defaultValue,
        });
      }
    });

    if (tempExpeditionMap.size > 0) {
      tempExpeditionMap.forEach(value => result.push(value));
    }

    return result;
  }

  merge_same_expedition(expedition_list: ExtendedExpeditionInfoInQuest[]): ExtendedExpeditionInfoInQuest[] {
    let result = expedition_list.reduce<ExtendedExpeditionInfoInQuest[]>((acc, curr) => {
      let exist = acc.find(item => item.expedition_code === curr.expedition_code);
      if (exist) {
        if (exist.expedition_need_count <= curr.expedition_need_count) {
          exist.expedition_need_count = curr.expedition_need_count;
        }
        exist.completed_count += curr.completed_count;
        exist.remaining_count = exist.expedition_need_count - exist.completed_count;
        exist.quest_codes_list = exist.quest_codes_list.concat(curr.quest_codes_list);
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, []);
    return result;
  }

  reset_team_select() {
    this.listOfSelectedTeamValue = [];
    this.listOfSelectedTeam = [];
    this.listOfHide.forEach(item =>{
      item.selectedTeam=this.defaultValue;
    });
    this.get_selected_expedition_list();
  }

  reset_completed_count() {
    this.storeModifyCompletedCount = [];
    this.listOfHide.forEach(item =>{
      item.completed_count = 0;
      item.remaining_count = item.expedition_need_count;
    });
    this.get_selected_expedition_list();
  }

  reset_expedition_list() {
    this.selectedQuestsExpeditionList = [];
    if (this.selectedQuests.length === 0) {
      this.storeModifyCompletedCount = [];
    }
  }

  updateSelectedList(expeditionCode: string, expeditionCompletedCount: number): void {
    let tmp: ExpeditionCompletedCount = {
      code: expeditionCode,
      count: expeditionCompletedCount
    };
    let flag = true;

    this.storeModifyCompletedCount.forEach(item => {
      if (item.code === expeditionCode) {
        flag = false;
        item.count = expeditionCompletedCount;
      }
    });
    if (flag) {
      this.storeModifyCompletedCount.push(tmp);
    }
    this.updateExpeditionCount();
  }

  updateExpeditionCount(): void {
    if (this.storeModifyCompletedCount.length > 0 && this.selectedQuestsExpeditionList.length > 0) {
      this.selectedQuestsExpeditionList.forEach(item => {
        this.storeModifyCompletedCount.forEach(countItem => {
          if (item.expedition_code === countItem.code) {
            item.completed_count = countItem.count;
            item.remaining_count = item.expedition_need_count - countItem.count;
            if (item.remaining_count <= 0) {
              item.status = "Completed";
            }
          }
        });
      });
    }
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  onOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.editable-cell') && !target.closest('nz-input-number') && this.editId !== null) {
      this.stopEdit();
    }
  }

  isNotSelected(value: string): boolean {
    return this.listOfSelectedTeamValue.indexOf(value) === -1;
  }

  updateSelectedTeam(expeditionCode: string, selectedTeam: string): void {
    const tmp: ExpeditionSelectTeam = {
      code: expeditionCode,
      team: selectedTeam,
    };
    let previousTeam: string = "";
    let flag = true;
    this.listOfSelectedTeam.forEach(item => {
      if (expeditionCode === item.code) {
        previousTeam = item.team;
        flag = false;
        if (selectedTeam !== this.defaultValue) {
          item.team = selectedTeam;
          this.listOfSelectedTeamValue = this.listOfSelectedTeamValue.filter(item => item !== previousTeam);
          this.listOfSelectedTeamValue.push(selectedTeam);
        } else {
          this.listOfSelectedTeamValue = this.listOfSelectedTeamValue.filter(item => item !== previousTeam);
        }
      }
    });

    if (flag && (selectedTeam !== this.defaultValue)) {
      this.listOfSelectedTeam.push(tmp);
      this.listOfSelectedTeamValue.push(selectedTeam);
    }
  }

  updateExpeditionSelectedTeam() {
    if (this.listOfSelectedTeam.length > 0 && this.selectedQuestsExpeditionList.length > 0) {
      this.selectedQuestsExpeditionList.forEach(item => {
        this.listOfSelectedTeam.forEach(countItem => {
          if (item.expedition_code === countItem.code) {
            item.selectedTeam = countItem.team;
          }
        });
      });
    }
  }

  addIntoHideList(expeditionCode:string):void {
    const tmp = this.selectedQuestsExpeditionList.filter(item => item.expedition_code === expeditionCode);
    this.listOfHide = this.listOfHide.concat(tmp);
    this.listOfHide.forEach(item => this.hideListSet.add(item.expedition_code));
    this.selectedQuestsExpeditionList = this.selectedQuestsExpeditionList.filter(item => item.expedition_code !== expeditionCode);
  }

  displayHidden() {
    this.selectedQuestsExpeditionList = this.selectedQuestsExpeditionList.concat(this.listOfHide);
    this.listOfHide = [];
    this.hideListSet.clear();
  }

  sortSelectedQuestExpeditionList() {
    this.selectedQuestsExpeditionList = this.selectedQuestsExpeditionList.sort((a,b)=> a.expedition_code.localeCompare(b.expedition_code));
  }

  parseConsumeTime = (time: string|number) => {
    if (typeof time === 'string') {
      // 如果时间包含'/'，取第一个部分
      if (time.toLowerCase() === "N/A".toLowerCase()) {
        return 0;
      } else {
        if (time.includes('/')) {
          return parseInt(time.split('/')[0], 10);
        }
      }

      return parseInt(time, 10);
    }
    return time;
  };

}
