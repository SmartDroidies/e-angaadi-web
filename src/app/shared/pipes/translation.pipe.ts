import { TranslationService } from './../service/translation.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
})
export class TranslationPipe implements PipeTransform {
  constructor(private transService: TranslationService) {}

  transform(transKey: string): string {
    return this.transService.translate(transKey);
  }
}
