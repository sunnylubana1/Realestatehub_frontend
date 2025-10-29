
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SiteNamePipe } from '../../pipes/site-name.pipe';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule,SiteNamePipe],
  template: `
 <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="/" class="logo d-flex align-items-center me-auto me-xl-0">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.webp" alt=""> -->
        <h1 class="sitename">{{ '' | siteName }}</h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="/" class="active">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Properties</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Agents</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <a class="btn-getstarted" href="#">Get Started</a>

    </div>
  </header>
  `
})
export class ToolbarComponent {}
