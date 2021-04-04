import { IndexComponent } from "../../base/index/index.component";
import { CartProductsComponent } from "./cart-products/cart-products.component";
import { FavouriteProductsComponent } from "./favourite-products/favourite-products.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { Routes } from "@angular/router";

import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { PricesComponent } from "./prices/prices.component";
import { UserOrdersComponent } from "./user-orders/user-orders.component";
import { NftComponent } from "./nft/nft.component";

export const ProductRoutes: Routes = [
  {
    path: "products",
    children: [
      {
        path: "",
        component: IndexComponent,
      },
      {
        path: "all-products",
        component: ProductListComponent,
      },
      {
        path: "favourite-products",
        component: FavouriteProductsComponent,
      },
      {
        path: "cart-items",
        component: CartProductsComponent,
      },
      {
        path: "prices",
        component: PricesComponent,
      },
      {
        path: "user-orders",
        component: UserOrdersComponent,
      },
      {
        path: "nft",
        component: NftComponent,
      },
      {
        path: "checkouts",
        loadChildren: () =>
          import("./checkout/checkout.module").then((m) => m.CheckoutModule),
      },
      {
        path: "product/:id",
        component: ProductDetailComponent,
      },
    ],
  },
];
