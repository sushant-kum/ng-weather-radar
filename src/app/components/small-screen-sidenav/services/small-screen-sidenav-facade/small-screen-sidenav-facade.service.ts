import { Injectable } from "@angular/core";

import { LocalforageDBKeys } from "src/app/constants/localforage.constant";
import { WeatherUnit } from "src/app/constants/units.constant";
import { LocalforageService } from "src/app/services/localforage/localforage.service";

@Injectable()
export class SmallScreenSidenavFacadeService {
  constructor(private _localforageService: LocalforageService) {}

  getWeatherUnit(): Promise<WeatherUnit> {
    return this._localforageService.get(
      LocalforageDBKeys.SETTINGS_GLOBAL_WEATHER_UNIT
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setWeatherUnit(unit: WeatherUnit): Promise<any> {
    unit = Object.values(WeatherUnit).includes(unit)
      ? unit
      : WeatherUnit.METRIC;

    return this._localforageService.set(
      LocalforageDBKeys.SETTINGS_GLOBAL_WEATHER_UNIT,
      unit
    );
  }
}
