import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-seller-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
  <h2 mat-dialog-title>Contact Seller</h2>
  <mat-dialog-content>
    <p class="text-sm text-slate-600 mb-2">
      Send a message about: <strong>{{ data?.propertyTitle }}</strong>
    </p>

    <mat-form-field appearance="outline" class="w-full mb-2">
      <mat-label>Your Name</mat-label>
      <input matInput [(ngModel)]="form.name" placeholder="Enter your name" />
    </mat-form-field>

    <mat-form-field appearance="outline" class="w-full mb-2">
      <mat-label>Email</mat-label>
      <input matInput [(ngModel)]="form.email" placeholder="Enter your email" type="email" />
    </mat-form-field>

    <mat-form-field appearance="outline" class="w-full mb-2">
      <mat-label>Message</mat-label>
      <textarea matInput [(ngModel)]="form.message" rows="4" placeholder="Write your message..."></textarea>
    </mat-form-field>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef.close()">Cancel</button>
    <button mat-raised-button color="primary" (click)="submit()">Send</button>
  </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field { width: 100%; }
    h2 { font-weight: 600; }
  `]
})
export class ContactSellerDialogComponent {
  form = { name: '', email: '', message: '' };

  constructor(
    public dialogRef: MatDialogRef<ContactSellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { propertyTitle: string }
  ) {}

  submit() {
    if (!this.form.name || !this.form.email || !this.form.message) {
      alert('Please fill all fields.');
      return;
    }

    // In future: send this to backend API endpoint
    console.log('Message sent:', this.form);

    alert('Message sent successfully!');
    this.dialogRef.close(this.form);
  }
}
