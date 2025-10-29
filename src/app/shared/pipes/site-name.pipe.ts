import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'siteName',
  standalone: true
})
export class SiteNamePipe implements PipeTransform {
  transform(): string {
    return environment.siteName;
  }
}
