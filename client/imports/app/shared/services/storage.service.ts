import { Injectable } from '@angular/core';
import { DisplayMode } from '../../task/display-mode.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    /**/
  }

  private DISPLAYMODE = 'memo-meteor-display-mode';

  public getDisplayMode(): DisplayMode {
    const displayModeIndex = localStorage.getItem(this.DISPLAYMODE);
    if (displayModeIndex != null) {
      if (displayModeIndex === '0') {
        return DisplayMode.COLUMN;
      } else {
        return DisplayMode.MASONRY;
      }
    }
    return DisplayMode.COLUMN;
  }

  public storeDisplayMode(displayMode: DisplayMode): void {
    localStorage.setItem(this.DISPLAYMODE, String(displayMode));
  }
}
