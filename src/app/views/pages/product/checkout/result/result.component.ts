import { Component, OnInit, ViewChild } from "@angular/core";
import * as jspdf from "jspdf";
import { Router } from "@angular/router";
const shortId = require("shortid");
import html2canvas from "html2canvas";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { SymbolService } from "src/app/shared/services/symbol.service";
import { QrService } from "src/app/shared/services/qr.service";
import { Product } from "../../../../../shared/models/product";
import { ProductService } from "../../../../../shared/services/product.service";
import { OrderService } from "src/app/shared/services/order.service";
import { Order } from "src/app/shared/models/order";
import { BillingService } from "src/app/shared/services/billing.service";
import { Billing } from "src/app/shared/models/billing";

declare var $: any;
@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  selectedFile: File;
  products: Product[];
  date: number;
  totalPrice = 0;
  tax = 2;
  confirmedHash = "";
  userPrivateKey = "";
  isPayment = false;
  hasPrivateKey = false;
  nameFile = "";
  orderNumber = "Order_" + shortId.generate();
  bill = {} as Billing;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private billingService: BillingService,
    private toastrService: ToastrService,
    private symbolService: SymbolService,
    private qrService: QrService,
    private router: Router
  ) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";

    this.products = productService.getLocalCartProducts();

    this.products.forEach((product) => {
      this.totalPrice += product.productPrice;
    });

    this.date = Date.now();
  }

  ngOnInit() {
    this.bill = this.billingService.getLocalBilling();
    console.log("this.bill :>> ", this.bill);
    this.symbolService.hasPrivateKey.subscribe((hasKey) => {
      this.hasPrivateKey = hasKey;
      if (this.hasPrivateKey) {
        this.toastrService.success(
          "Success",
          "The bill was signed by the private key, you can do payment now"
        );
      }
    });
  }

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("bill.pdf"); // Generated PDF
    });
  }

  payment(totalSum: number) {
    this.isPayment = true;
    this.symbolService.doPayment(totalSum, this.bill.$key).then((result) => {
      console.log(
        "🚀 ~ file: result.component.ts ~ line 82 ~ ResultComponent ~ .then ~ result",
        result
      );

      this.symbolService.confirmedHash.subscribe((hash) => {
        console.log(
          "🚀 ~ file: result.component.ts ~ line 85 ~ ResultComponent ~ .then ~ hash",
          hash
        );

        if (hash !== "") {
          this.products.map((prod) => (prod.$key = "qqwer"));
          console.log(
            "🚀 ~ file: result.component.ts ~ line 105 ~ ResultComponent ~ .then ~ this.products",
            this.products
          );
          const order = new Order();
          order.hashSymbolPayment = hash;
          order.billingId = this.bill.$key;
          order.orderId = this.orderNumber;
          // order.products = this.products;
          order.sumOrder = totalSum;
          order.statusPayment = "received";
          order.statusOrder = "Not sended";
          this.orderService.createOrder(order);
          console.log("this.products :>> ", this.products);
          this.isPayment = false;
          this.productService.clearBacket();
          this.billingService.clearBillFromLocalStorage();
          this.toastrService.success(`Success payment ${hash}`, hash);
          this.router.navigate(["/"]);
        }
      });
    });
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
    this.nameFile = this.selectedFile.name;
    this.qrService.readQrFile(this.selectedFile);
  }
}
