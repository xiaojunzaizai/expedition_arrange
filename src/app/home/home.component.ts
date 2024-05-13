import { Component, inject,OnInit } from '@angular/core';
import { ExpeditionInfoComponent } from '../expedition-info/expedition-info.component';
import { ExpeditionQuestComponent } from '../expedition-quest/expedition-quest.component';
import {ExpeditionInfo, ExpeditionInfoInQuest,ExpeditionQuest} from "../interface/interfaceManagement";
import { ExpeditionSourceService } from '../service/expedition-source.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExpeditionInfoComponent, ExpeditionQuestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  questData!: ExpeditionQuest[];
  expeditionData!: ExpeditionInfo[];
  tmp: string[] = [];

  constructor(private expeditionSourceService:ExpeditionSourceService) {

  }
  ngOnInit(): void {
    this.loadQuestData();
    this.loadExpeditionData();
    // this.process();
  }

  loadQuestData() {
    this.expeditionSourceService.loadQuestData().subscribe({
      next: (data) => {
        this.questData = data;
      },
      error: (error) => {
        console.error('Error loading the quest data', error);
      }
    });
  }

  loadExpeditionData() {
    this.expeditionSourceService.loadExpeditionData().subscribe({
      next: (data) => {
        this.expeditionData = data;
      },
      error: (error) => {
        console.error('Error loading the quest data', error);
      }
    });
  }
  process(){
    this.questData.forEach(data => {
      this.tmp.push(data.name);
    })
  }

}
