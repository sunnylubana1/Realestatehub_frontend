
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
  <div class="bg-white shadow rounded p-3 md:p-4 mb-4">
    <div class="grid gap-3 md:grid-cols-6">
      <mat-form-field appearance="outline" class="md:col-span-2">
        <mat-label>Search</mat-label>
        <input matInput [(ngModel)]="search" (keyup.enter)="apply()" placeholder="Keywords, address...">
      </mat-form-field>

      <div class="flex items-center gap-2 md:justify-end md:col-span-2 md:col-start-5">
        <button mat-raised-button color="primary" (click)="apply()">Apply</button>
        <button mat-stroked-button (click)="clear()">Clear</button>
      </div>
    </div>
  </div>
  `
})
export class PropertyFiltersComponent {
  @Output() filtersChange = new EventEmitter<any>();
  search = '';
  apply(){ this.emit(); }
  clear(){ this.search=''; this.emit(); }
  private emit(){ this.filtersChange.emit({ search: this.search }); }
}
