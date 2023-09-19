import { TestBed } from "@angular/core/testing";

import { SmallScreenSidenavFacadeService } from "./small-screen-sidenav-facade.service";

describe("SmallScreenSidenavFacadeService", () => {
  let service: SmallScreenSidenavFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallScreenSidenavFacadeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
