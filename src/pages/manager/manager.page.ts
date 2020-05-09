import { BasePage } from "../base.page"
import { ElementFinder, element, by } from "protractor"

export class ManagerActionsMainPage extends BasePage {

    readonly partialUrl = "/manager"

    private addCustomerButton: ElementFinder = element(by.css("[ng-click='addCust()']"))
    private openAccountButton: ElementFinder = element(by.css("[ng-click='openAccount()']"))
    private showCustomersButton: ElementFinder = element(by.css("[ng-click='showCust()']"))

    protected getPartialUrl(): string {
        return this.partialUrl
    }

    public async openAddCustomerPage(): Promise<void> {
        await this.addCustomerButton.click()
    }

    public async openOpenAccountPage(): Promise<void> {
        await this.openAccountButton.click()
    }

    public async openCustomersListPage(): Promise<void> {
        await this.showCustomersButton.click()
    }
}
