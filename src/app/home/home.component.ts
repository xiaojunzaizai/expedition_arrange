import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadQuestData, loadExpeditionData } from '../state/expedition.actions';
import { ExpeditionState } from '../state/expedition.reducer';
import { ExpeditionInfoComponent } from '../expedition-info/expedition-info.component';
import { ExpeditionQuestComponent } from '../expedition-quest/expedition-quest.component';
import {ExpeditionInfo, ExpeditionInfoInQuest,ExpeditionQuest} from "../interface/interfaceManagement";
import { ExpeditionSourceService } from '../service/expedition-source.service';
import { GeneralModule } from '../module/generalmodule/general.module';
// import { AppModule } from '../module/appmodule/app.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GeneralModule,ExpeditionInfoComponent, ExpeditionQuestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  questData$: Observable<ExpeditionQuest[]>;
  expeditionData$: Observable<ExpeditionInfo[]>;

  constructor(private store: Store<{ expedition: ExpeditionState }>) {
    this.questData$ = this.store.select(state => state.expedition.questData);
    this.expeditionData$ = this.store.select(state => state.expedition.expeditionData);
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuestData());
    this.store.dispatch(loadExpeditionData());
  }

}
