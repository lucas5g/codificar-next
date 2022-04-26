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

    await page.setCookie(...cookies)
    const bot = new Bot(page)


    /**
     * login
     */
    ;
    (async() => {
        console.log('login')
    })()

    const { name: tag, created_at } = await bot.getInfoLastTag()
        // await bot.uploadsApps({ projects, tag })

    await sleep(projects.length * 45000)
    await browser.close()


})();