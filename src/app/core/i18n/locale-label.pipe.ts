import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({ name: 'locLabel', standalone: true, pure: false })
export class LocaleLabelPipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(value: string | undefined | null, kind: string): string {
    return this.i18n.label(kind, value);
  }
}
