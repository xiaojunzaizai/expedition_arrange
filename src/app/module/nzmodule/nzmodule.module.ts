import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';




@NgModule({
  declarations: [],
  imports: [],
  exports: [    
    NzTabsModule,
    NzCollapseModule,
    NzTableModule,
    NzCardModule,
    NzCheckboxModule,
    NzListModule,
    NzGridModule,
    CommonModule
  ],
})
export class NzmoduleModule { }
