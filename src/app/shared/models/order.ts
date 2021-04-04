import { Product } from "./product";

export class Order {
  $key: string;
  billingId: string;
  orderId: string;
  hashSymbolPayment: string;
  // products: Product[];
  sumOrder: number;
  statusOrder: string;
  statusPayment: string;
}
