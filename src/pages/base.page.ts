import { browser, ProtractorExpectedConditions } from "protractor"
import PropertiesReader from "properties-reader"
import { protractor } from "protractor/built/ptor"

export abstract class BasePage {

    readonly projectPropsPath: string = 'resources/project.properties'

    protected ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

    protected abstract getPartialUrl(): string

    private getBaseUrl(): string {
        let baseUrl = PropertiesReader(this.projectPropsPath).get('baseUrl')

        if (baseUrl) {
            return String(baseUrl)
        }

        throw new Error('Unable to get base URL property from ' + this.projectPropsPath)
    }

    public async open(): Promise<void> {
        await browser.get(this.getBaseUrl() + this.getPartialUrl)
    }

    public async verify(): Promise<void> {
        await browser.getCurrentUrl().then((currentUrl) => {
            if (!currentUrl.endsWith(this.getPartialUrl())) {
                throw Error('Current URL ' + currentUrl + ' does not end with ' + this.getPartialUrl());
            }
        })
    }

    public async getAlertText(): Promise<string> {
        await browser.wait(this.ec.alertIsPresent());
        return await browser.switchTo().alert().getText()
    }

    public async acceptAlert(): Promise<void> {
        await browser.wait(this.ec.alertIsPresent());
        await browser.switchTo().alert().accept()
        await browser.wait(this.ec.not(this.ec.alertIsPresent()));
    }
}
