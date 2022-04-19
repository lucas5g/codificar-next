// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sendMessageRocket } from "../../../helpers"

export default function gitlab(req, res) {

    // console.log(req.body)

    const user = req.body.username || 'lucas.sousa'
    const pipelineId = req.body.object_attributes ? req.body.object_attributes.id : '5399'
    const commit = req.body.commit ? req.body.commit.url : "https://git.codificar.com.br/marketplace/web/-/commit/2564a5d48ab82d1772ba10441cd20f5ec89913b0"
    const status = req.body.object_attributes ? req.body.object_attributes.status : 'false'

    let text = ''
    if (status === 'success') {
        text = `Sucesso no pipeline - https://git.codificar.com.br/marketplace/web/-/pipelines/${pipelineId}
        @${user} seu commit está ok - ${commit}.
        `
    } else if (status === 'failed') {
        text = `Erro no pipeline - https://git.codificar.com.br/marketplace/web/-/pipelines/${pipelineId}
        @${user} verificar seu commit - ${commit}.
        @lucas.sousa verifique os testes.
        `
    }


    sendMessageRocket('@lucas.sousa', text)


    res.status(200).json({
        api: 'gitlab webhook',
        date: new Date(),

    })
}