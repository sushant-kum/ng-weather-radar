import { TestBed } from "@angular/core/testing";

import { HeaderFacadeService } from "./header-facade.service";

describe("HeaderFacadeService", () => {
  let service: HeaderFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderFacadeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
