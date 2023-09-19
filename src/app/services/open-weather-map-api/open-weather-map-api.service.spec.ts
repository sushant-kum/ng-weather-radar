import { TestBed } from "@angular/core/testing";

import { OpenWeatherMapApiService } from "./open-weather-map-api.service";

describe("OpenWeatherMapApiService", () => {
  let service: OpenWeatherMapApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenWeatherMapApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
