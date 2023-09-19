import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SmallScreenSidenavComponent } from "./small-screen-sidenav.component";

describe("SmallScreenSidenavComponent", () => {
  let component: SmallScreenSidenavComponent;
  let fixture: ComponentFixture<SmallScreenSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallScreenSidenavComponent],
    });
    fixture = TestBed.createComponent(SmallScreenSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
