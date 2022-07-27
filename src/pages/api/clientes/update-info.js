import axios from 'axios';
import puppeteer from 'puppeteer';

import { prisma } from "../../../../prisma/index.js"
import { getLastTag, getProject } from '../../../utils/fetch.js';

export default async function handler(req, res) {

    const { platform, projectSlug } = req.query

    const project = await getProject({ projectSlug })
    const lastTagWeb = await getLastTag({ projectIdGit: project.projectIdGitWeb })
    const lastTagUser = await getLastTag({ projectIdGit: project.projectIdGitUser })

    return res.json({
        project,
        lastTagWeb,
        lastTagUser
    })


    return res.json({ lastTagWeb, lastTagUser })



    console.log(`Atualizando as informações do ${platform}`)

    if (platform === 'web') {

        const projects = await prisma.project.findMany({
            orderBy: [{
                name: 'asc'
            }],
            where: {
                NOT: {
                    versionWeb: lastTagWeb
                },
                status: {
                    equals: true
                }
            }
        })

        console.log('Total projects: ' + projects.length)
            // console.log({ projects })
            // return

        projects.map(async(project, index) => {
            setTimeout(async() => {


                const infoPortal = await getInfoWeb({ portal: project.portal, name: project.name, index })

                await prisma.project.update({
                    where: { name: project.name },
                    data: {
                        versionWeb: infoPortal.tag,
                    }

                })
            }, index * 1500)
        })

    }

    if (platform === 'ios') {
        const projects = await prisma.project.findMany({
            orderBy: [{
                name: 'asc'
            }],
            where: {
                NOT: {
                    versionIos: lastTagReact
                },
                status: {
                    equals: true
                }
            }
        })
        console.log('Total projects: ' + projects.length)

        projects.map(async(project, index) => {
            setTimeout(async() => {


                console.log(project.ios)
                const infoIos = await getInfoIos({ ios: project.ios, name: project.name, index })
                await prisma.project.update({
                    where: { name: project.name },
                    data: {
                        versionIos: infoIos.tag,
                    }

                })
            }, index * 2000)
        })
    }

    if (platform === 'android') {
        const projects = await prisma.project.findMany({
            orderBy: [{
                name: 'asc'
            }],
            where: {
                NOT: {
                    versionAndroid: lastTagReact
                },
                status: {
                    equals: true
                }
            }
        })
        console.log('Total projects: ' + projects.length)

        projects.map(async(project, index) => {
            setTimeout(async() => {
                const infoAndroid = await getInfoAndroid({ android: project.android, name: project.name, index })
                await prisma.project.update({
                    where: { name: project.name },
                    data: {
                        versionAndroid: infoAndroid.tag,
                    }
                })
            }, index * 2000)
        })
    }

    res.json({ msg: 'Atualizando as informações dos projetos' })


}

async function getInfoWeb({ portal, name, index }) {
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
        console.log(`${index + 1} ${name} - ${infoPortal.tag}`)
        return infoPortal

    } else {


        const infoPortal = await page.evaluate(() => {

            return {
                tag: document.querySelector('div.text-version >  p > strong').textContent,

            }
        })

        await browser.close();
        console.log(`${index + 1} ${name} - ${infoPortal.tag}`)
        return infoPortal
    }

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
        // console.log(ios)
    await page.waitForSelector('p.whats-new__latest__version')
    const infoIos = await page.evaluate(() => {
            return {
                tag: document.querySelector('p.whats-new__latest__version').textContent.replace('Versão ', '').replace('Version ', '')

            }
        })
        // await page.screenshot({ path: `./screenshots/${name}.png` })
    await browser.close();
    console.log(`${index + 1} ${name} - ${infoIos.tag}`)
    return infoIos


}

async function getInfoAndroid({ android, name, index }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });
    const page = await browser.newPage()
    await page.goto(android)
    await page.click('[jscontroller="lpwuxb"] > .HcyOxe > .cswwxf > .VMq4uf > [jsaction="JIbuQc:trigger.hdtuG"] > .VfPpkd-Bz112c-LgbsSe > .google-material-icons')

    const infoAndroid = await page.evaluate(() => {
        return {
            tag: document.querySelector(':nth-child(1) > .reAt0').textContent
        }
    })
    await browser.close();
    console.log(`${index + 1} ${name} - ${infoAndroid.tag}`)

    return infoAndroid

    // return infoPortal
}