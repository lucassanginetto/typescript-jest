import ProductRepository from "./contracts/product.interface";
// import Product from "./product";
import ProductController from "./product.controller";

const makeSut = () => {
  /*
  class ProductRepositorySQL implements ProductRepository {
    findAll(): Product[] {
      return [];
    }
    save(name: string, price: number): Product {
      throw new Error('Not implemented');
    }
  }
  */
  // new ProductRepositorySQL

  const mockRepository: jest.Mocked<ProductRepository> = {
    findAll: jest.fn(),
    save: jest.fn()
  }

  const sut = new ProductController(mockRepository);

  return {
    sut,
    mockRepository
  }
}

describe('ProductController', () => {
  it('Should return all products', () => {
    const { sut, mockRepository } = makeSut();
    sut.getAll();
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('Should save product', () => {
    const { sut, mockRepository } = makeSut();
    const name = 'Product 1';
    const price = 12;
    sut.store(name, price);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledWith(name, price);
  });
});
