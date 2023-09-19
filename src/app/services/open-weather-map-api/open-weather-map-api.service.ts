import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { OpenWeatherMapApiConstant } from "src/app/constants/open-weather-map-api.constant";
import {
  OpenWeatherMapGeoCodingLocationAPIRequestParameters,
  OpenWeatherMapGeoCodingLocationAPIResponse,
} from "src/app/models/open-weather-map-api.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OpenWeatherMapApiService {
  private readonly _openWeatherMapApiConstant: OpenWeatherMapApiConstant =
    new OpenWeatherMapApiConstant();

  constructor(private _http: HttpClient) {}

  searchByLocationGeoCoding(
    location: OpenWeatherMapGeoCodingLocationAPIRequestParameters["q"],
    limit?: OpenWeatherMapGeoCodingLocationAPIRequestParameters["limit"]
  ): Observable<OpenWeatherMapGeoCodingLocationAPIResponse> {
    const url = this._openWeatherMapApiConstant.geoCodingLocationAPIRoute;
    const locationQuery =
      location.cityName +
      (location.stateCode ? `,${location.stateCode}` : "") +
      (location.countryCode ? `,${location.countryCode}` : "");

    const params: HttpParams = new HttpParams()
      .append("q", locationQuery)
      .append("appid", environment.openWeatherMapAPIKey)
      .append(
        "limit",
        typeof limit === "number" &&
          limit > 0 &&
          limit <= this._openWeatherMapApiConstant.geoCodingLocationAPIMaxLimit
          ? limit
          : this._openWeatherMapApiConstant.geoCodingLocationAPIMaxLimit
      );

    return this._http.get<OpenWeatherMapGeoCodingLocationAPIResponse>(url, {
      params,
    });
  }
}
