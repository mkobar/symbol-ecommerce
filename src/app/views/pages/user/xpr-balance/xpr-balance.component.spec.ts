import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XprBalanceComponent } from "./xpr-balance.component";

describe("XprBalanceComponent", () => {
  let component: XprBalanceComponent;
  let fixture: ComponentFixture<XprBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XprBalanceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XprBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
