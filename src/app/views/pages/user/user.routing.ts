import { UserComponent } from "./user.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/shared/services/auth_gaurd";
import { CartProductsComponent } from "../product/cart-products/cart-products.component";
import { UserOrdersComponent } from "../product/user-orders/user-orders.component";

export const UserRoutes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: UserAccountComponent,
        outlet: "profileOutlet",
      },
      {
        path: "cart-items",
        component: CartProductsComponent,
        outlet: "profileOutlet",
      },
    ],
  },
];
