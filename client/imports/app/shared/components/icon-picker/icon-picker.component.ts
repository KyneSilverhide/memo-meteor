import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {ICONS} from "./icons";

@Component({
    selector: 'icon-picker',
    templateUrl: './icon-picker.component.html',
    styleUrls: ['./icon-picker.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPickerComponent {

    icons: FontAwesomeIcon[] = [];
    searchText = '';

    @Output() iconPicked = new EventEmitter<FontAwesomeIcon>();

    constructor() {
        ICONS.forEach(icon => {
            this.icons.push({'fas': icon});
        });
    }

    getIconObject(icon: FontAwesomeIcon) {
        const key = Object.keys(icon)[0];
        return [key, icon[key]];
    }

    chooseIcon(icon: FontAwesomeIcon) {
        this.iconPicked.emit(icon);
    }
}

export interface FontAwesomeIcon {
    [pack: string]: string;
}