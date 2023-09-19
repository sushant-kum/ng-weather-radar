export interface OpenWeatherMapGeoCodingLocationAPIRequestParameters {
  q: {
    cityName: string;
    stateCode?: string;
    countryCode?: string;
  };
  appid: string;
  limit?: number;
}

export interface OpenWeatherMapGeoCodingLocationAPIResponseItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface OpenWeatherMapGeoCodingLocationAPIResponse
  extends Array<OpenWeatherMapGeoCodingLocationAPIResponseItem> {}

export interface OpenWeatherMapGeoCodingZipAPIRequestParameters {
  zip: string;
  appid: string;
}

export interface OpenWeatherMapGeoCodingZipAPIResponse {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}
