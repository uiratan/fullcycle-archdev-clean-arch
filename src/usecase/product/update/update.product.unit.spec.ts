import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createProduct("Product 1", 10);

const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 20,
};

const MockRespository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};


describe("Unit Test Update Product Usecase", () => {
    it("should update a product", async () => {
        const productRepository = MockRespository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);
        expect(output).toEqual(input);
    });
});