import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/loginPage" // Страница логина
import { MainPage } from "../pages/mainPage" // Главная страница, где формируем заказ
import { ReportPage } from "../pages/reportPage" // Страница сформированного заказа

const login = 'tester@inzhenerka.tech';
const pass = 'LetsTest!';

 test("Основные сценарии", async ({ page }) => {
   const loginPage = new LoginPage(page); // Создаем новый экземпляр страницы логина и прокидываем в него page
   await loginPage.openPage(); // Открыть страницу логина
   await loginPage.logIn(login, pass); // Логин c учетными данными
   console.log('Успешная авторизация выполнена');

   const mainPage = new MainPage(page); // Создаем новый экземпляр главной страницы и прокидываем в него page
   await mainPage.hideTop(); // Скрыть столешницу
   console.log('Столешница скрыта');
   
   await mainPage.showUtypeTop(); // Переключение на П-образную столешницу
   console.log('Отображается П-образная столешница');

 });

 test("e2e-сценарий", async ({ page }) => {
  const loginPage = new LoginPage(page); // Создаем новый экземпляр и прокидываем в него page
  const mainPage = new MainPage(page); // Создаем новый экземпляр и прокидываем в него page
 // const reportPage = new ReportPage(repPage);
  await loginPage.openPage(); // Открыть страницу логина
  await loginPage.logIn(login, pass); // Логин c учетными данными

  await mainPage.showUtypeTop(); // Переключение на П-образную столешницу
  console.log('Переключение на П-образную столешницу');
  await mainPage.thickSelect(4); // Переключили толщину
  console.log('Переключили толщину');
  await mainPage.plinthSwitch(); // Выключили плинтус
  console.log('Выключили плинтус');
  await mainPage.islandSwitch(); // Включили остров
  console.log('Включили остров');
  await mainPage.grooveSwitch(); // Включили проточки
  console.log('Включили проточки');
  await mainPage.colorSwitch();  // Выбрали цвет
  console.log('Выбрали цвет');

  await mainPage.report();  // Открыли страницу отчета
  // Ждем открытия новой страницы
  const [repPage] = await Promise.all([
    page.waitForEvent('popup'),  // Ожидаем открытия новой вкладки/страницы
  ]);

  await repPage.waitForLoadState('load');
  const title = await repPage.title();
  console.log('Открыли страницу:', title);

  const reportPage = new ReportPage(repPage);
  await reportPage.result(); // Проверяем результаты расчета
  console.log('Проверили результаты расчета');
  
 });
