import puppeteer from 'puppeteer'
import { projects } from './projects.mjs'
import { Bot } from './Bot.mjs';
import { cookies } from './cookies.mjs'

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}


(async() => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const bot = new Bot(page)

    await page.setCookie(...cookies)

    const { name: tag, created_at } = await bot.getInfoLastTag()
        // await bot.uploadsApps({ projects, tag })

    await sleep(projects.length * 45000)
    await browser.close()


})();