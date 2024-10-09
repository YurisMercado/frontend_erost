import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), BrowserModule, provideAnimations(),provideHttpClient()],
};
