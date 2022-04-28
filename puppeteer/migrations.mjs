/**
 * Migração dos servidores dos clientes para o forge
 */

/**
 * 1 - backup mysql
 * 2 - backup images
 */

const client = 'freefood'
const site = `app.${client}.appmarketplace.com.br`

const sshOld = site
.replace('app.')