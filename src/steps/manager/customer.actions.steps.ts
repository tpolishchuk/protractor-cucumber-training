import { Given, When, Then } from "cucumber";
import { ManagerActionsMainPage } from "../../pages/manager/manager.page";
import { CustomersListPage } from "../../pages/manager/customers.list.page";
import { CustomerWorld } from "../world/customer.world";
import { Customer } from "../../models/customer";
import chai from "chai";

const expect = chai.expect
let customersListPage: CustomersListPage

Given('manager opens customers list', async () => {
    let managerPage = new ManagerActionsMainPage()
    await managerPage.openCustomersListPage()

    customersListPage = new CustomersListPage()
    await customersListPage.verify()
})

When('manager types a last name of registered customer into a search input', async () => {
    await customersListPage.searchForCustomer(CustomerWorld.customer.lastName)
})

Then('search should return recently created user with correct account number', async () => {
    await customersListPage.getSearchResults().then(customers => {
        expect(customers.length).to.equal(1);

        let customer: Customer = customers[0]
        expect(customer.firstName).to.equal(CustomerWorld.customer.firstName);
        expect(customer.lastName).to.equal(CustomerWorld.customer.lastName);
        expect(customer.postCode).to.equal(CustomerWorld.customer.postCode);
        expect(customer.accountNumber).to.equal(CustomerWorld.customer.accountNumber);
    })
})
