import Product from "../product/product";
import Cart from "./cart";

const makeCart = (): Cart => {
  return new Cart;
}

const makeProduct = (name: string, price: number): Product => {
  return new Product(name, price);
}

const makeSut = () => {
  const sut = makeCart();

  return {
    sut
  };
}

describe('Cart', () => {
  it('Should have no items in the cart', () => {
    const { sut } = makeSut();
    expect(sut.items.length).toBe(0);
  });

  it('Should have one item in the cart', () => {
    const { sut } = makeSut();
    expect(sut.items.length).toBe(0);
    sut.addItem(makeProduct('Product 1', 10));
    expect(sut.items.length).toBe(1);
  });

  it('Should have two items in the cart', () => {
    const { sut } = makeSut();
    sut.addItem(makeProduct('Product 1', 10));
    sut.addItem(makeProduct('Product 2', 10));
    expect(sut.items.length).toBe(2);
  });

  it('Should have one item if two were added and one was removed', () => {
    const { sut } = makeSut();
    const product1 = makeProduct('Product 1', 10);
    sut.addItem(product1);
    sut.addItem(makeProduct('Product 2', 10));
    sut.removeItem(product1);
    expect(sut.items.length).toBe(1);
  });

  it('Should have no items if two were added and two were removed', () => {
    const { sut } = makeSut();
    const product1 = makeProduct('Product 1', 10);
    const product2 = makeProduct('Product 2', 10);
    sut.addItem(product1);
    sut.addItem(product2);
    sut.removeItem(product1);
    sut.removeItem(product2);
    expect(sut.isEmpty()).toBeTruthy();
  });

  it('Should have a total of 20 with two 10 price products', () => {
    const { sut } = makeSut();
    sut.addItem(makeProduct('Product 1', 10));
    sut.addItem(makeProduct('Product 2', 10));
    expect(sut.total()).toBe(20);
  });

  it('Should have a total of 0 with no products', () => {
    const { sut } = makeSut();
    expect(sut.total()).toBe(0);
  });

  it('Should clear cart', () => {
    const { sut } = makeSut();
    sut.addItem(makeProduct('Product 1', 10));
    sut.addItem(makeProduct('Product 2', 10));
    sut.clear();
    expect(sut.isEmpty()).toBeTruthy();
  });
});
