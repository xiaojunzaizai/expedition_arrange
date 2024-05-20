import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {NzmoduleModule} from '../module/nzmodule/nzmodule.module';
import { ExpeditionInfo } from '../interface/interfaceManagement';

@Component({
  selector: 'app-expedition-info',
  standalone: true,
  imports: [NzmoduleModule],
  templateUrl: './expedition-info.component.html',
  styleUrl: './expedition-info.component.css'
})
export class ExpeditionInfoComponent implements OnInit, AfterViewInit{
  @Input() expedition: ExpeditionInfo[]  = [];
  isViewInitialized = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.cdr.detectChanges();
  }
}
