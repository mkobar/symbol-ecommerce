import { TranslateService } from "src/app/shared/services/translate.service";
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import { ProductService } from "src/app/shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { OrderService } from "src/app/shared/services/order.service";
import { Order } from "src/app/shared/models/order";
import { NgbdSortableHeader } from "src/app/shared/models/ngbd-sortable-table";
import { AuthService } from "src/app/shared/services/auth.service";
import { SymbolService } from "src/app/shared/services/symbol.service";

@Component({
  selector: "app-user-orders",
  templateUrl: "./user-orders.component.html",
  styleUrls: ["./user-orders.component.scss"],
})
export class UserOrdersComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  headerNames: string[] = [];

  orders: Order[] = [];
  options: any;
  messageFromTransaction = "";
  loading = false;
  constructor(
    private orderService: OrderService,
    private symbolService: SymbolService,
    private toasterService: ToastrService,
    public translate: TranslateService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        0: { items: 1, margin: 5 },
        430: { items: 2, margin: 5 },
        550: { items: 3, margin: 5 },
        670: { items: 4, margin: 5 },
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true,
    };
    this.getAllOrders();
    this.symbolService.messageFromTransaction.subscribe((message) => {
      this.messageFromTransaction = message;
      if (this.messageFromTransaction !== "") {
        this.toasterService.info(
          "Message from transaction",
          this.messageFromTransaction
        );
      }
    });
  }

  checkTransaction(tx) {
    const message = this.symbolService.getTransaction(tx);
    console.log(
      "🚀 ~ file: user-orders.component.ts ~ line 52 ~ UserOrdersComponent ~ checkTransaction ~ message",
      message
    );
  }

  getAllOrders() {
    this.loading = true;
    const x = this.orderService.getOrders("orders");
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.orders = [];

        const length = product.length;
        for (let i = 0; i < length; i++) {
          const y = product[i].payload.toJSON();
          y["$key"] = product[i].key;
          this.orders.push(y as Order);
        }
        this.headerNames = Object.keys(this.orders[0]).filter(
          (w) => w !== "$key"
        );
        console.log(
          "🚀 ~ file: user-orders.component.ts ~ line 52 ~ UserOrdersComponent ~ getAllOrders ~ this.orders",
          this.orders
        );
        // product.forEach(element => {
        //   const y = element.payload.toJSON();
        //   y["$key"] = element.key;
        //   this.bestProducts.push(y as Product);
        // });
      },
      (error) => {
        this.toasterService.error("Error while fetching Products", error);
      }
    );
  }
}
