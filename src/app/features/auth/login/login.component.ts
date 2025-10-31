import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService, LoginDto } from 'src/app/core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { environment } from 'src/environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  loading = false;
  hidePassword = true;
  errorMsg = '';

  form = this.fb.group({
    emailOrPhone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private socialAuth: SocialAuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  // ✅ load Google SDK once component renders
  async ngAfterViewInit() {
    await this.loadGoogleScript();
    this.initializeGoogle();
  }

  // Dynamically load Google Identity script (no need to modify index.html)
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('google-jssdk')) return resolve();
      const script = document.createElement('script');
      script.id = 'google-jssdk';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private initializeGoogle() {
    google.accounts.id.initialize({
      client_id: environment.oauth.googleClientId,
      callback: (response: any) => this.handleGoogleResponse(response)
    });
  }

  // ✅ Replaces old angularx Google login flow
  googleLogin() {
    google.accounts.id.prompt(); // shows the Google one-tap / popup
  }

  private handleGoogleResponse(response: any) {
    const jwt = response.credential;
    const payload = JSON.parse(atob(jwt.split('.')[1]));

    console.log('Google user payload:', payload);
    const payloadGoogle = {
        provider: 'google' as const,
        providerId: jwt,
        email: payload.email,
        name: payload.name,
        profileImageUrl: payload.photoUrl
      };

    this.auth.externalLogin(payloadGoogle).subscribe({
      next: (res: any) => {
        this.auth.storeToken(res.token);
        this.dialog.closeAll();
      },
      error: (err) => {
        console.error('Google login failed:', err);
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const payload = {
      email: this.form.value.emailOrPhone,
      password: this.form.value.password
    } as LoginDto;

    this.auth.login(payload).subscribe({
      next: (res: any) => {
        this.auth.storeToken(res.token);
        this.dialog.closeAll();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Invalid credentials';
        this.loading = false;
      }
    });
  }

  facebookLogin() {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      const payload = {
        provider: 'facebook' as const,
        providerId: user.id,
        email: user.email,
        name: user.name,
        profileImageUrl: user.photoUrl
      };
      if (payload.email) {
        this.auth.externalLogin(payload).subscribe(res => {
          this.auth.storeToken(res.token);
          this.dialog.closeAll();
        });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openRegister() {
    this.closeDialog();
    this.dialog.open(RegisterComponent, {
      width: '95vw',
      maxWidth: '420px',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: 'auth-dialog',
      autoFocus: false,
      restoreFocus: false
    }).afterOpened().subscribe(() => {
      setTimeout(() => window.globalInitializer?.(), 50);
    });
  }
}
