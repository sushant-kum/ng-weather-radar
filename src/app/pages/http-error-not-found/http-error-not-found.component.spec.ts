import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpErrorNotFoundComponent } from "./http-error-not-found.component";

describe("HttpErrorNotFoundComponent", () => {
  let component: HttpErrorNotFoundComponent;
  let fixture: ComponentFixture<HttpErrorNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpErrorNotFoundComponent],
    });
    fixture = TestBed.createComponent(HttpErrorNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
