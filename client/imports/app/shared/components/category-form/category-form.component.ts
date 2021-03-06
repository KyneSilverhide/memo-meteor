import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { faBackspace, faSave } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs';
import { FontAwesomeIcon } from '../icon-picker/icon-picker.component';
import { Categories } from '../../../../../../imports/collections/categories';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  saveIcon = faSave;
  backIcon = faBackspace;

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    icon: ['tasks', Validators.required],
    color: ['#607d8b', Validators.required]
  });

  categoryId: string;
  pickerModal: NgbModalRef;
  categorySubscription: Subscription;

  @Input() isModal = false;

  @Output() onCategorySaved = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private zone: NgZone,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.isModal) {
      this.route.queryParams.subscribe(params => {
        if (params.categoryId) {
          this.categoryId = params.categoryId;
          this.categorySubscription = MeteorObservable.subscribe('category', params.categoryId).subscribe(() => {
            const category = Categories.findOne({ _id: this.categoryId });
            this.categoryForm.patchValue({
              name: category.name,
              icon: category.icon,
              color: category.color
            });
          });
        }
      });
    }
  }

  saveCategory(): void {
    if (this.categoryForm.valid) {
      const name = this.categoryForm.get(['name']).value;
      const icon = this.categoryForm.get(['icon']).value;
      const color = this.categoryForm.get(['color']).value;
      if (this.categoryId != null) {
        this.updateCategory(this.categoryId, name, icon, color);
      } else {
        this.createCategory(name, icon, color);
      }
    }
  }

  goBackToList(): void {
    this.router.navigateByUrl('/categories').then(() => {
      /**/
    });
  }

  setIcon(newIcon: FontAwesomeIcon): void {
    const key = Object.keys(newIcon)[0];
    const iconName = newIcon[key];
    this.categoryForm.patchValue({ icon: iconName });
    if (this.pickerModal) {
      this.pickerModal.close();
    }
  }

  openIconPicker(content: TemplateRef<any>): void {
    this.pickerModal = this.modalService.open(content, { centered: true });
  }

  setColor($event: ColorEvent): void {
    this.categoryForm.patchValue({ color: $event.color.hex });
  }

  private createCategory(name, icon, color): void {
    Meteor.call('addCategory', name, icon, color, error => {
      this.zone.run(() => {
        if (!error) {
          this.processSuccess(true);
        } else {
          this.toastService.systemError(error);
        }
      });
    });
  }

  private processSuccess(isNew: boolean): void {
    if (this.isModal) {
      this.onCategorySaved.emit();
    } else {
      this.goBackToList();
    }
    if (isNew) {
      this.toastService.success('APP.CATEGORY.CREATESUCCESS');
    } else {
      this.toastService.success('APP.CATEGORY.EDITSUCCESS');
    }
  }

  private updateCategory(id, name, icon, color): void {
    Meteor.call('updateCategory', id, name, icon, color, error => {
      this.zone.run(() => {
        if (!error) {
          this.processSuccess(false);
        } else {
          this.toastService.systemError(error);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
