export default async function handler(req, res) {

    res.json({ api: 'ponto' })
}


// async function gestor() {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: [
//             '--no-sandbox',
//         ]
//     });
//     const page = await browser.newPage();
//     await page.goto('https://gestor.codificar.com.br');

//     /**
//      * Login Gestor
//      */
//     await page.type('input[name="c3"]', process.env.GESTOR_USER)
//     await page.type('input[name="c4"]', process.env.GESTOR_PASSWORD)
//     await page.click('input[type="submit"]')

//     await page.waitForTimeout(2000)
//     const buttonPonto = await page.waitForXPath('//a/strong[contains(., "Ponto")]')
//     await buttonPonto.click()

//     await page.waitForSelector('input[type="button"]')

//     await page.screenshot({ path: 'src/assets/ponto.png' });

//     // await page.waitForTimeout(5000)
//     await browser.close();
// }

// async function rocket() {

//     // return
//     const channel = "@lucas.sousa"
//     const text = `${process.env.BASE_URL}:${process.env.PORT}/ponto.png`
//     const image_url = `${process.env.BASE_URL}:${process.env.PORT}/ponto.png`

//     try {

//         const { data } = await apiRocket.post('/login', {
//             user: process.env.ROCKET_USERNAME,
//             password: process.env.ROCKET_PASSWORD
//         })


//         const { userId, authToken } = data.data

//         await apiRocket.post('/chat.postMessage', {
//             channel,
//             text,
//             image_url
//         }, {
//             headers: {
//                 'X-Auth-Token': authToken,
//                 'X-User-Id': userId
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }