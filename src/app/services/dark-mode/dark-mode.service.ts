import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { LocalforageService } from "../localforage/localforage.service";

import { LocalforageDBKeys } from "src/app/constants/localforage.constant";

@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  private _darkModeBehaviorSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private _localForageSvc: LocalforageService) {
    this._localForageSvc
      .get(LocalforageDBKeys.SETTINGS_GLOBAL_DARK_MODE)
      .then((preSetDarkMode: boolean) => {
        if (preSetDarkMode !== null) {
          this._darkModeBehaviorSubject.next(preSetDarkMode);
        } else if (
          window.matchMedia("(prefers-color-scheme)").media !== "not all"
        ) {
          this._darkModeBehaviorSubject.next(
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? true
              : false
          );
        } else {
          this._darkModeBehaviorSubject.next(false);
        }
      });
  }
  get darkModeObservable(): Observable<boolean> {
    return this._darkModeBehaviorSubject.asObservable();
  }

  get darkMode(): boolean {
    return this._darkModeBehaviorSubject.value;
  }

  set darkMode(darkMode: boolean) {
    this._localForageSvc
      .set(LocalforageDBKeys.SETTINGS_GLOBAL_DARK_MODE, darkMode)
      .then(() => {
        this._darkModeBehaviorSubject.next(darkMode);
      });
  }
}
