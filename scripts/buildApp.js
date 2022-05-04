const fs = require('fs')
const { exec } = require('child_process')

// const data = fs.readFileSync(`${__dirname}/buildApp.sh`, 'utf-8')
// console.log(process.argv)
// const input = process.argv[2]

// const projectsApk = [
//     'pizzapoint',
//     'molde'
// ]

// let runAll = ''

// projectsApk.map(project => {
//     runAll += `
//      ./auto -v ${input} -p ${project} -a apk
//     Sleep 2 
//     `
// })
// console.log(runAll)

// const command = fs.a

// const command = `

//     cd ~/automation/marketplace/marketplace-react
//     ${runAll}

// `
//. / auto - v 2 - p $ { projectsApk } - a apk


exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);

    console.log({ stderr })
});