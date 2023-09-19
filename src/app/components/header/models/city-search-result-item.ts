export interface CitySearchResultItem {
  cityName: string;
  state?: string;
  countryCode: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}
