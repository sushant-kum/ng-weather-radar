import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CitySearchResultItem } from "src/app/components/header/models/city-search-result-item";
import { OpenWeatherMapGeoCodingLocationAPIResponse } from "src/app/models/open-weather-map-api.model";
import { OpenWeatherMapApiService } from "src/app/services/open-weather-map-api/open-weather-map-api.service";

@Injectable()
export class SmallScreenSearchModalFacadeService {
  constructor(private _openWeatherMapApiService: OpenWeatherMapApiService) {}

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
}
