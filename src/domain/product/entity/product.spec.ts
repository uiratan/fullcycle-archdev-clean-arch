import Product from "./product";


describe("Product unit tests", () => {
       
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrow("product: Id is required");      
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 100);
        }).toThrow("product: Name is required");
    });

    it("should throw error when id and name are empty", () => {
		expect(() => {
			new Product("", "", 100);
		}).toThrow("product: Id is required,product: Name is required");
	});


    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("1", "Product 1", -1);
        }).toThrow("product: Price must be greater than 0");
    });

    it("should change name", () => {
        // Arrange
        const product = new Product("1", "Product 1", 100);
        // Act
        product.changeName("Product 2");
        // Assert
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        // Arrange
        const product = new Product("1", "Product 1", 100);
        // Act
        product.changePrice(200);
        // Assert
        expect(product.price).toBe(200);
    });

});