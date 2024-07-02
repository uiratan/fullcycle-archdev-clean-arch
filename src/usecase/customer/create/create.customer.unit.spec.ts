import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "Customer 1",
  address: {
    street: "Street 1",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe("Unit Test Create Customer Usecase", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRespository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });

  });

  it("should thrown error when name is missing", async () => {
    const customerRepository = MockRespository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");   

  });

  it("should thrown error when street is missing", async () => {
    const customerRepository = MockRespository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(usecase.execute(input)).rejects.toThrow("Street is required");   

  });

});




