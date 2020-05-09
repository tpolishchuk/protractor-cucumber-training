import { Before } from "cucumber"
import { LoginPage } from "../../pages/login.page"
import { ManagerActionsMainPage } from "../../pages/manager/manager.page"
import PropertiesReader from "properties-reader"
import { AddCustomerPage } from "../../pages/manager/add.customer.page"

import chai from "chai";
import { CustomerWorld } from "../world/customer.world"
import { OpenAccountPage } from "../../pages/manager/open.account.page"
import { CustomerBuilder } from "../../builders/customer.builder"
import { Customer } from "../../models/customer"

const expect = chai.expect

Before({ tags: "@reqiures-registered-customer-with-account" }, async () => {

    CustomerWorld.customer = new CustomerBuilder().setDefaultFirstName()
                                                  .setDefaultLastName()
                                                  .setDefaultPostCode()
                                                  .build();

    await logInAsManager()
    await addCustomer(CustomerWorld.customer)
    await addCustomerBankAccount(CustomerWorld.customer)
})

export async function logInAsManager(): Promise<void> {

    let loginPage = new LoginPage()
    await loginPage.open()
    await loginPage.loginAsManager()
}

export async function addCustomer(customer: Customer): Promise<void> {
    let managerPage = new ManagerActionsMainPage()
    await managerPage.openAddCustomerPage()

    let addCustomerPage = new AddCustomerPage()
    await addCustomerPage.addCustomer(customer)

    await addCustomerPage.getAlertText().then(async (text) => {
        let expectedAlertPattern = new RegExp('Customer added successfully with customer id :(\\d+)', 'g')
        expect(text).to.match(expectedAlertPattern);
    })

    await addCustomerPage.acceptAlert()
}

export async function addCustomerBankAccount(customer: Customer): Promise<void> {
    let managerPage = new ManagerActionsMainPage()
    await managerPage.openOpenAccountPage()

    let openAccountPage = new OpenAccountPage()
    await openAccountPage.selectCustomer(customer)

    const projectPropsPath: string = 'resources/project.properties'
    let currency = PropertiesReader(projectPropsPath).get('accountCurrency')

    await openAccountPage.selectCurrency(String(currency))
    await openAccountPage.submitSelection()

    await openAccountPage.getAlertText().then(async (text) => {
        let expectedAlertPattern = new RegExp('Account created successfully with account Number :(\\d+)', 'g')
        expect(text).to.match(expectedAlertPattern);

        let accountNumber: string = text.replace(/\D/g, "")

        customer.currency = String(currency)
        customer.accountNumber = accountNumber
    })

    await openAccountPage.acceptAlert()
}
