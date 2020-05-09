import { BasePage } from "../base.page"
import { ElementFinder, element, by } from "protractor"
import { Customer } from "../../models/customer"

export class AddCustomerPage extends BasePage {

    readonly partialUrl = "/manager/addCust"

    private firstNameInput: ElementFinder = element(by.model("fName"))
    private lastNameInput: ElementFinder = element(by.model("lName"))
    private postCodeInput: ElementFinder = element(by.model("postCd"))
    private addCustomerButton: ElementFinder = element(by.css("[ng-submit='addCustomer()'] [type='submit']"))

    protected getPartialUrl(): string {
        return this.partialUrl
    }

    public async addCustomer(customer: Customer): Promise<void> {
        await this.firstNameInput.sendKeys(customer.firstName)
        await this.lastNameInput.sendKeys(customer.lastName)
        await this.postCodeInput.sendKeys(customer.postCode)
        await this.addCustomerButton.click()
    }
}
