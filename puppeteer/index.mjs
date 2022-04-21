import puppeteer from 'puppeteer'
import os from 'os'

import { projects } from './projects.mjs'
import { Bot } from './Bot.mjs';

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

const cookies = [{
        name: '__Secure-3PSIDCC',
        value: 'AJi4QfFlphqSki8EO4dW2yK9KfepQju-5qtocwDyJdX_UcD5hjuhNyisFygqGubr1tOqLS1z',
        domain: '.google.com',
        path: '/',
        expires: 1682039319.205061,
        size: 88,
        httpOnly: true,
        secure: true,
        session: false,
        sameSite: 'None',
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'SIDCC',
        value: 'AJi4QfFY8_A_jZjx4beiEZ-e-WzbbK0IhKjJVUYuap9jKiOmLyFM0FFJmBRef-LQ5FbrzD-xbQ',
        domain: '.google.com',
        path: '/',
        expires: 1682039319.204909,
        size: 79,
        httpOnly: false,
        secure: false,
        session: false,
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: '__Secure-3PAPISID',
        value: 'VkKwJzs-malxg63-/A49SRIUMk-jnAfmBv',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.090155,
        size: 51,
        httpOnly: false,
        secure: true,
        session: false,
        sameSite: 'None',
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'SAPISID',
        value: 'VkKwJzs-malxg63-/A49SRIUMk-jnAfmBv',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.090037,
        size: 41,
        httpOnly: false,
        secure: true,
        session: false,
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'APISID',
        value: 'CHGQvI6YbzJBZI2O/AMR4zAU2QavOlZhih',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.089985,
        size: 40,
        httpOnly: false,
        secure: false,
        session: false,
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'SSID',
        value: 'AD34e2QbrWEoQPJZU',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.089935,
        size: 21,
        httpOnly: true,
        secure: true,
        session: false,
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'NID',
        value: '511=KRycWFtW0Ek-LnU2vKiSZs_11TqPIrkGeblEBcU5vdhY7LnqBR9m-KVf1tqnigj5533Ds_rNUyTtw6m-Y_2tXQSGhUige-TW8zHig-KUkJh4tkilnA35P0JFLCW3rEn5LZPTzyYFA0gQK8xOyEyRJ28eQ4DGDn8EKXv2gBRMXgYV_r_l389Y5nbuNo4',
        domain: '.google.com',
        path: '/',
        expires: 1666314516.090342,
        size: 194,
        httpOnly: true,
        secure: true,
        session: false,
        sameSite: 'None',
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: '__Secure-1PAPISID',
        value: 'VkKwJzs-malxg63-/A49SRIUMk-jnAfmBv',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.0901,
        size: 51,
        httpOnly: false,
        secure: true,
        session: false,
        sameParty: true,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'HSID',
        value: 'ABV9DIrKbD0cIY4RW',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.089884,
        size: 21,
        httpOnly: true,
        secure: false,
        session: false,
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: '__Secure-3PSID',
        value: 'JQhWErLEmCM7vQAIBznHXRLUJCnShv86gz-KBW6cHbuCD_mt9syNGxkaCfM5aeSRM5ff_Q.',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.089645,
        size: 85,
        httpOnly: true,
        secure: true,
        session: false,
        sameSite: 'None',
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: '__Secure-1PSID',
        value: 'JQhWErLEmCM7vQAIBznHXRLUJCnShv86gz-KBW6cHbuCD_mtr6R7f-vRPh3R1-krYkST4Q.',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.089478,
        size: 85,
        httpOnly: true,
        secure: true,
        session: false,
        sameParty: true,
        sourceScheme: 'Secure',
        sourcePort: 443
    },
    {
        name: 'SID',
        value: 'JQhWErLEmCM7vQAIBznHXRLUJCnShv86gz-KBW6cHbuCD_mtsreu29rnS19hS_ILIPieAw.',
        domain: '.google.com',
        path: '/',
        expires: 1713575316.089344,
        size: 74,
        httpOnly: false,
        secure: false,
        session: false,
        sameParty: false,
        sourceScheme: 'Secure',
        sourcePort: 443
    }
]

//Main
;
(async() => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const bot = new Bot(page)

    await page.setCookie(...cookies)

    let timeWait = 0

    projects.map((project, index) => {
        // timeWait = 12000 * index
        timeWait = 2000 * index

        setTimeout(() => {
            console.log({ project })
                // bot.uploadApk({
                //     project: project.name,
                //     release: '2.13.8',
                //     url: project.url,
                //     extension: project.extension || 'apk'

            // })
            console.log({ pleng: projects.length - 1, index })
            console.log(projects.length - 1 === index)

        }, timeWait)

        return

    })

    await page.close()

})();