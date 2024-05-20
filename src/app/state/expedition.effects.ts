// expedition.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpeditionSourceService } from '../service/expedition-source.service';
import * as ExpeditionActions from './expedition.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ExpeditionEffects {
  loadQuestData$ = createEffect(() => this.actions$.pipe(
    ofType(ExpeditionActions.loadQuestData),
    mergeMap(() => this.expeditionSourceService.loadQuestData().pipe(
      map(questData => ExpeditionActions.loadQuestDataSuccess({ questData })),
      catchError(error => of(ExpeditionActions.loadQuestDataFailure({ error })))
    ))
  ));

  loadExpeditionData$ = createEffect(() => this.actions$.pipe(
    ofType(ExpeditionActions.loadExpeditionData),
    mergeMap(() => this.expeditionSourceService.loadExpeditionData().pipe(
      map(expeditionData => ExpeditionActions.loadExpeditionDataSuccess({ expeditionData })),
      catchError(error => of(ExpeditionActions.loadExpeditionDataFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private expeditionSourceService: ExpeditionSourceService
  ) {}
}
