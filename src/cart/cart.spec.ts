import Product from "../product/product";
import Cart from "./cart";

describe('Cart', () => {
  it.only('Should have no items in the cart', () => {
    const cart = new Cart;
    expect(cart.items.length).toBe(0);
  });

  it('Should have one item in the cart', () => {
    const cart = new Cart;
    const product1 = new Product('Product 1', 10);
    cart.addItem(product1);
  });
});
