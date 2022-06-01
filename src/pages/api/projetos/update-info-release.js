import puppeteer from 'puppeteer';
import { prisma } from "../../../../prisma/index.mjs"

export default async function updateInfoRelease(req, res) {


    const projects = await prisma.project.findMany({
        orderBy: [{
            name: 'asc'
        }]

    })

    console.log('Total projects: ' + projects.length)

    projects.map(async(project, index) => {
        setTimeout(async() => {

            const infoIos = await getInfoIos({ ios: project.ios, name: project.name, index })
            await prisma.project.update({
                where: { name: project.name },
                data: {
                    versionIos: infoIos.tag
                }
            })

            const infoPortal = await getInfoPortal({ portal: project.portal })

            await prisma.project.update({
                where: { name: project.name },
                data: {
                    versionWeb: infoPortal.tag,
                }

            })
        }, 2000 * index)
    })

    res.json({ msg: 'Atualizando informações da versão do projeto.' })

}

async function getInfoPortal({ portal }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()

    await page.goto(portal)
        // console.log({ portal: portal.includes('portal') })

    if (portal.includes('portal')) {
        const infoPortal = await page.evaluate(() => {

            return {
                tag: document.querySelector('.footer-column-only-one >  p >  strong').textContent,

            }
        })

        await browser.close();
        return infoPortal

    }

    const infoPortal = await page.evaluate(() => {

        return {
            tag: document.querySelector('div.text-version >  p > strong').textContent,

        }
    })

    await browser.close();
    return infoPortal

}

async function getInfoIos({ ios, name, index }) {
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
                tag: document.querySelector('p.whats-new__latest__version').textContent.replace('Versão ', '').replace('Version ', '')

            }
        })
        await browser.close();
        console.log(`${index + 1} ${name}`)
        return infoIos

    } catch (err) {
        console.log(err)
        console.log(name)
        console.log(ios)
        const infoIos = {
            versionIos: 'Update'
        }
        await browser.close();
        return { infoIos }
    }

}