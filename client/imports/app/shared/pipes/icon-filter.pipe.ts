import { Pipe, PipeTransform } from '@angular/core';
import { FontAwesomeIcon } from '../components/icon-picker/icon-picker.component';

@Pipe({
  name: 'iconFilter'
})
export class IconFilterPipe implements PipeTransform {
  transform(icons: FontAwesomeIcon[], searchText: string): FontAwesomeIcon[] {
    if (!searchText || searchText.trim() === '') {
      return icons;
    }
    return icons.filter(icon => {
      const key = Object.keys(icon)[0];
      return icon[key].includes(searchText.toLowerCase());
    });
  }
}
