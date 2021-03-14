import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Directive,
} from "@angular/core";
import {
  NgbdSortableHeader,
  SortEvent,
  Country,
} from "../../models/ngbd-sortable-table";
import { PriceService } from "../../services/price.services";
import { Price } from "../../models/price";
import { TranslateService } from "../../services/translate.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-table-sortable",
  templateUrl: "./table-sortable.component.html",
  styleUrls: ["./table-sortable.component.scss"],
})
export class TableSortableComponent implements OnInit {
  // COUNTRIES: Country[] = [
  //   {
  //     id: 1,
  //     name: "Russia",
  //     flag: "f/f3/Flag_of_Russia.svg",
  //     area: 17075200,
  //     population: 146989754,
  //   },
  //   {
  //     id: 2,
  //     name: "Canada",
  //     flag: "c/cf/Flag_of_Canada.svg",
  //     area: 9976140,
  //     population: 36624199,
  //   },
  //   {
  //     id: 3,
  //     name: "United States",
  //     flag: "a/a4/Flag_of_the_United_States.svg",
  //     area: 9629091,
  //     population: 324459463,
  //   },
  //   {
  //     id: 4,
  //     name: "China",
  //     flag: "f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  //     area: 9596960,
  //     population: 1409517397,
  //   },
  // ];
  // countries: Country[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  listPrices: Price[] = [];
  headerNames: string[] = [];
  constructor(
    private priceService: PriceService,
    public translate: TranslateService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    // this.countries = this.COUNTRIES;
    this.priceService
      .getPrices("prices")
      .valueChanges()
      .subscribe((t) => {
        console.log("t :>> ", t);
        this.listPrices = t;
        this.headerNames = Object.keys(this.listPrices[0]).filter(
          (w) => w !== "urlFile" && w !== "fileName"
        );
        console.log("this.headerNames :>> ", this.headerNames);
      });
  }
  delete(keyOfFile: string) {
    this.priceService.deletePrice("-MAaA95WKdL_qBcS_RgK");
  }

  // onSort({ column, direction }: SortEvent) {
  //   // resetting other headers
  //   this.headers.forEach((header) => {
  //     if (header.sortable !== column) {
  //       header.direction = "";
  //     }
  //   });

  //   // sorting countries
  //   if (direction === "" || column === "") {
  //     this.countries = this.COUNTRIES;
  //   } else {
  //     this.countries = [...this.COUNTRIES].sort((a, b) => {
  //       const res = this.compare(`${a[column]}`, `${b[column]}`);
  //       return direction === "asc" ? res : -res;
  //     });
  //   }
  // }

  // compare(v1: string, v2: string) {
  //   return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  // }
}
