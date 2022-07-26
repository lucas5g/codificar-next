import { PrismaClient } from "@prisma/client";
import { clientsMp } from "./clientsMp.mjs";
import { projects } from "./projects.mjs";

const prisma = new PrismaClient();


(async() => {


    clientsMp.forEach(async(client) => {
        await prisma.client.upsert({
            where: {
                id: client.id
            },
            update: client,
            create: client
        })
        console.log(`${client.name} cliente atualizado!`)
    })

    projects.forEach(async(project) => {

        await prisma.project.upsert({
            where: {
                id: project.id
            },
            update: project,
            create: project
        })
        console.log(`${project.name} projeto atualizado!`)
    })




})()