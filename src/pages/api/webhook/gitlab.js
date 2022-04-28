// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sendMessageRocket } from "../../../helpers"

export default function gitlab(req, res) {

    // console.log(req.body)

    // const author = req.body.commit ? req.body.commit.author.email.replace('@codificar.com.br', '') : 'lucas.sousa'
    const username = req.body.user ? req.body.user.username : 'lucas.sousa'
    const pipelineId = req.body.object_attributes ? req.body.object_attributes.id : '5399'
    const commit = req.body.commit ? req.body.commit.url : "https://git.codificar.com.br/marketplace/web/-/commit/2564a5d48ab82d1772ba10441cd20f5ec89913b0"
    const status = req.body.object_attributes ? req.body.object_attributes.status : 'false'

    let text = ''
    if (status === 'success') {
        text = `Sucesso no pipeline - https://git.codificar.com.br/marketplace/web/-/pipelines/${pipelineId}\n
        @${username} o último commit está ok :)
        ${commit}.
        `
        sendMessageRocket(`@${username}`, text)


    } else if (status === 'failed') {
        text = `\n
        *Erro no pipeline* - https://git.codificar.com.br/marketplace/web/-/pipelines/${pipelineId} :(\n
        @${username} verificar seu commit - ${commit}.
        @lucas.sousa verifique os testes.
        `
        sendMessageRocket(`@${username}`, text)
    }


    res.status(200).json({
        api: 'gitlab webhook',
        date: new Date(),

    })
}