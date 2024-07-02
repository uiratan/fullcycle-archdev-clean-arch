import Customer from "../../../domain/costumer/entity/customer";
import Address from "../../../domain/costumer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 123, "Zip", "City");
customer.changeAddress(address);

const MockRespository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test Find Customer Usecase", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRespository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zip",
                city: "City",
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

})