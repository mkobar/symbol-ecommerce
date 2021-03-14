import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Price } from "../models/price";

@Injectable()
export class PriceService {
  prices: AngularFireList<Price>;
  price: AngularFireObject<Price>;

  constructor(private db: AngularFireDatabase) {
    this.getPrices("prices");
  }

  getPrices(catalogName: string) {
    this.prices = this.db.list(catalogName);
    return this.prices;
  }

  createPrice(prices: Price) {
    this.prices.push(prices);
  }

  getPriceById(key: string, catalogName: string) {
    this.price = this.db.object(`${catalogName}/` + key);
    return this.price;
  }

  updatePrice(data: Price) {
    this.prices.update(data.$key, data);
  }

  deletePrice(key: string) {
    this.prices.remove(key);
  }
}
