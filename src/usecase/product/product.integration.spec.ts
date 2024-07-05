import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../domain/product/factory/product.factory";
import FindProductUseCase from "./find/find.product.usecase";
import UpdateProductUseCase from "./update/update.product.usecase";
import ListProductUseCase from "./list/list.product.usecase";
import CreateProductUseCase from "./create/create.product.usecase";

describe("Test integrations of product usecases", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            price: 10,
        };
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });


    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        const product = ProductFactory.createProduct("Product A", 10);
        await productRepository.create(product);

        const input = {
            id: product.id,
        };

        const output = {
            id: product.id,
            name: "Product A",
            price: 10
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = ProductFactory.createProduct("Product A", 10);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product AB",
            price: 20,
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);
        const product1 = ProductFactory.createProduct("Product A", 10);
        const product2 = ProductFactory.createProduct("Product B", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });

});