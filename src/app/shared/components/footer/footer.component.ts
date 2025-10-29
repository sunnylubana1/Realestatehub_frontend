
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SiteNamePipe } from '../../pipes/site-name.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule,SiteNamePipe],
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {}
