import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                city: req.body.address.city,
                number: req.body.address.number,
                street: req.body.address.street,
                zip: req.body.address.zip
            }
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});