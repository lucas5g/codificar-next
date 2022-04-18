// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function gitlab(req, res) {

    console.log(req.body)

    res.status(200).json({
        api: 'gitlab webhook',
        date: new Date(),

    })
}