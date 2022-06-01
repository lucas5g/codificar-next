import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const projects = [{
        name: "achelocal",
        ios: "https://apps.apple.com/us/app/ache-local/id1504708811?l=pt&ls=1",
        android: "https://play.google.com/store/apps/details?id=com.br.achelocal",
        portal: "https://app.achelocal.appmarketplace.com.br",
        versionWeb: "feature.23003",
        versionIos: "2.13.9",
        versionAndroid: "2.14.2"

    },
    {
        name: "ajudaai",
        ios: "https://apps.apple.com/us/app/ajuda-ai/id1603669928",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.ajudaai",
        portal: "https://app.ajudaai.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.13.7",
        versionAndroid: "2.14.2"

    },
    {
        name: "demo",
        ios: "https://apps.apple.com/us/app/marketplaceapp/id1534615121",
        android: "https://play.google.com/store/apps/details?id=br.codificar.fomefome",
        portal: "https://demo.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.14.2",
        versionAndroid: "2.14.2"
    },
    {
        name: "freefood",
        ios: "https://apps.apple.com/in/app/freefood/id1529160011",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.freefood",
        portal: "https://app.freefood.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.13.5",
        versionAndroid: "2.14.2"

    },
    {
        name: "mariamariabox",
        ios: "https://apps.apple.com/br/app/mariamariabox/id1604821083",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.mariamariabox",
        portal: "https://app.mariamariabox.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.14.2",
        versionAndroid: "2.14.2"

    },
    {
        name: "medicol",
        ios: "https://apps.apple.com/br/app/medicol/id1574241148",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.medicolappmarketplace",
        portal: "https://app.medicol.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.14.1",
        versionAndroid: "2.14.2"

    },
    {
        name: "molde",
        ios: "https://apps.apple.com/us/app/molde/id1571195191",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.molde",
        portal: "https://app.molde.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.13.3",
        versionAndroid: "2.14.2"

    },
    {
        name: "pedenobairro",
        ios: "https://apps.apple.com/br/app/pede-no-bairro/id1527831739",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.pedenobairro",
        portal: "https://app.pedenobairro.appmarketplace.com.br",
        versionWeb: "2.21.0",
        versionIos: "2.13.5",
        versionAndroid: "2.14.2"

    },
    {
        name: "pidao",
        ios: "https://apps.apple.com/br/app/pid%C3%A3o/id1534631942",
        android: "https://play.google.com/store/apps/details?id=br.com.codificar.pidao",
        portal: "https://app.pidao.appmarketplace.com.br",
        versionWeb: "2.20.2",
        versionIos: "2.11.2",
        versionAndroid: "2.14.2"

    }
]

;
(async() => {

    await prisma.project.createMany({
        data: projects
    })
    console.log('Added projects data')
})()