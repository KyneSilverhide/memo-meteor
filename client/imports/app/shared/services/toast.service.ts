import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: any[] = [];

  constructor() {
    /**/
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  success(message: string) {
    this.show(message, { classname: 'bg-success text-light', delay: 3000 });
  }

  error(message: string) {
    this.show(message, { classname: 'bg-danger text-light', delay: 3000 });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getToasts(): any[] {
    return this.toasts;
  }
}
