import Product from "../product/product";
import Cart2 from "./cart2";

const makeCart = (): Cart2 => {
  return new Cart2;
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

  it('Should have two items even after adding first product twice', () => {
    const { sut } = makeSut();
    const product1 = makeProduct('Product 1', 10);
    const product2 = makeProduct('Product 2', 10);
    sut.addItem(product1);
    sut.addItem(product2);
    expect(sut.items.length).toBe(2);
    sut.addItem(product1);
    expect(sut.items.length).toBe(2);
    expect(sut.items[0].product).toBe(product1);
    expect(sut.items[1].product).toBe(product2);
  });

  it('Should have one item if two were added and one was removed', () => {
    const { sut } = makeSut();
    const product1 = makeProduct('Product 1', 10);
    sut.addItem(product1);
    sut.addItem(makeProduct('Product 2', 10));
    sut.removeItem(product1);
    expect(sut.items.length).toBe(1);
  });

  it('Should have one item if two were added and one was removed (2)', () => {
    const { sut } = makeSut();
    const product1 = makeProduct('Product 1', 10);
    sut.addItem(product1);
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
    sut.addItem(product2);
    sut.addItem(product2);
    sut.addItem(product2);
    expect(sut.items.length).toBe(2);
    sut.removeItem(product1);
    sut.removeItem(product2);
    expect(sut.isEmpty()).toBeTruthy();
  });

  it('Should have a total of 80 with two products', () => {
    const { sut } = makeSut();
    const prod1 = makeProduct('Product 1', 20);
    const prod2 = makeProduct('Product 2', 10);
    sut.addItem(prod1);
    sut.addItem(prod1);
    sut.addItem(prod1);
    sut.addItem(prod2);
    sut.addItem(prod2);
    expect(sut.total()).toBe(80);
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
