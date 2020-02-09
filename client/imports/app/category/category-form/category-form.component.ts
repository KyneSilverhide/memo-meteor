import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { faBackspace, faSave } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs';
import { FontAwesomeIcon } from '../../shared/components/icon-picker/icon-picker.component';
import { Categories } from '../../../../../imports/collections/categories';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  saveIcon = faSave;

  backIcon = faBackspace;

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    icon: ['tasks', Validators.required],
    color: ['#ffffff', Validators.required]
  });

  categoryId: string;

  pickerModal: NgbModalRef;

  categorySubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private zone: NgZone,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit() {
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

  saveCategory() {
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

  goBackToList() {
    this.zone.run(() => this.router.navigateByUrl('/categories'));
  }

  setIcon(newIcon: FontAwesomeIcon) {
    const key = Object.keys(newIcon)[0];
    const iconName = newIcon[key];
    this.categoryForm.patchValue({ icon: iconName });
    if (this.pickerModal) {
      this.pickerModal.close();
    }
  }

  openIconPicker(content: TemplateRef<any>) {
    this.pickerModal = this.modalService.open(content, { centered: true });
  }

  setColor($event: ColorEvent) {
    this.categoryForm.patchValue({ color: $event.color.hex });
  }

  private createCategory(name, icon, color) {
    Meteor.call('addCategory', name, icon, color, error => {
      if (!error) {
        this.goBackToList();
        this.toastService.success('Category created !');
      } else {
        this.toastService.error(error);
      }
    });
  }

  private updateCategory(id, name, icon, color) {
    Meteor.call('updateCategory', id, name, icon, color, error => {
      if (!error) {
        this.zone.run(() => this.router.navigateByUrl('/categories'));
        this.toastService.success('Category edited !');
      } else {
        this.toastService.error(error);
      }
    });
  }
}
