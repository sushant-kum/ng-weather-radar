export class OpenWeatherMapApiConstant {
  readonly apiBaseRoute = "https://api.openweathermap.org";
  readonly geoCodingAPIBaseRoute = `${this.apiBaseRoute}/geo/1.0`;
  readonly geoCodingLocationAPIRoute = `${this.geoCodingAPIBaseRoute}/direct`;
  readonly geoCodingZipAPIRoute = `${this.geoCodingAPIBaseRoute}/zip`;
  readonly geoCodingLocationAPIMaxLimit = 5;
}
