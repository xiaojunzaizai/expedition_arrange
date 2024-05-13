import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule), provideNzI18n(zh_CN), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};
