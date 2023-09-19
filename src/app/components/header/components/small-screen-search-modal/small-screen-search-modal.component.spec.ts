import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SmallScreenSearchModalComponent } from "./small-screen-search-modal.component";

describe("SmallScreenSearchModalComponent", () => {
  let component: SmallScreenSearchModalComponent;
  let fixture: ComponentFixture<SmallScreenSearchModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallScreenSearchModalComponent],
    });
    fixture = TestBed.createComponent(SmallScreenSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
