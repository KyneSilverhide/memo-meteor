import { Injectable, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: any[] = [];

  constructor(private translate: TranslateService) {
    /**/
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  success(translateKey: string): void {
    this.show(this.translate.instant(translateKey), { classname: 'bg-success text-light', delay: 3000 });
  }

  error(translateKey: string): void {
    this.show(this.translate.instant(translateKey), { classname: 'bg-danger text-light', delay: 3000 });
  }

  systemError(message: string): void {
    this.show(message, { classname: 'bg-danger text-light', delay: 3000 });
  }

  remove(toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getToasts(): any[] {
    return this.toasts;
  }
}
