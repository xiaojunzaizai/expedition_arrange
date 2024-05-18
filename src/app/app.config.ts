import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/expedition.reducer';
import { ExpeditionEffects } from './state/expedition.effects';

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule),
    provideNzI18n(zh_CN),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      StoreModule.forRoot({ expedition: reducer }),
      StoreModule.forRoot({ quests: reducer }),
      EffectsModule.forRoot([ExpeditionEffects])
    )
  ],
};
