// Core Dependencies
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { ProductRoutes } from "./product.routing";

// Components
import { CheckoutModule } from "./checkout/checkout.module";

import { ProductComponent } from "./product.component";
import { BestProductComponent } from "./best-product/best-product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SharedModule } from "../../../shared/shared.module";
import { FavouriteProductsComponent } from "./favourite-products/favourite-products.component";
import { CartProductsComponent } from "./cart-products/cart-products.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";
import { PricesComponent } from "./prices/prices.component";
import { AddPricesComponent } from "./add-prices/add-prices.component";
import { UploaderComponent } from "../uploader/uploader.component";
import { DropzoneDirective } from "../../directives/dropzone.directive";
import { UploadTaskComponent } from "../upload-task/upload-task.component";
import { TableSortableDirective } from "../../directives/table-sortable.directive";
import { XprBalanceComponent } from "../user/xpr-balance/xpr-balance.component";
import { BalanceComponent } from "../user/balance/balance.component";
import { CountDownComponent } from "../user/count-down/count-down.component";
import { UserOrdersComponent } from "./user-orders/user-orders.component";
import { NftComponent } from "./nft/nft.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    SharedModule,
    CheckoutModule,
  ],
  declarations: [
    ProductComponent,
    BestProductComponent,
    ProductListComponent,
    AddProductComponent,
    ProductDetailComponent,
    FavouriteProductsComponent,
    CartProductsComponent,
    CartCalculatorComponent,
    PricesComponent,
    AddPricesComponent,
    UploaderComponent,
    DropzoneDirective,
    UploadTaskComponent,
    TableSortableDirective,
    UserOrdersComponent,
    NftComponent,
    //BalanceComponent,
  ],
  exports: [BestProductComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule {}
