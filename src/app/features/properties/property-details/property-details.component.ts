import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../core/services/property.service';
import { PropertyDto } from '../../../core/models/property.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import * as Leaf from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ContactSellerDialogComponent } from '../contact-seller-dialog/contact-seller-dialog.component';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  property!: PropertyDto;
  loading = true;
  selectedImage: string | null = null;
  mapInitialized = false;

  constructor(  private route: ActivatedRoute,
  private propertyService: PropertyService,
  private dialog: MatDialog) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.propertyService.getById(id).subscribe({
        next: (res: any) => {
          this.property = res;
          this.loading = false;
          setTimeout(() => this.initializeMap(), 100);
        },
        error: () => this.loading = false
      });
    }
  }

  initializeMap() {
    if (this.mapInitialized || !this.property.latitude || !this.property.longitude) return;
const iconRetinaUrl = 'assets/img/Leaflet/marker-icon-2x.png';
const iconUrl = 'assets/img/Leaflet/marker-icon.png';
const shadowUrl = 'assets/img/Leaflet/marker-shadow.png';
const defaultIcon = Leaf.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
    const map = Leaf.map('map').setView(
      [this.property.latitude, this.property.longitude],
      14
    );

    Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    Leaf.marker([this.property.latitude, this.property.longitude],{icon:defaultIcon})
      .addTo(map)
      .bindPopup(this.property.title)
      .openPopup();

    this.mapInitialized = true;
  }

  openViewer(url: string) {
    this.selectedImage = url;
  }

  closeViewer() {
    this.selectedImage = null;
  }
  openContactForm() {
  this.dialog.open(ContactSellerDialogComponent, {
    width: '400px',
    data: { propertyTitle: this.property?.title }
  });
}

}
