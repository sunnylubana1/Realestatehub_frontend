import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PropertyDto } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="property-card">
      <div class="property-image">
        <img 
          [src]="item.thumbnailUrl || item.mediaUrl || '/assets/default.jpg'"
          [alt]="item.title"
          class="img-fluid">

        <div class="property-badges">
          <span class="badge featured" >{{ item.status }}</span>
          <span class="badge for-sale" >For Sale</span>
        </div>
      </div>

      <div class="property-content">
        <div class="property-price" >₹{{ item.price | number }}</div>
        <h4 class="property-title">{{ item.title }}</h4>
        <p class="property-location" *ngIf="item.city || item.state">
          <i class="bi bi-geo-alt"></i> {{ item.city }}{{ item.city && item.state ? ', ' : '' }}{{ item.state }}
        </p>

        <div class="property-features" >
          <span ><i class="bi bi-house"></i> 3 Bed</span>
          <span ><i class="bi bi-water"></i> 3 Bath</span>
          <span ><i class="bi bi-arrows-angle-expand"></i> 2015sqft</span>
        </div>

        <a [routerLink]="['/property', item.id]" class="btn btn-primary w-100">View Details</a>
      </div>
    </div>
  `
})
export class PropertyCardComponent {
  @Input() item!: any;
}
