import { BasePage } from "../base.page";
import { element, by, browser, ElementFinder } from "protractor";
import { Customer } from "../../models/customer";

export class OpenAccountPage extends BasePage {

    readonly partialUrl = "/manager/openAccount"

    private processButton: ElementFinder = element(by.css("[ng-submit='process()'] [type='submit']"))

    protected getPartialUrl(): string {
        return this.partialUrl
    }

    public async selectCustomer(customer: Customer): Promise<void> {
        await this.waitForCustomerAppearance(customer)

        let customerOption = element(by.cssContainingText('option', customer.getFullName()))
        await customerOption.click()
    }

    public async selectCurrency(currency: string): Promise<void> {
        let currencyOption = element(by.cssContainingText('option', currency))
        await currencyOption.click()
    }

    public async submitSelection(): Promise<void> {
        await this.processButton.click()
    }

    private async waitForCustomerAppearance(customer: Customer): Promise<void> {
        const loopIntervalMs = 1000
        const maxAttempts: number = 10
        let attempt: number = 0

        while (attempt < maxAttempts) {
            let customerOption = element(by.cssContainingText('option', customer.getFullName()))

            if (await customerOption.isPresent()) {
                return
            }

            await browser.refresh()
            await browser.sleep(loopIntervalMs)

            attempt++
        }
    }
}
