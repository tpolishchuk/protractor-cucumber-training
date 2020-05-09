import { BasePage } from "../base.page"
import { ElementFinder, element, by, ElementArrayFinder, browser, ProtractorBy } from "protractor"
import { Customer } from "../../models/customer"
import { Locator } from "protractor/built/locators"

export class CustomersListPage extends BasePage {

    readonly partialUrl = "/manager/list"

    private customerSearchInput: ElementFinder = element(by.model("searchCustomer"))
    private searchResults: ElementArrayFinder = element.all(by.repeater("cust in Customers"))

    private firstNameCellLocator: Locator = by.css("td:nth-child(1)")
    private lastNameCellLocator: Locator = by.css("td:nth-child(2)")
    private postCodeCellLocator: Locator = by.css("td:nth-child(3)")
    private accountNumberCellLocator: Locator = by.css("td:nth-child(4)")

    protected getPartialUrl(): string {
        return this.partialUrl
    }

    public async searchForCustomer(searchQuery: string): Promise<void> {
        await this.customerSearchInput.sendKeys(searchQuery)
    }

    public async getSearchResults(): Promise<Customer[]> {
        let customers: Customer[] = new Array();

        await this.searchResults.each(async (rowRoot) => {
            if (rowRoot == undefined) {
                throw Error("Row root is undefined. Cannot get search results")
            }

            let customer: Customer = new Customer()

            await rowRoot.element(this.firstNameCellLocator).getText().then(function (text) {
                customer.firstName = text
            })

            await rowRoot.element(this.lastNameCellLocator).getText().then(function (text) {
                customer.lastName = text
            })

            await rowRoot.element(this.postCodeCellLocator).getText().then(function (text) {
                customer.postCode = text
            })

            await rowRoot.element(this.accountNumberCellLocator).getText().then(function (text) {
                customer.accountNumber = text
            })

            customers.push(customer)
        })

        return customers;
    }
}
