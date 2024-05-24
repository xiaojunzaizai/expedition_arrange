import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';




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
    NzButtonModule,
    NzEmptyModule,
    NzInputNumberModule,
    CommonModule,
    FormsModule
  ],
})
export class NzmoduleModule { }
