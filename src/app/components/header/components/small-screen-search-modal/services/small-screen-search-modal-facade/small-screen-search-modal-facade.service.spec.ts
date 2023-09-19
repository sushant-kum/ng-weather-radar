import { TestBed } from "@angular/core/testing";

import { SmallScreenSearchModalFacadeService } from "./small-screen-search-modal-facade.service";

describe("SmallScreenSearchModalFacadeService", () => {
  let service: SmallScreenSearchModalFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallScreenSearchModalFacadeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
