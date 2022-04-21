import axios from 'axios'
import { exec } from 'child_process'
import { projects } from './projects.mjs'
import dotenv from 'dotenv'
dotenv.config()

async function command(command) {
    exec(command, (err, stdout, stderr) => {
        console.log({ command })
        if (err) {
            return console.log({ err })
        }

        console.log({ stdout })
        console.log({ stderr })

    })
};

(async() => {


    const { data } = await axios.get(process.env.GITLAB_URL_TAG, {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_KEY}`
        }
    })

    const lastTag = data[0].name


    console.log({ lastTag })



    // return
    projects.map((project, index) => {
        setTimeout(async() => {
            console.log({ project })
            const run = `cd ~/automation/marketplace/marketplace-react && yes "" | ./auto -v ${lastTag} -p ${project.name} -a ${project.extension || 'apk'}`
            console.log('\n' + run + '\n')
                // return
            await command(run)
        }, 60000 * 2 * index)
    })
})()