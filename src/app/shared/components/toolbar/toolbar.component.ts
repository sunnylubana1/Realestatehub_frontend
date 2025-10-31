import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SiteNamePipe } from '../../pipes/site-name.pipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { RegisterComponent } from 'src/app/features/auth/register/register.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SiteNamePipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  mobileMenuOpen = false;
 isLoggedIn$ = this.auth.isLoggedIn$;
 
  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openLogin() {
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

  

  logout() {
    this.auth.logout();
  }
}
