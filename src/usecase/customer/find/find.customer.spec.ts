import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/costumer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/costumer/repository/sequelize/customer.repository";
import Customer from "../../../domain/costumer/entity/customer";
import Address from "../../../domain/costumer/value-object/address";

describe("Test Find Customer Usecase", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123",
        }       

        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zipcode 1",
                city: "City 1", 
            }                
        }

        const result = usecase.execute(input);
        
        expect(result).toBe(output);
    });

})