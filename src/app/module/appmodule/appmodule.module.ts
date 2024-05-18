import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from '../../state/expedition.reducer';
import { ExpeditionEffects } from '../../state/expedition.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('expedition', reducer),
    EffectsModule.forFeature([ExpeditionEffects])
  ]
})
export class AppmoduleModule { }
