import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../core/services/property.service';
import { Router } from '@angular/router';
import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule,PropertyCardComponent],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnChanges {
  @Input() filterType: string = 'Buy';
  @Input() searchText: string = '';

  properties: any[] = [];
  loading = true;

  constructor(private propertyService: PropertyService,private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterType'] || changes['searchText']) {
      this.loadProperties();
    }
  }

  loadProperties() {
    this.loading = true;
    console.log("load property hit");
    this.propertyService.getFiltered(this.filterType, this.searchText).subscribe({
      next: (res: any) => {
        this.properties = res || [];
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }
   openDetails(id: string) {
    this.router.navigate(['/property', id]);
  }
}
