// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function webhook(req, res) {


    res.status(200).json({
        api: 'webhook',
        date: new Date()
    })
}