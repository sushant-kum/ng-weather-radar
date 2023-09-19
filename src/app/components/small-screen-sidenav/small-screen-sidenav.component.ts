import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, filter, takeUntil } from "rxjs/operators";

import { SmallScreenSidenavFacadeService } from "./services/small-screen-sidenav-facade/small-screen-sidenav-facade.service";

import { WeatherUnit } from "src/app/constants/units.constant";
import { DarkModeService } from "src/app/services/dark-mode/dark-mode.service";

@Component({
  selector: "app-small-screen-sidenav",
  templateUrl: "./small-screen-sidenav.component.html",
  styleUrls: ["./small-screen-sidenav.component.scss"],
  providers: [SmallScreenSidenavFacadeService],
})
export class SmallScreenSidenavComponent implements OnInit, OnDestroy {
  formSidenav: FormGroup<{
    weatherUnit: FormControl<WeatherUnit | null>;
    darkMode: FormControl<boolean | null>;
  }> = new FormGroup({
    weatherUnit: new FormControl<WeatherUnit | null>(WeatherUnit.METRIC),
    darkMode: new FormControl<boolean | null>(null),
  });

  private _sidenavOpened: boolean = false;

  private _destroyerSubject: Subject<void> = new Subject<void>();

  constructor(
    private _smallScreenSidenavFacadeService: SmallScreenSidenavFacadeService,
    private _darkModeService: DarkModeService,
    private _router: Router
  ) {
    this.formSidenav.get("darkMode")?.setValue(this._darkModeService.darkMode);
    this._darkModeService.darkModeObservable
      .pipe(takeUntil(this._destroyerSubject))
      .subscribe((darkMode: boolean) => {
        this.formSidenav.get("darkMode")?.setValue(darkMode);
      });
  }

  @Input()
  get sidenavOpened(): boolean {
    return this._sidenavOpened;
  }

  get enumWeatherUnit(): typeof WeatherUnit {
    return WeatherUnit;
  }

  set sidenavOpened(value: BooleanInput) {
    this._sidenavOpened = coerceBooleanProperty(value);
  }

  ngOnInit(): void {
    this._setWeatherUnit();
    this._subscribeToWeatherUnitChange();
    this._subscribeToDarkModeChange();
  }

  ngOnDestroy(): void {
    this._destroyerSubject.next();
    this._destroyerSubject.complete();
  }

  private _setWeatherUnit(): void {
    this._smallScreenSidenavFacadeService
      .getWeatherUnit()
      .then((presetWeahterUnit: WeatherUnit) => {
        this.formSidenav.get("weatherUnit")?.setValue(presetWeahterUnit);
      });
  }

  private _subscribeToWeatherUnitChange(): void {
    this.formSidenav
      .get("weatherUnit")
      ?.valueChanges.pipe(takeUntil(this._destroyerSubject), debounceTime(500))
      .subscribe(() => {
        this._smallScreenSidenavFacadeService
          .getWeatherUnit()
          .then((presetWeahterUnit: WeatherUnit) => {
            const weatherUnit: WeatherUnit = Object.values(
              WeatherUnit
            ).includes(
              this.formSidenav.get("weatherUnit")
                ?.value as unknown as WeatherUnit
            )
              ? this.formSidenav.get("weatherUnit")?.value ?? WeatherUnit.METRIC
              : WeatherUnit.METRIC;

            if (presetWeahterUnit !== weatherUnit) {
              this._smallScreenSidenavFacadeService
                .setWeatherUnit(weatherUnit)
                .then(() => {
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

  private _subscribeToDarkModeChange(): void {
    this.formSidenav
      .get("darkMode")
      ?.valueChanges.pipe(
        takeUntil(this._destroyerSubject),
        filter(
          (darkMode: boolean | null) =>
            this._darkModeService.darkMode !== darkMode
        )
      )
      .subscribe({
        next: (darkMode: boolean | null) => {
          this._darkModeService.darkMode = darkMode ?? false;
        },
      });
  }
}
