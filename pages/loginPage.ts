import { Page, Locator, expect } from "@playwright/test";

export class LoginPage{

    page: Page; // объявили свойство page 
    loginField: Locator; // объявили свойство cookieAcceptButton 
    passField: Locator; // объявили свойство cookieAcceptButton
    loginButton: Locator; // объявили свойство cookieAcceptButton
    mainElement: Locator; // объявили свойство searchField     

    constructor(page){
        this.page = page;
        this.loginField = page.locator('//input[@name="login"]');
        this.passField = page.locator('//input[@name="pass"]');
        this.loginButton = page.locator('//button[@type="button"]');
        this.mainElement = page.locator('[id="root"]');
    }
    async openPage(){
        await this.page.goto("https://dev.topklik.online", {timeout: 50000, waitUntil: 'load'});
 //       await this.cartButton.click(), {timeout: 50000, waitUntil: 'load'};
    }

    async logIn(login, password){
        await this.loginField.fill(login);
        await this.passField.fill(password);
        await this.loginButton.click();
        await expect(this.mainElement).toBeVisible({ timeout: 5000 });
  }
}
