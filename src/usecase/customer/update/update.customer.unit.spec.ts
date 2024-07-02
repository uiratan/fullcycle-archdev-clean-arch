import CustomerFactory from "../../../domain/costumer/factory/customer.factory";
import Address from "../../../domain/costumer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Customer 1", 
  new Address("Street 1", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "Customer 1 Updated",
  address: {
    street: "Street 1 Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

const MockRespository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test Update Customer Usecase", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRespository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);

  });

  it("should thrown error when name is missing", async () => {
    const customerRepository = MockRespository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");   

  });

});




