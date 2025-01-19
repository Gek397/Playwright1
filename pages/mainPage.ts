import { Page, Locator, expect } from "@playwright/test";

export class MainPage{

    page: Page; // объявили свойство page
    hideTopButton: Locator; // объявили свойство
    tableTop: Locator; // объявили свойство
    typeU: Locator; // объявили свойство перевлючателя П-образной
    UtypeTop: Locator; // объявили свойство картинки П-образной
    thickness: Locator; // объявили свойство
    thicknessSelect: Locator; // объявили свойство
    thicknessSelected: Locator; // объявили свойство
    plinthButton: Locator; // объявили свойство
    plinthLeft: Locator; // объявили свойство
    plinthRight: Locator; // объявили свойство
    islandButton: Locator; // объявили свойство
    island: Locator; // объявили свойство
    grooveButton: Locator; // объявили свойство
    groove: Locator; // объявили свойство
    color: Locator; // объявили свойство
    colorSelected: Locator; // объявили свойство
    calcButton: Locator; // объявили свойство
    reportButton: Locator; // объявили свойство

    constructor(page){
        this.page = page;
        this.hideTopButton = page.locator('[data-testid="hide-countertop"]');
        this.tableTop = page.locator('img[src="/static/media/countertop-q.41258f0aa91cd0c9fa4e.png"]');
    //  this.tableTop = page.locator('img.style_ctopImg__vjPZm'); // По стилю
        this.typeU = page.locator('[data-testid="countertop-type-u"]');
        this.UtypeTop = page.locator('img[src="/static/media/countertop-p.095c44faedc9795e1fcf.png"]');
        this.thickness = page.locator('div[data-testid="select-thickness"] button').first();
        this.thicknessSelect = page.locator('button.styles_options__1Rp-f', { hasText: '4' });
        this.thicknessSelected = page.locator('div.inputDigital.styles_number__sbmEC').first();
        this.plinthButton = page.locator('[data-testid="top-button"]').nth(2);
        this.plinthLeft = page.locator('div.line.c-U-outerLeft.plinth');
        this.plinthRight = page.locator('div.line.c-U-outerRight.plinth');
        this.islandButton = page.locator('[data-testid="product-item"]').first();
        this.island = page.locator('[data-testid="island"]');
        this.grooveButton = page.locator('[data-testid="options-item"]').nth(2);
        this.groove = page.locator('li >> text="Проточки для стока воды"');
        this.color = page.locator('[data-testid="stone-block"] >> text="N-103 Gray Onix"');
        this.colorSelected = page.locator('li >> text=/N-103 Gray Onix/');
        this.calcButton = page.locator('[data-testid="calc-button"]');
        this.reportButton = page.locator('[data-testid="open-report-button"]');  
    }
    
    async hideTop(){
        await expect(this.tableTop).toBeVisible({ timeout: 5000 });
        await this.hideTopButton.click();
        await expect(this.tableTop).toBeHidden();
    }

    async showUtypeTop(){
        await expect(this.UtypeTop).toBeHidden();
        await this.typeU.click();
        await expect(this.UtypeTop).toBeVisible({ timeout: 5000 });
    }

    async thickSelect(thick){
        await this.thickness.waitFor({ state: 'visible' });  // Ждем, пока кнопка станет видимой
        const thickContent = await this.thickness.textContent();

            // Выполните действия в зависимости от текста
            if (thickContent != thick) {
            // Действия, если текст равен "thick"
            console.log('Неверная толщина, меняем на ' + thick);
            await this.thickness.click();
            await expect(this.thicknessSelect).toBeVisible();
            await this.thicknessSelect.click();
            await expect(this.thicknessSelected).toHaveText('4');
            // Ваш код для первых действий
            } else if (thickContent === thick) {
            // Действия, если текст равен "4"
            console.log('Толщина' + thick);
            // Ваш код для вторых действий
            } else {
            console.log('Невозможно выбрать толщину ' + thick);
            }
    }

    async plinthSwitch(){
        await expect(this.plinthButton).toBeVisible({ timeout: 5000 });
        await expect(this.plinthLeft).toBeVisible({ timeout: 5000 });
        await expect(this.plinthRight).toBeVisible({ timeout: 5000 });
        await this.plinthButton.click();
        await expect(this.plinthLeft).toBeHidden();
        await expect(this.plinthRight).toBeHidden();
    }

    async islandSwitch(){
        await expect(this.island).toBeHidden();
        await this.islandButton.click();
        await expect(this.island).toBeVisible({ timeout: 5000 });
    } 

    async grooveSwitch(){
        await expect(this.groove).toBeHidden();
        await this.grooveButton.click();
        await expect(this.groove).toBeVisible({ timeout: 5000 });
    }  
    
    async colorSwitch(){
        await expect(this.color).toBeVisible();
        await this.color.click();
        await expect(this.colorSelected).toBeVisible({ timeout: 5000 });
    }

    async report() {
        await expect(this.calcButton).toBeVisible();
        await this.calcButton.click();
        await expect(this.reportButton).toBeVisible({ timeout: 30000 });
        await this.reportButton.click();
    }
}
