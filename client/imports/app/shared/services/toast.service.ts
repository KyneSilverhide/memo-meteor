import { Injectable, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private translate: TranslateService, private toastr: ToastrService) {
    /**/
  }

  success(translateKey: string): void {
    this.toastr.success(this.translate.instant(translateKey));
  }

  error(translateKey: string): void {
    this.toastr.error(this.translate.instant(translateKey));
  }

  systemError(message: string): void {
    this.toastr.error(message);
  }
}
