import { Component, Input } from '@angular/core';
import {NzmoduleModule} from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo } from '../interface/interfaceManagement';

@Component({
  selector: 'app-expedition-info',
  standalone: true,
  imports: [NzmoduleModule],
  templateUrl: './expedition-info.component.html',
  styleUrl: './expedition-info.component.css'
})
export class ExpeditionInfoComponent {
  @Input() expedition!: ExpeditionInfo[];

}
