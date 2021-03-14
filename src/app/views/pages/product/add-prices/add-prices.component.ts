import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "src/app/shared/services/translate.service";

@Component({
  selector: "app-add-prices",
  templateUrl: "./add-prices.component.html",
  styleUrls: ["./add-prices.component.scss"],
})
export class AddPricesComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  // addPrices(productForm: NgForm) {
  //   productForm.value["productId"] = "PROD_" + shortId.generate();
  //   productForm.value["productAdded"] = moment().unix();
  //   productForm.value["ratings"] = Math.floor(Math.random() * 5 + 1);
  //   if (productForm.value["productImageUrl"] === undefined) {
  //     productForm.value["productImageUrl"] =
  //       "http://via.placeholder.com/640x360/007bff/ffffff";
  //   }

  //   productForm.value["favourite"] = false;

  //   const date = productForm.value["productAdded"];

  //   // this.productService.createProduct(productForm.value);

  //   this.product = new Product();

  //   $("#priceModalLong").modal("hide");

  //   toastr.success(
  //     "product " + productForm.value["productName"] + "is added successfully",
  //     "Product Creation"
  //   );
  // }
}
