import { Component, OnInit, DoCheck } from "@angular/core";
import { PayIdService } from "src/app/shared/services/pay-id.service";
import { SymbolService } from "src/app/shared/services/symbol.service";
// import { PayIdService } from "src/app/shared/services/pay-id.service";

@Component({
  selector: "app-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"],
})
export class BalanceComponent implements OnInit {
  balance = null;
  //
  constructor(private payIdService: PayIdService, private symbolService: SymbolService) {}
  ngOnInit(): void {
    const userAddress = localStorage.getItem('symbolAddress');
    console.log("🚀 ~ file: balance.component.ts ~ line 17 ~ BalanceComponent ~ ngOnInit ~ userAddress", userAddress)
    this.symbolService
      .getBalance(userAddress)
  }
}
