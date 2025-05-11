import Product from "../product/product";
import { CartProtocol } from "./contracts/cart.protocol";

export default class Cart implements CartProtocol {
  private readonly _items: Product[] = [];

  addItem(item: Product): void {
    this._items.push(item);
  }

  removeItem(item: Product): void {
    const index: number = this._items.indexOf(item);
    this._items.splice(index, 1);
  }

  get items(): readonly Product[] {
    return this._items;
  }

  total(): number {
    let total = 0;
    this._items.map(item => {
      total += item.price;
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
