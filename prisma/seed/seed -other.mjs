import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const clients = [{
        "id": 1,
        "name": "achelocal",
        "portal": "https://app.achelocal.appmarketplace.com.br",
        "ios": "https://apps.apple.com/us/app/ache-local/id1504708811?l=pt&ls=1",
        "android": "https://play.google.com/store/apps/details?id=com.br.achelocal",
        "versionWeb": "2.23.1",
        "versionIos": "2.13.9",
        "versionAndroid": "2.15.0",
        "extensionAndroid": "",
        "urlUploadAndroid": "",
        "status": false,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-06T14:57:36.430Z"
    },
    {
        "id": 2,
        "name": "ajudaai",
        "portal": "https://app.ajudaai.appmarketplace.com.br",
        "ios": "https://apps.apple.com/us/app/ajuda-ai/id1603669928",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.ajudaai",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/8568547146082455237/app/4972291228173367279/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-26T12:30:11.068Z"
    },
    {
        "id": 13,
        "name": "clickfood ",
        "portal": "https://app.clickfood.appmarketplace.com.br/",
        "ios": "https://apps.apple.com/za/app/clickfood-delivery/id1522929218",
        "android": "https://play.google.com/store/apps/details?id=br.com.clickfood&hl=pt",
        "versionWeb": "2.23.1",
        "versionIos": "2.7.9",
        "versionAndroid": "2.15.0",
        "extensionAndroid": "",
        "urlUploadAndroid": "",
        "status": false,
        "createdAt": "2022-06-09T10:11:21.488Z",
        "updatedAt": "2022-06-14T17:01:51.190Z"
    },
    {
        "id": 3,
        "name": "demo",
        "portal": "https://demo.appmarketplace.com.br",
        "ios": "https://apps.apple.com/us/app/marketplaceapp/id1534615121",
        "android": "https://play.google.com/store/apps/details?id=br.codificar.fomefome",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "apk",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4973745748397073837/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-26T12:30:05.883Z"
    },
    {
        "id": 12,
        "name": "dusha",
        "portal": "https://app.dusha.appmarketplace.com.br/",
        "ios": "https://apps.apple.com/app/dusha/id1612306654",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.dusha",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "apk",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5657606008065923757/app/4975692790965613060/tracks/production",
        "status": true,
        "createdAt": "2022-06-09T10:11:21.488Z",
        "updatedAt": "2022-07-26T12:30:16.456Z"
    },
    {
        "id": 4,
        "name": "freefood",
        "portal": "https://app.freefood.appmarketplace.com.br",
        "ios": "https://apps.apple.com/in/app/freefood/id1529160011",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.freefood",
        "versionWeb": "2.23.1",
        "versionIos": "2.13.5",
        "versionAndroid": "2.15.0",
        "extensionAndroid": "",
        "urlUploadAndroid": "",
        "status": false,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-06-09T14:42:16.334Z"
    },
    {
        "id": 20,
        "name": "ichef",
        "portal": "https://app.ichef.appmarketplace.com.br/",
        "ios": "https://apps.apple.com/app/id1523084163",
        "android": "https://play.google.com/store/apps/details?id=br.com.ichefdelivery",
        "versionWeb": "2.23.1",
        "versionIos": "-",
        "versionAndroid": "1.7.0",
        "extensionAndroid": "",
        "urlUploadAndroid": "",
        "status": false,
        "createdAt": "2022-06-15T17:41:16.037Z",
        "updatedAt": "2022-06-15T17:41:16.037Z"
    },
    {
        "id": 5,
        "name": "mariamariabox",
        "portal": "https://app.mariamariabox.appmarketplace.com.br",
        "ios": "https://apps.apple.com/br/app/mariamariabox/id1604821083",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.mariamariabox",
        "versionWeb": "2.27.0",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5120700496387554154/app/4976421342033632290/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-26T12:30:17.435Z"
    },
    {
        "id": 6,
        "name": "medicol",
        "portal": "https://app.medicol.appmarketplace.com.br",
        "ios": "https://apps.apple.com/br/app/medicol/id1574241148",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.medicolappmarketplace",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "apk",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/6230927619511975906/app/4972469047594495433/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-26T12:30:17.798Z"
    },
    {
        "id": 7,
        "name": "molde",
        "portal": "https://app.molde.appmarketplace.com.br",
        "ios": "https://apps.apple.com/us/app/molde/id1571195191",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.molde",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "apk",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4972845076211451831/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-25T21:50:17.750Z"
    },
    {
        "id": 55,
        "name": "molde autopeças",
        "portal": "https://molde.app.br/portal/autopecas_1EsGCaFd/outlets.html?listing=show",
        "ios": "https://apps.apple.com/us/app/molde-autopecas/id1630824133",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.moldeautopecas",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4973798652868098174/tracks/production",
        "status": true,
        "createdAt": "2022-07-12T19:45:30.568Z",
        "updatedAt": "2022-07-25T22:10:28.886Z"
    },
    {
        "id": 56,
        "name": "molde construção",
        "portal": "https://molde.app.br/portal/construcao_4IYHW2GF/outlets.html?listing=show",
        "ios": "https://apps.apple.com/us/app/molde-construcao/id1630824050",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.moldeconstrucao",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4976249541880903776/tracks/production",
        "status": true,
        "createdAt": "2022-07-12T19:57:41.946Z",
        "updatedAt": "2022-07-25T22:10:32.298Z"
    },
    {
        "id": 22,
        "name": "molde farmácia",
        "portal": "https://molde.app.br/portal/farmacia_VS4eqNEB/outlets.html?listing=show",
        "ios": "https://apps.apple.com/us/app/molde-farm%C3%A1cia/id1631353668",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.moldefarmacia",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4973622282987548828/tracks/production",
        "status": true,
        "createdAt": "2022-06-15T19:06:45.129Z",
        "updatedAt": "2022-07-25T22:10:32.490Z"
    },
    {
        "id": 10,
        "name": "molde pizzapoint",
        "portal": "https://molde.app.br/portal/pizza-point_gUrlhBXC/outlets.html?listing=show",
        "ios": "https://apps.apple.com/us/app/pizza-point-app/id1573640659",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.pizzapoint",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "apk",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4973181177486856313/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-25T22:10:33.640Z"
    },
    {
        "id": 57,
        "name": "molde restaurante",
        "portal": "https://molde.app.br/portal/restaurante_2cQkrGT5/outlets.html?listing=show",
        "ios": "https://apps.apple.com/us/app/molde-restaurante/id1580823278",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.molde_restaurante",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4975455970587107307/tracks/production",
        "status": true,
        "createdAt": "2022-07-12T22:42:09.272Z",
        "updatedAt": "2022-07-25T22:10:33.527Z"
    },
    {
        "id": 21,
        "name": "molde upfood",
        "portal": "https://molde.app.br/portal/upfood_4bbTTVPt/outlets.html?listing=show",
        "ios": "https://apps.apple.com/us/app/upfood-delivery/id1627531665",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.moldeupfood",
        "versionWeb": "2.27.1",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4976211597483929597/tracks/production",
        "status": true,
        "createdAt": "2022-06-15T18:39:17.090Z",
        "updatedAt": "2022-07-25T22:10:33.871Z"
    },
    {
        "id": 11,
        "name": "pededetudo",
        "portal": "https://app.pededetudo.appmarketplace.com.br/",
        "ios": "https://apps.apple.com/app/id1626001428",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.pededetudo",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/5887817223763081215/app/4973126392195638670/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-26T12:30:14.618Z"
    },
    {
        "id": 19,
        "name": "pedeme",
        "portal": "https://app.pedeme.appmarketplace.com.br/",
        "ios": "https://apps.apple.com/us/app/pede-me/id1634787954",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.pedeme",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "aab",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/7962309792984069027/app/4973771651994423755/tracks/production",
        "status": true,
        "createdAt": "2022-06-15T17:35:33.421Z",
        "updatedAt": "2022-07-26T12:30:15.407Z"
    },
    {
        "id": 8,
        "name": "pedenobairro",
        "portal": "https://app.pedenobairro.appmarketplace.com.br",
        "ios": "https://apps.apple.com/br/app/pede-no-bairro/id1527831739",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.pedenobairro",
        "versionWeb": "2.26.2",
        "versionIos": "2.16.0",
        "versionAndroid": "2.16.0",
        "extensionAndroid": "apk",
        "urlUploadAndroid": "https://play.google.com/console/u/0/developers/9025655114453760810/app/4973109547809427768/tracks/production",
        "status": true,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-26T12:30:16.805Z"
    },
    {
        "id": 9,
        "name": "pidao",
        "portal": "https://app.pidao.appmarketplace.com.br",
        "ios": "https://apps.apple.com/br/app/pid%C3%A3o/id1534631942",
        "android": "https://play.google.com/store/apps/details?id=br.com.codificar.pidao",
        "versionWeb": "2.23.1",
        "versionIos": "2.11.2",
        "versionAndroid": "2.15.0",
        "extensionAndroid": "",
        "urlUploadAndroid": "",
        "status": false,
        "createdAt": "2022-05-31T17:53:34.167Z",
        "updatedAt": "2022-07-07T21:36:56.412Z"
    },
    {
        "id": 17,
        "name": "transf",
        "portal": "https://app.transfdelivery.appmarketplace.com.br/",
        "ios": "-",
        "android": "-",
        "versionWeb": "2.23.1",
        "versionIos": "-",
        "versionAndroid": "-",
        "extensionAndroid": "",
        "urlUploadAndroid": "",
        "status": false,
        "createdAt": "2022-06-14T18:23:08.126Z",
        "updatedAt": "2022-06-15T17:41:56.503Z"
    }
];

(async() => {

    await prisma.client.createMany({
        data: clients
    })
    console.log('Added clients data')
})()