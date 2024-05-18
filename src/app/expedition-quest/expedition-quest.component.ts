import { Component, Input } from '@angular/core';
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



export class ExpeditionQuestComponent {
  @Input() questData!: ExpeditionQuest[];
  tabsVisible: boolean =true;

  selectedItems: { [key: string]: boolean } = {};
}
