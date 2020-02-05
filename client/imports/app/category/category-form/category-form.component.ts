import {Component, NgZone, OnInit} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {Meteor} from "meteor/meteor";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

    saveIcon = faSave;
    categoryForm = this.fb.group({
        name: ['', Validators.required],
        icon: ['', Validators.required],
        color: ['', Validators.required],
    });
    categoryId: number;

    constructor(private router: Router, private fb: FormBuilder, private zone: NgZone) {
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
}
