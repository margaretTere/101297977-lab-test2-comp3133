import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionDataService } from '../../services/mission-data.service';
import { Launch } from '../../models/launch.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-mission-details',
  imports: [
    RouterLink, 
    FormsModule, 
    NgIf, 
    MatCardModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatButtonModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  missionDetails: Launch | undefined;
  flightNumber: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private missionDataService: MissionDataService
  ) {}

  ngOnInit(): void {
    
    this.flightNumber = Number(this.route.snapshot.paramMap.get('flight_number'));

    if (this.flightNumber) {
     
      this.missionDataService.getLaunchByFlightNumber(this.flightNumber).subscribe(
        (data) => {
          this.missionDetails = data;
        },
        (error) => {
          console.error('Error fetching mission details:', error);
        }
      );
    }
  }
}