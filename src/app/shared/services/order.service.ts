import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Observable } from "rxjs";
import { Order } from "../models/order";
import "rxjs/add/operator/map";

@Injectable()
export class OrderService {
  orders: AngularFireList<Order>;
  order: AngularFireObject<Order>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.getOrders("orders");
    // this.items = this.orders.snapshotChanges().map(changes => {
    //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })      );
    //   });
  }

  getOrders(catalogName: string) {
    this.orders = this.db.list(catalogName);
    return this.orders;
  }

  createOrder(order: Order) {
    // order.$key = "lsadfj";
    this.orders.push(order);
  }

  getOrderById(key: string) {
    this.order = this.db.object(`orders/` + key);
    return this.order;
  }

  updateOrder(key: string, data: Order) {
    this.orders.update(key, data);
  }

  deleteOrder(key: string) {
    this.orders.remove(key);
  }
}
