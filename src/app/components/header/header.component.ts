import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, filter, take, takeUntil } from "rxjs/operators";

import { SmallScreenSearchModalComponent } from "./components/small-screen-search-modal/small-screen-search-modal.component";
import { CitySearchResultItem } from "./models/city-search-result-item";
import { HeaderFacadeService } from "./services/header-facade/header-facade.service";

import { APP_TITLE } from "src/app/constants/app-title.constant";
import {
  BREAKPOINTS_TO_OBSERVE,
  BREAKPOINT_DISPLAY_NAME_MAP,
  BreakpointName,
} from "src/app/constants/screen-breakpoint.constant";
import { WeatherUnit } from "src/app/constants/units.constant";
import { DarkModeService } from "src/app/services/dark-mode/dark-mode.service";

interface CitySearchResultDisplayItem extends CitySearchResultItem {
  display: string;
}

interface State {
  darkMode: boolean;
  scrolledHeader: boolean;
  currentScreenSize: BreakpointName | undefined;
  hamburgerActive: boolean;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [HeaderFacadeService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding("class") class = "app-header";

  @Output() sidenavOpenedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  readonly title: string = APP_TITLE.split(" ").join("<br />");

  readonly formHeaderRight = new FormGroup<{
    searchString: FormControl<string | null>;
    weatherUnit: FormControl<WeatherUnit | null>;
  }>({
    searchString: new FormControl(""),
    weatherUnit: new FormControl(WeatherUnit.METRIC, [Validators.required]),
  });

  state: State = {
    darkMode: false,
    scrolledHeader: false,
    currentScreenSize: undefined,
    hamburgerActive: false,
  };

  citySearchResultsBehaviourSubject = new BehaviorSubject<
    CitySearchResultDisplayItem[]
  >([]);

  private _scrolledPage: boolean = false;

  private _sidenavOpened: boolean = false;

  private _destroyerSubject: Subject<void> = new Subject<void>();

  constructor(
    private _headerFacadeService: HeaderFacadeService,
    private _darkModeService: DarkModeService,
    private _router: Router,
    private _breakpointObserver: BreakpointObserver,
    private _dialog: MatDialog
  ) {
    this.state.darkMode = this._darkModeService.darkMode;
    this._darkModeService.darkModeObservable
      .pipe(takeUntil(this._destroyerSubject))
      .subscribe((darkMode: boolean) => (this.state.darkMode = darkMode));

    this._breakpointObserver
      .observe(BREAKPOINTS_TO_OBSERVE)
      .pipe(takeUntil(this._destroyerSubject))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.state.currentScreenSize =
              BREAKPOINT_DISPLAY_NAME_MAP.get(query);
          }
        }
      });
  }

  @HostBinding("class.app-header--scrolled")
  @HostBinding("class.mat-elevation-z4")
  get headerScrolled(): boolean {
    return this.scrolledPage;
  }

  @Input()
  get scrolledPage(): boolean {
    return this._scrolledPage;
  }

  @Input()
  get sidenavOpened(): boolean {
    return this._sidenavOpened;
  }

  get enumWeatherUnit(): typeof WeatherUnit {
    return WeatherUnit;
  }

  get enumBreakpointName(): typeof BreakpointName {
    return BreakpointName;
  }

  set scrolledPage(scrolledPage: BooleanInput) {
    this._scrolledPage = coerceBooleanProperty(scrolledPage);
  }

  set sidenavOpened(sidenavOpened: BooleanInput) {
    this._sidenavOpened = coerceBooleanProperty(sidenavOpened);
    this.state.hamburgerActive = !!this._sidenavOpened;
  }

  ngOnInit(): void {
    this._setWeatherUnit();
    this._subscribeToSearchStringChange();
    this._subscribeToWeatherUnitChange();
  }

  ngOnDestroy(): void {
    this._destroyerSubject.next();
    this._destroyerSubject.complete();
  }

  citySearchOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedOption: CitySearchResultDisplayItem | undefined =
      this.citySearchResultsBehaviourSubject.value.find(
        (searchResults) => searchResults.display === event.option.value
      );

    this._router.navigate(["/", "weather"], {
      queryParams: {
        lat: selectedOption?.coordinates.lat,
        lon: selectedOption?.coordinates.lon,
      },
    });

    this.formHeaderRight.get("searchString")?.reset();
  }

  toggleSidenav(): void {
    this.state.hamburgerActive = !this.state.hamburgerActive;
    this.sidenavOpened = this.state.hamburgerActive;
    this.sidenavOpenedChange.emit(this.sidenavOpened);
  }

  toggleSearchModal(): void {
    const smallScreenSearchModalRef: MatDialogRef<SmallScreenSearchModalComponent> =
      this._dialog.open<SmallScreenSearchModalComponent>(
        SmallScreenSearchModalComponent,
        {
          autoFocus: false,
          closeOnNavigation: true,
          minHeight: "490px",
          minWidth: "90vw",
          panelClass: this.state.darkMode
            ? ["dark-mode", "mat-app-background"]
            : ["mat-app-background"],
        }
      );

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        filter(() => !!smallScreenSearchModalRef),
        take(1)
      )
      .subscribe({
        next: () => {
          smallScreenSearchModalRef.close();
        },
      });
  }

  private _setWeatherUnit(): void {
    this._headerFacadeService
      .getWeatherUnit()
      .then((presetWeahterUnit: WeatherUnit) => {
        this.formHeaderRight.get("weatherUnit")?.setValue(presetWeahterUnit);
      });
  }

  private _subscribeToSearchStringChange(): void {
    this.formHeaderRight
      .get("searchString")
      ?.valueChanges.pipe(debounceTime(500), takeUntil(this._destroyerSubject))
      .subscribe(() => {
        const searchString = this.formHeaderRight.get("searchString")?.value;

        if (searchString) {
          this._headerFacadeService
            .searchByCityName(searchString)
            .pipe(takeUntil(this._destroyerSubject))
            .subscribe((searchResults) => {
              this.citySearchResultsBehaviourSubject.next(
                searchResults.map((searchResult) => ({
                  cityName: searchResult.cityName,
                  state: searchResult.state ?? undefined,
                  countryCode: searchResult.countryCode,
                  coordinates: {
                    lat: searchResult.coordinates.lat,
                    lon: searchResult.coordinates.lon,
                  },
                  display: `${searchResult.cityName}${
                    searchResult.state ? ", " + searchResult.state : ""
                  }, ${searchResult.countryCode}`,
                }))
              );
            });
        } else {
          this.citySearchResultsBehaviourSubject.next([]);
        }
      });
  }

  private _subscribeToWeatherUnitChange(): void {
    this.formHeaderRight
      .get("weatherUnit")
      ?.valueChanges.pipe(takeUntil(this._destroyerSubject))
      .subscribe(() => {
        this._headerFacadeService
          .getWeatherUnit()
          .then((presetWeahterUnit: WeatherUnit) => {
            const weatherUnit: WeatherUnit = Object.values(
              WeatherUnit
            ).includes(
              this.formHeaderRight.get("weatherUnit")
                ?.value as unknown as WeatherUnit
            )
              ? this.formHeaderRight.get("weatherUnit")?.value ??
                WeatherUnit.METRIC
              : WeatherUnit.METRIC;

            if (presetWeahterUnit !== weatherUnit) {
              this._headerFacadeService.setWeatherUnit(weatherUnit).then(() => {
                const currentUrl = this._router.url;

                this._router
                  .navigateByUrl("/", { skipLocationChange: true })
                  .then(() => {
                    this._router.navigateByUrl(currentUrl);
                  });
              });
            }
          });
      });
  }
}
