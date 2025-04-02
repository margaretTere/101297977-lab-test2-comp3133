import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mission-filter',
  imports: [FormsModule, NgFor, MatCardModule, MatSelectModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionFilterComponent {
  @Output() filtersSelected = new EventEmitter<any>()

  @Input() years: number[] = [];
  selectedYear: number = 0; 
  selectedLaunchSuccess: string = ''; 
  selectedLandingSuccess: string = '';

  constructor() {}

  onFilterChange() {
    this.filtersSelected.emit({
      selectedYear: this.selectedYear,
      launchSuccess: this.selectedLaunchSuccess,
      landingSuccess: this.selectedLandingSuccess
    });
  }
}

