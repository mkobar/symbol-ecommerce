import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from "@angular/fire/database";
import { Billing } from "./../models/billing";
import { Injectable } from "@angular/core";
import { ToastrService } from "./toastr.service";

@Injectable({
  providedIn: "root",
})
export class BillingService {
  billings: AngularFireList<Billing>;
  billing: AngularFireObject<Billing>;
  constructor(
    private db: AngularFireDatabase,
    private toastrService: ToastrService
  ) {
    this.getBillings();
  }

  createBillings(data: Billing) {
    console.log(
      "🚀 ~ file: billing.service.ts ~ line 20 ~ BillingService ~ createBillings ~ data",
      data
    );
    this.billings.push(data).then((id) => {
      console.log("id :>> ", id["path"]);
      data.$key = id["path"]["pieces_"][1];
      console.log(
        "🚀 ~ file: billing.service.ts ~ line 26 ~ BillingService ~ createBillings ~ data",
        data
      );
      this.addBillToLocalStorage(data);
    });
  }

  getBillings() {
    this.billings = this.db.list("billings");
    return this.billings;
  }

  getBillingById(key: string) {
    this.billing = this.db.object("products/" + key);
    return this.billing;
  }

  updateBilling(data: Billing) {
    this.billings.update(data.$key, data);
  }

  deleteBilling(key: string) {
    this.billings.remove(key);
  }
  addBillToLocalStorage(data: Billing): void {
    // const a: Billing[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    // a.push(data);

    this.toastrService.wait("Added Billing", "Added Billing for payment");
    setTimeout(() => {
      localStorage.setItem("avct_bill", JSON.stringify(data));
    }, 500);
  }

  clearBillFromLocalStorage() {
    localStorage.setItem("avct_bill", "");
  }

  //
  getLocalBilling(): Billing {
    const bill: Billing = JSON.parse(localStorage.getItem("avct_bill")) || "";

    return bill;
  }
}
