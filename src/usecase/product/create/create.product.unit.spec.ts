import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 10,
};

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe("Unit Test Create Product Usecase", () => {
  it("should create a product", async () => {
    const productRepository = MockRespository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });

  });

  it("should thrown error when name is missing", async () => {
    const productRepository = MockRespository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");   

  });

  it("should thrown error when price is missing", async () => {
    const productRepository = MockRespository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "Product 1";
    input.price = -1;

    await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than 0");   

  });

});




