import { Product } from "../../../../shared/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { SymbolService } from "src/app/shared/services/symbol.service";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  mosaicId = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private symbolService: SymbolService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
    this.symbolService.mosaicId.subscribe((id) => {
      this.mosaicId = id;
    });
  }

  getProductDetail(id: string) {
    // this.spinnerService.show();
    const x = this.productService.getProductById(id);
    x.snapshotChanges().subscribe(
      (product) => {
        // this.spinnerService.hide();
        const y = product.payload.toJSON() as Product;

        y.$key = id;
        this.product = y;
        this.checkTransaction(this.product.bits[0].hash);
        console.log(
          "🚀 ~ file: product-detail.component.ts ~ line 40 ~ ProductDetailComponent ~ getProductDetail ~ his.product",
          this.product
        );
      },
      (error) => {
        this.toastrService.error("Error while fetching Product Detail", error);
      }
    );
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkTransaction(tx) {
    const message = this.symbolService.getTransaction(tx);
    if (this.mosaicId !== 0) {
      this.toastrService.success("Mosaic Id", this.mosaicId);
    }
  }
}
