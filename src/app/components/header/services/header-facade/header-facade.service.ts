import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CitySearchResultItem } from "../../models/city-search-result-item";

import { LocalforageDBKeys } from "src/app/constants/localforage.constant";
import { WeatherUnit } from "src/app/constants/units.constant";
import { OpenWeatherMapGeoCodingLocationAPIResponse } from "src/app/models/open-weather-map-api.model";
import { LocalforageService } from "src/app/services/localforage/localforage.service";
import { OpenWeatherMapApiService } from "src/app/services/open-weather-map-api/open-weather-map-api.service";

@Injectable()
export class HeaderFacadeService {
  constructor(
    private _openWeatherMapApiService: OpenWeatherMapApiService,
    private _localforageService: LocalforageService
  ) {}

  searchByCityName(cityName: string): Observable<CitySearchResultItem[]> {
    return this._openWeatherMapApiService
      .searchByLocationGeoCoding({ cityName })
      .pipe(
        map((result: OpenWeatherMapGeoCodingLocationAPIResponse) => {
          const searchResult: CitySearchResultItem[] = [];

          result.forEach((resultItem) => {
            searchResult.push({
              cityName: resultItem.name,
              state: resultItem.state,
              countryCode: resultItem.country,
              coordinates: {
                lat: resultItem.lat,
                lon: resultItem.lon,
              },
            });
          });

          return searchResult;
        })
      );
  }

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
