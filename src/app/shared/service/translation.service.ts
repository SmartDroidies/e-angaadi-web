import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private http: HttpClient) {}

  initializeTranslation(): void {
    this.http
      .get<unknown>(environment.productBaseUrl + '/translation')
      .subscribe((data) => localStorage.setItem('translation-ta', JSON.stringify(data)));
  }

  translate(key: string) {
    return key + 'ta';
  }
}
