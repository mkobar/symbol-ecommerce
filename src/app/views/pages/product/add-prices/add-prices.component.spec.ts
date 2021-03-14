import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddPricesComponent } from "./add-prices.component";

describe("AddPricesComponent", () => {
  let component: AddPricesComponent;
  let fixture: ComponentFixture<AddPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPricesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
