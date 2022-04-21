import os from 'os'

export class Bot {

    // let browser 
    page
    constructor(page) {
        this.page = page
    }

    async start() {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            // return page
            console.log('constructor')

        }
        // start();

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

    async uploadApk({
        project,
        release,
        url,
        extension
    }) {
        console.log({ project, release, extension })

        const { page } = this

        await page.goto(url)

        const buttonRelease = await page.waitForXPath(`//button[contains(., 'versão')]`)
        await buttonRelease.click()

        const buttonEnviar = await page.waitForXPath('(//span[text()="Enviar"])[1]')

        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            // page.click("[name='upload']"),
            await buttonEnviar.click()
        ]);
        const pathApk = `${os.homedir()}/releases/${release}/${project}/${project}-user-${release}.${extension}`
        await fileChooser.accept([pathApk]);
    }


}