import puppeteer from 'puppeteer'
import { projects } from './projects.mjs'
import { Bot } from './Bot.mjs';
import { cookies } from './cookies.mjs'
import axios from 'axios';

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
    login(page)


    const { name: tag, created_at } = await getInfoLastTag()
    console.log({ tag, created_at })
        // await bot.uploadsApps({ projects, tag })

    await sleep(projects.length * 45000)
    await browser.close()


})();


async function login(page) {
    console.log('login')
}

async function getInfoLastTag() {
    const { data } = await axios.get(process.env.GITLAB_URL_TAG, {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_KEY}`
        }
    })

    const { name, commit } = data[0]
    const { created_at } = commit

    return { name, created_at }
}