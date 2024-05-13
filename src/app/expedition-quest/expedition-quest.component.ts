import { Component, Input } from '@angular/core';
import { ExpeditionQuest } from '../interface/interfaceManagement';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-expedition-quest',
  standalone: true,
  imports: [CommonModule,NzTabsModule,NzCollapseModule, NzTableModule, NzListModule, NzCardModule, NzGridModule],
  templateUrl: './expedition-quest.component.html',
  styleUrl: './expedition-quest.component.css'
})



export class ExpeditionQuestComponent {
  @Input() questData!: ExpeditionQuest[];
  tabsVisible: boolean =true;

  selectedId: string | null = null;

  onSelect(item: ExpeditionQuest): void {
    this.selectedId = this.selectedId === item.code? null : item.code;
  }

}
