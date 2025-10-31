import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService, RegisterDto } from 'src/app/core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  errorMsg = '';
  successMsg = '';
  isAgent = '';
hidePassword=true;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [ Validators.pattern('^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$')]], // ✅ phone required
    password: ['', [Validators.required, Validators.minLength(6)]],
      isAgent: ['false']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  submit() {
    this.loading = true;

    const data = {
      ...this.form.value,
      isAgent: this.form.value.isAgent === 'true'
    } as RegisterDto;
    this.auth.register(data).subscribe({
      next: () => {
        this.successMsg = 'Registration successful! Please log in.';
        setTimeout(() => {
          this.dialog.closeAll();
          //this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Registration failed';
        this.loading = false;
      }
    });
  }
  closeDialog() {
  this.dialogRef.close();
}
openLogin() {
  this.closeDialog();
     this.dialog.open(LoginComponent, {
        width: '100%',
        maxWidth: '420px',     // max width constraint for desktop
        height: 'auto',
        maxHeight: '90vh',     // prevent overflow on mobile
        panelClass: 'auth-dialog',
        autoFocus: false,      // stops unwanted scroll jumps on mobile
        restoreFocus: false
      }).afterOpened().subscribe(() => {
          setTimeout(() => window.globalInitializer(), 50);
        });
  }
}
