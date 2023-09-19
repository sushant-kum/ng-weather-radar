import { Component, OnDestroy } from "@angular/core";
import { Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { APP_TITLE } from "./constants/app-title.constant";
import { DarkModeService } from "./services/dark-mode/dark-mode.service";
import { PageTitleService } from "./services/page-title/page-title.service";

import { VERSION } from "src/environments/version-info";

interface State {
  darkMode: boolean;
  sidenavOpened: boolean;
  scrolledPage: boolean;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
  state: State = {
    darkMode: false,
    sidenavOpened: false,
    scrolledPage: false,
  };

  private _destroyerSubject: Subject<void> = new Subject<void>();

  constructor(
    private _pageTitleService: PageTitleService,
    private _darkModeService: DarkModeService
  ) {
    fromEvent(window, "scroll")
      .pipe(takeUntil(this._destroyerSubject))
      .subscribe((e: Event) => this._setScrolledHeaderState(e));

    this._pageTitleService.setPageTitle();

    this.state.darkMode = this._darkModeService.darkMode;
    this._darkModeService.darkModeObservable
      .pipe(takeUntil(this._destroyerSubject))
      .subscribe((darkMode: boolean) => (this.state.darkMode = darkMode));

    console.info(
      `${APP_TITLE} version: ${VERSION.version}, built: ${new Date(
        VERSION.buildTimestamp
      )}`
    );
  }

  ngOnDestroy(): void {
    this._destroyerSubject.next();
    this._destroyerSubject.complete();
  }

  onSidenavToggle(sidenavOpened: boolean): void {
    this.state.sidenavOpened = !!sidenavOpened;
  }

  onSidenavOpenChange(sidenavOpened: boolean): void {
    this.state.sidenavOpened = sidenavOpened;
  }

  private _setScrolledHeaderState(e: Event): void {
    const scrollTopPx: number =
      (e.target as Element).scrollTop ??
      (e.target as Document).scrollingElement?.scrollTop;

    if (scrollTopPx && scrollTopPx > 0) {
      this.state.scrolledPage = true;
    } else {
      this.state.scrolledPage = false;
    }
  }
}
