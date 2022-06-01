import puppeteer from 'puppeteer';

import { prisma } from '../../prisma/index.mjs'
export async function projectsVersion() {


    const projects = await prisma.project.findMany({
        orderBy: [{
            name: 'asc'
        }]

    })
    console.log('Total projects: ' + projects.length)
    console.log('atualizando lista...')

    projects.map(async(project, index) => {
        setTimeout(async() => {

            // const { infoIos } = await verifyVersionIos({ ios: project.ios, name: project.name, index })
            // await prisma.project.update({
            //     where: { name: project.name },
            //     data: {
            //         versionIos: infoIos.versionIos
            //     }
            // })


            const { infoWeb } = await verifyVersion({ portal: project.portal })
            await prisma.project.update({
                where: { name: project.name },
                data: {
                    versionWeb: infoWeb.versionWeb,

                }

            })


            // console.log({ infoWeb, infoIos })

        }, 2000 * index)
    })


}

// projectsVersion()

async function verifyVersion({ portal }) {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()

    await page.goto(portal)

    const infoWeb = await page.evaluate(() => {
        return {
            versionWeb: document.querySelector('div.text-version >  p > strong').textContent,

        }
    })

    console.log({ portal })
    await browser.close();

    return { infoWeb }

}

async function verifyVersionIos({ ios, name, index }) {
    // console.log(name)
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()


    await page.goto(ios)

    try {

        await page.waitForSelector('p.whats-new__latest__version')
        const infoIos = await page.evaluate(() => {
            return {
                versionIos: document.querySelector('p.whats-new__latest__version').textContent.replace('Versão ', '').replace('Version ', '')

            }
        })
        await browser.close();
        console.log(`${index + 1} ${name}`)
        return { infoIos }

    } catch (err) {
        console.log(err)
        console.log(name)
        console.log(ios)
        const infoIos = {
            versionIos: 'Update'
        }
        return { infoIos }
    }
    await browser.close();
    // console.log({ ios, infoIos })


}