import ProductRepository from "./contracts/product.interface";

export default class ProductController {
  constructor(private readonly repository: ProductRepository) { }

  getAll() {
    return this.repository.findAll();
  }

  store(name: string, price: number) {
    return this.repository.save(name, price);
  }
}
