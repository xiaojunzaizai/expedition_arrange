// app.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { expeditionReducer } from '../../state/expedition.reducer';
import { ExpeditionEffects } from '../../state/expedition.effects';

@NgModule({
  declarations: [
    // 组件
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({ expedition: expeditionReducer }),
    EffectsModule.forRoot([ExpeditionEffects]),
  ],
})
export class AppModule { }
