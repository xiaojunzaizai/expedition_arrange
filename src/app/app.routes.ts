import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "", redirectTo: "/expedition", pathMatch: "full" },
    { path: "expedition", component: HomeComponent }
];
