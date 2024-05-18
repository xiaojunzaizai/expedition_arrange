// state/expedition.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ExpeditionSourceService } from '../service/expedition-source.service';
import { loadQuestData, loadQuestDataSuccess, loadExpeditionData, loadExpeditionDataSuccess } from './expedition.actions';

@Injectable()
export class ExpeditionEffects {
  loadQuestData$ = createEffect(() => this.actions$.pipe(
    ofType(loadQuestData),
    switchMap(() => this.expeditionService.loadQuestData().pipe(
      map(quests => loadQuestDataSuccess({ quests })),
      catchError(error => of({ type: '[Expedition Quest] Load Quest Data Failed', error }))
    ))
  ));

  loadExpeditionData$ = createEffect(() => this.actions$.pipe(
    ofType(loadExpeditionData),
    switchMap(() => this.expeditionService.loadExpeditionData().pipe(
      map(expeditions => loadExpeditionDataSuccess({ expeditions })),
      catchError(error => of({ type: '[Expedition Info] Load Expedition Data Failed', error }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private expeditionService: ExpeditionSourceService
  ) {}
}
