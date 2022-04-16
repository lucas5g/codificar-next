// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function webhook(req, res) {

    console.log("run cron job")
    console.log("cronhub")
    console.log(new Date())
    res.status(200).json({
        api: 'webhook',
        date: new Date()
    })
}