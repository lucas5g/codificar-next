import { exec } from 'child_process'

async function command(command) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            return console.log({ err })
        }

        console.log({ stdout })
        console.log({ stderr })

    })
};

(async() => {

    // const command = `cd ~/automation/marketplace/marketplace-react && 
    //     ./auto -v dev -p versionmarketplace -a apk

    const projects = [
        'moldeshopping',
        'moldeautopecas',
        'molderestaurante'
    ]
    const tag = '2.13.8'

    let wait = 0
    projects.map(project => {

        setTimeout(async() => {

            console.log({ project })

            await command(`cd ~/automation/marketplace/marketplace-react && ./auto -v ${tag} -p ${project} -a apk`)
        }, wait)
        wait += 205000
    })



    // await command('cd ~/automation/marketplace/marketplace-react/releases/dev/versionmarketplace && ls')





})()