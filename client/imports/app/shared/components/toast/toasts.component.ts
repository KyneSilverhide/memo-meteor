import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {
  toasts: any[];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toasts = this.toastService.getToasts();
  }

  isTemplate(toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }

  remove(toast: any): void {
    this.toastService.remove(toast);
    this.toasts = this.toastService.getToasts();
  }
}
