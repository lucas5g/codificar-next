// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../../prisma/index.mjs"

export default async function handler(req, res) {

    const projects = await prisma.project.findMany()
    res.status(200).json({ name: 'John Doe', projects })


}