import {  Component, Input, OnInit } from '@angular/core';
import {NzmoduleModule} from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';

@Component({
  selector: 'app-expedition-info',
  standalone: true,
  imports: [NzmoduleModule],
  templateUrl: './expedition-info.component.html',
  styleUrl: './expedition-info.component.css'
})
export class ExpeditionInfoComponent implements OnInit{
  @Input() expedition: ExpeditionInfo[]  = [];
  @Input() selectedQuests: ExpeditionQuest[] = [];

  constructor() {}

  ngOnInit(): void {}

}
