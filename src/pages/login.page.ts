import { ElementFinder, element, by, browser } from "protractor";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {

    readonly partialUrl: string = "/login"

    private managerLoginButton: ElementFinder = element(by.css("[ng-click='manager()']"))

    protected getPartialUrl(): string {
        return this.partialUrl
    }

    public async loginAsManager(): Promise<void> {
        await this.managerLoginButton.click()
    }
}   
