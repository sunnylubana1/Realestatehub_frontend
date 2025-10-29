
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { filter } from 'rxjs/operators';
declare global {
  interface Window {
    globalInitializer: () => void;
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent,FooterComponent],
  template: `
    <app-toolbar></app-toolbar>
    <main class="main">
      <router-outlet></router-outlet>
    </main>
  <app-footer></app-footer>
  
  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Preloader -->
  <div id="preloader"></div>
  `
})
export class AppComponent { 
   constructor(private router: Router) {}
  year = new Date().getFullYear();

   ngAfterViewInit() {
       this.runGlobalInit();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Small delay ensures new component DOM is rendered
        setTimeout(() => this.runGlobalInit(), 50);
      });

    }
    private runGlobalInit() {
    if (window.globalInitializer) {
      console.log('Running global initializer after route change');
      window.globalInitializer();
    } else {
      console.warn('globalInitializer not found — check script load');
    }
  }
  }
 
