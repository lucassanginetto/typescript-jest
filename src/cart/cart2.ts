import Product from "../product/product";
import { CartProtocol2 } from "./contracts/cart.protocol";

type CartItem = {
  product: Product,
  quantity: number
}

export default class Cart2 implements CartProtocol2<CartItem> {
  private readonly _items: CartItem[] = [];

  addItem(product: Product): void {
    const index = this._items.findIndex((item) => {
      return product === item.product;
    });

    if (index !== -1) {
      const quantity = this._items[index].quantity + 1;
      this._items[index] = {
        product: product,
        quantity: quantity
      };
      return;
    }

    this._items.push({
      product: product,
      quantity: 1
    });
  }

  removeItem(product: Product): void {
    this._items.map((item, index) => {
      if (product === item.product) {
        this._items.splice(index, 1);
      }
    });
  }

  get items(): readonly CartItem[] {
    return this._items;
  }

  total(): number {
    let total = 0;
    this._items.map(item => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    this._items.length = 0;
  }
}
