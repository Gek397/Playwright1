import { expect, Page, Locator} from "@playwright/test";

export class ReportPage{
    page: Page; // объявили свойство page 
    material: Locator; // объявили свойство
    type: Locator; // объявили свойство
    groove: Locator; // объявили свойство
    materialCell: Locator; // объявили свойство
    typeCell: Locator; // объявили свойство
    optionsCell: Locator; // объявили свойство
    grooveCell: Locator; // объявили свойство
    amountCell: Locator; // объявили свойство
    amount: Locator; // объявили свойство

    constructor(page){
        this.page = page;
        this.materialCell = page.locator('table.table-bordered tr >> text="Материал"');
        this.material = this.materialCell.locator('.. >> td.col-2').nth(0);
        this.typeCell = page.locator('table.table-bordered tr >> text="Тип столешницы"');
        this.type = this.typeCell.locator('.. >> td.col-2').nth(0);
        this.optionsCell = page.locator('table.table-bordered tr >> text="Опции"');
        this.groove = this.optionsCell.locator('.. >> td.col-2').nth(0);
        this.amountCell = page.locator('table.table-bordered tr >> text="Стоимость итоговая"');
        this.amount = this.amountCell.locator('.. >> td.col-2').nth(2);

    }
    
    async result(){ 
        await expect(this.material).toHaveText(/N-103 Gray Onix/);
        const textMaterial = await this.material.textContent();
        console.log('Материал: ' + textMaterial);

        await expect(this.type).toHaveText(/П-образная/);
        const textЕнзу = await this.material.textContent();
        console.log('Тип столешницы: ' + textЕнзу);

        await expect(this.groove).toHaveText(/Проточки/);
        const textGroove = await this.material.textContent();
        console.log('Опции: ' + textGroove);

        await expect(this.amount).toHaveText(/510000/);
        const textAmount = await this.material.textContent();
        console.log('Опции: ' + textAmount);
    }
}