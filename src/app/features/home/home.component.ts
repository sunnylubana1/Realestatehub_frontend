import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { PropertyListComponent } from '../properties/property-list/property-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, PropertyListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedTab: string = 'Buy';
  searchText: string = '';

  ngOnInit() {}

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  onSearch() {
    console.log('Searching for:', this.searchText, 'in', this.selectedTab);
    // Later: Add logic to trigger property-list filter
  }
}
