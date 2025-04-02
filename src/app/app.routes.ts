import { Routes } from '@angular/router';
import { MissionListComponent } from './components/missionlist/missionlist.component';
import { MissiondetailsComponent } from './components/missiondetails/missiondetails.component';

export const routes: Routes = [
    {path: '', component: MissionListComponent},
    {path: 'details/:flight_number', component: MissiondetailsComponent} 
];
