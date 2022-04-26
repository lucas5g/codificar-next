import puppeteer from 'puppeteer'
import { projects } from './projects.mjs'
import { Bot } from './Bot.mjs';
import { cookies } from './cookies.mjs'
import axios from 'axios';

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}



(async() => {
    /**
     * login
     */
    // login(page)
    // const browser = await puppeteer.launch({ headless: false });
    // const page = await browser.newPage();
    // await page.setCookie(...cookies)

    const { name: tag, created_at } = await getInfoLastTag()
    console.log({ tag, created_at })
        // await bot.uploadsApps({ projects, tag })

    let timeWait = 0
    projects.map(async(project, index) => {
        timeWait = 10000 * index
        setTimeout(async() => {
            await uploadApp({ project, tag })

        }, timeWait)
    })

    // await sleep(projects.length * 45000)
    // await browser.close()


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


async function uploadApp({ project, tag }) {
    console.log(project.name, tag)
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setCookie(...cookies)


    await page.goto(project.url)
    const verifyVersion = await page.waitForSelector('ul.list')
    const fullTextVersion = await page.evaluate(el => el.textContent, verifyVersion)

    if (fullTextVersion.includes(tag)) {

        console.log(`${index} - ${project.name} já foi cadastrado essa versão ;)`)
        await page.screenshot({ path: `./screenshots/${project.name}.png` })
            // timeWait = 12000 * index
        return
    }
    console.log('pode cadastrar')




    await browser.close()

}

async function uploadApps({ projects, tag }) {

    let timeWait = 0
    projects.map((project, index) => {
        timeWait = 45000 * index
        setTimeout(async() => {

            console.log(project.name)
            return;
            await page.goto(project.url)


            // const verifyVersion = await page.waitForXPath(`//li[contains(., "Versão")]`)

            const verifyVersion = await page.waitForSelector('ul.list')
                //ExVersão 320220421 (2.13.8) em análise
            const fullTextVersion = await page.evaluate(el => el.textContent, verifyVersion)
                // console.log({ fullTextVersion })

            if (fullTextVersion.includes(tag)) {

                console.log(`${index} - ${project.name} já foi cadastrado essa versão ;)`)
                await page.screenshot({ path: `./screenshots/${project.name}.png` })
                    // timeWait = 12000 * index
                return
            }
            //caso ja foi cadastrado - carrega mais rápido
            // timeWait = 45000 * index

            const buttonRelease = await page.waitForXPath(`//button[contains(., 'versão')]`)
            await buttonRelease.click()

            const buttonEnviar = await page.waitForXPath('(//span[text()="Enviar"])[1]')
            const [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                // page.click("[name='upload']"),
                await buttonEnviar.click()
            ]);

            const appName = `${project.name}-user-${tag}.${project.extension}`

            const pathApk = `${os.homedir()}/automation/marketplace/marketplace-react/releases/${tag}/${project.name}/${appName}`
            await fileChooser.accept([pathApk]);

            await page.waitForXPath(`//div[text()="${appName}"]`, {
                timeout: 0
            })

            const buttonSalvar = await page.waitForXPath(`(//div[text()="Salvar"])[1]`)
            await buttonSalvar.click()

            const buttonAvaliar = await page.waitForXPath(`(//div[text()="Avaliar versão"])[1]`)
            await buttonAvaliar.click()

            const buttonLancar = await page.waitForXPath(`//button/div[contains(., "Iniciar lançamento")]`)
            await buttonLancar.click()


            const confirmarLancamento = await page.waitForXPath(`//button[contains(., "Lançar")]`)
            await confirmarLancamento.click()

            await page.screenshot()
            console.log(`${index}${project.name} - Atualizado :)`)

        }, timeWait)
    })


}