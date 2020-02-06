import {Component, NgZone, OnInit, TemplateRef} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {Meteor} from "meteor/meteor";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ColorEvent} from "ngx-color";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeIcon} from "../../shared/components/icon-picker/icon-picker.component";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

    saveIcon = faSave;
    categoryForm = this.fb.group({
        name: ['', Validators.required],
        icon: ['tasks', Validators.required],
        color: ['#ffffff', Validators.required],
    });
    categoryId: number;
    pickerModal: NgbModalRef;

    constructor(private router: Router, private fb: FormBuilder, private zone: NgZone, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    saveCategory() {
        if (this.categoryForm.valid) {
            const name = this.categoryForm.get(['name']).value;
            const icon = this.categoryForm.get(['icon']).value;
            const color = this.categoryForm.get(['color']).value;
            Meteor.call('addCategory', name, icon, color, (error) => {
                if(!error) {
                    this.zone.run(()=>this.router.navigateByUrl('/categories'));
                } else {
                    console.log(error);
                }
            });

        }
    }

    setIcon(newIcon: FontAwesomeIcon) {
        const key = Object.keys(newIcon)[0];
        const iconName = newIcon[key];
        this.categoryForm.patchValue({'icon': iconName});
        if(this.pickerModal) {
            this.pickerModal.close();
        }
    }

    setColor($event: ColorEvent) {
        this.categoryForm.patchValue({'color': $event.color.hex})
    }

    openIconPicker(content: TemplateRef<any>) {
        this.pickerModal = this.modalService.open(content);
    }
}
