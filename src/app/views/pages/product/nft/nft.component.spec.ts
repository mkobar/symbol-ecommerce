import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NftComponent } from "./nft.component";

describe("NftComponent", () => {
  let component: NftComponent;
  let fixture: ComponentFixture<NftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NftComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
