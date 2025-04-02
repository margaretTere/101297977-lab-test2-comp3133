import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissionDataService } from '../../services/mission-data.service';
import { Launch } from '../../models/launch.model';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { RouterLink } from '@angular/router';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mission-list',
  imports: [
    NgFor, 
    FormsModule, 
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MissionFilterComponent
  ],
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.css'
})
export class MissionListComponent implements OnInit {
  launches: Launch[] = [];
  filteredLaunches: Launch[] = [];
  years: number[] = [];

  constructor(private missionDataService: MissionDataService) {}

  ngOnInit() {
    this.getAllLaunches();
  }

  showdata() {
    console.log(this.filteredLaunches);
  }

  getAllLaunches() {
    this.missionDataService.getAllLaunches().subscribe(data => {
      this.launches = data;
      this.filteredLaunches = data;
      this.extractYears(data); 
    });
  }

  extractYears(launches: Launch[]) {
    this.years = [...new Set(launches.map(l => +l.launch_year))]; 
  }

  onFiltersSelected(filters: any) {
    const { selectedYear, launchSuccess, landingSuccess } = filters;
    this.missionDataService.getFilteredLaunches(selectedYear, launchSuccess, landingSuccess)
    .subscribe(data => this.filteredLaunches = data);
  }
}

