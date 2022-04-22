import axios from 'axios';
import os from 'os'
import dotenv from 'dotenv'
dotenv.config()

export class Bot {

    // let browser 
    page
    constructor(page) {
        this.page = page
    }

    async loginGooglePlayConsole() {
        const { page } = this
        await page.goto('https://play.google.com/console/signup');

        await page.type('#identifierId', 'mobile@codificar.com.br')

        await page.$x('//button/span[text()="Próxima"]')
            .then(res => res[0].click())

        await sleep(3000)
            // await page.waitForNavigation()
            // await page.waitForSelector('input[type="password"]')
        await page.type('input[type="password"]', 'C0d1f1c@r375n3w')

        await page.$x('//button/span[text()="Próxima"]')
            .then(el => el[0].click())

        await page.waitForNavigation()
        await page.click('button > div')

        const cookies = await page.cookies()
        console.log(cookies)

    }


    async uploadsApps({
        projects,
        tag,

    }) {

        const { page } = this

        let timeWait = 0
        projects.map((project, index) => {
            timeWait = 45000 * index
            setTimeout(async() => {

                // console.log(project.name)
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

        // await page.close()
    }

    // async 




    async getInfoLastTag() {

        const { data } = await axios.get(process.env.GITLAB_URL_TAG, {
            headers: {
                Authorization: `Bearer ${process.env.GITLAB_KEY}`
            }
        })

        const { name, commit } = data[0]
        const { created_at } = commit

        return { name, created_at }
    }


}