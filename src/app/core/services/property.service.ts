
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PropertyDto } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
   private baseUrl = `${environment.apiUrl}/api`;
  constructor(private http: HttpClient) {}

  list(query: any): Observable<{ items: PropertyDto[] } | PropertyDto[]> {
    let params = new HttpParams();
    Object.keys(query || {}).forEach(k => {
      const v = query[k];
      if (v !== undefined && v !== null && v !== '') params = params.set(k, v);
    });
    return this.http.get<{ items: PropertyDto[] } | PropertyDto[]>(`${environment.apiBaseUrl}/properties`, { params });
  }
  getById(id: string) {
  return this.http.get<PropertyDto>(`${environment.apiBaseUrl}/properties/${id}`);
}
getFiltered(listingType?: string, search?: string) {
  const params: any = {};

  if (listingType) params.listingType = listingType;
  if (search) params.search = search;

  const query = new URLSearchParams(params).toString();

  return this.http.get<any[]>(`${this.baseUrl}/properties${query ? '?' + query : ''}`);
}
}
