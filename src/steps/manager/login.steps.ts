import { Given } from "cucumber"

import { LoginPage } from "../../pages/login.page";
import { ManagerActionsMainPage } from "../../pages/manager/manager.page";

Given('manager logs in', async () => {
    let loginPage = new LoginPage()
    await loginPage.open()
    await loginPage.loginAsManager()

    let managerPage = new ManagerActionsMainPage()
    managerPage.verify()
})
