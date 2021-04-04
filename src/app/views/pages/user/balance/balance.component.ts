import { Component, OnInit, DoCheck } from "@angular/core";
import { SymbolService } from "src/app/shared/services/symbol.service";

@Component({
  selector: "app-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"],
})
export class BalanceComponent implements OnInit {
  balance = null;
  //
  constructor(private symbolService: SymbolService) {}
  ngOnInit(): void {
    const userAddress = localStorage.getItem("symbolAddress");
    console.log(
      "🚀 ~ file: balance.component.ts ~ line 17 ~ BalanceComponent ~ ngOnInit ~ userAddress",
      userAddress
    );
    this.symbolService.symbolBalance.subscribe((bal) => {
      this.balance = +bal / 1e6;
      console.log(
        "🚀 ~ file: balance.component.ts ~ line 21 ~ BalanceComponent ~ ngOnInit ~ this.balance",
        this.balance
      );
    });
  }
}
