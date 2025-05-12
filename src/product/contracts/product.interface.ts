import Product from "../product";

export default interface ProductRepository {
  findAll(): Product[];
  save(name: string, price: number): Product;
}
