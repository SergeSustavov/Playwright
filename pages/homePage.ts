import { Locator, Page } from "@playwright/test";
import { BasePage } from '../pages/basePage';

export class HomePage extends BasePage {
    carouselContainer = this.page.locator("//div[@class='main-news-rotator__container']");
    carouselTitle = this.page.locator("//span[@class='main-news-item__title']");
    carouselTitleLink = this.page.locator("//a[@class='main-news-item__title-link']");
    carouselAuthor = this.page.locator("//p[@class='main-news-item__author']/a");
    carouselImage = this.page.locator("//figure[@class='main-news-item__figure']/div");
    carouselPublicationDate = this.page.locator("//footer[@class='main-news-item__footer']/time");
};