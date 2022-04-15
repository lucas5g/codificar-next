import { distinctArrayObj } from "../helpers/index.mjs"
import { apiRedmine } from "../services/api.mjs"

export class IssueController {
    static async index(req, res) {

        const { data } = await apiRedmine.get('/issues.json?sort=status&limit=50')

        const issues = data.issues.map(issue => {
            return {
                url: `https://redmine.codificar.com.br/issues/${issue.id}`,
                subject: issue.subject,
                status: issue.status.name,
                id: issue.id,
                assigned_to: issue.assigned_to && issue.assigned_to,
                tracker: issue.tracker,
                priority: issue.priority.name,
                project: issue.project
            }
        })

        // console.log(issues)
        res.json(issues)
            // console.log(data)
    }

    static test(req, res) {
        const issues = [{
                "url": "https://redmine.codificar.com.br/issues/23657",
                "subject": "[LOJA] - Imprimir o pedido após a compra",
                "status": "Homologação",
                "id": 23657,
                "assigned_to": {
                    "id": 24,
                    "name": "Augusto Alves"
                },
                "tracker": {
                    "id": 10,
                    "name": "Ajuste"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23660",
                "subject": "[MOLDE] - Ocultar menu ENTREGADOR do perfil atendente ",
                "status": "Nova",
                "id": 23660,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23665",
                "subject": "[LOJA] -  Mostrar o usuário logado.",
                "status": "Nova",
                "id": 23665,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23661",
                "subject": "Adicionar pixel Facebook e google analytics",
                "status": "Nova",
                "id": 23661,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23664",
                "subject": "[LOJA] - Erro no texto da impressão automática",
                "status": "Nova",
                "id": 23664,
                "assigned_to": {
                    "id": 24,
                    "name": "Augusto Alves"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23619",
                "subject": "RELATORIO DE PRODUTOS",
                "status": "Nova",
                "id": 23619,
                "assigned_to": {
                    "id": 273,
                    "name": "Maurício  da Silva Souza"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 392,
                    "name": "Pede no Bairro"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23670",
                "subject": "Atualizar achelocal",
                "status": "Nova",
                "id": 23670,
                "assigned_to": {
                    "id": 338,
                    "name": "Lucas Sousa"
                },
                "tracker": {
                    "id": 3,
                    "name": "Suporte"
                },
                "priority": "Normal",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23671",
                "subject": "Atualizar Ajudaai",
                "status": "Nova",
                "id": 23671,
                "assigned_to": {
                    "id": 338,
                    "name": "Lucas Sousa"
                },
                "tracker": {
                    "id": 3,
                    "name": "Suporte"
                },
                "priority": "Normal",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23566",
                "subject": "[Molde] - Configuração da plataforma",
                "status": "Em andamento",
                "id": 23566,
                "assigned_to": {
                    "id": 338,
                    "name": "Lucas Sousa"
                },
                "tracker": {
                    "id": 3,
                    "name": "Suporte"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23659",
                "subject": "[Molde - pizza point ] - Importar base de usuários",
                "status": "Em andamento",
                "id": 23659,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23405",
                "subject": "Atualizar demomarketplace",
                "status": "Em andamento",
                "id": 23405,
                "assigned_to": {
                    "id": 338,
                    "name": "Lucas Sousa"
                },
                "tracker": {
                    "id": 3,
                    "name": "Suporte"
                },
                "priority": "Normal",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23337",
                "subject": "Permitir criar entrega para motoboy próprio",
                "status": "Em andamento",
                "id": 23337,
                "assigned_to": {
                    "id": 24,
                    "name": "Augusto Alves"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Normal",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23586",
                "subject": "Atualizar puppy",
                "status": "Pendente",
                "id": 23586,
                "assigned_to": {
                    "id": 338,
                    "name": "Lucas Sousa"
                },
                "tracker": {
                    "id": 3,
                    "name": "Suporte"
                },
                "priority": "Normal",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23032",
                "subject": "[APP] Splash inicia distorcido e sem logotipo correto",
                "status": "Resolvida",
                "id": 23032,
                "assigned_to": {
                    "id": 312,
                    "name": "Gabriel Viegas"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 480,
                    "name": "MariaMaria - Box"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23628",
                "subject": "(APP) Adicionar a opção de cadastrar um cartão na Sacola de compras ",
                "status": "Resolvida",
                "id": 23628,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Alta",
                "project": {
                    "id": 480,
                    "name": "MariaMaria - Box"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23602",
                "subject": "[molde] - Colocar na mesma ordem do carrinho do App deixar mais similar",
                "status": "Resolvida",
                "id": 23602,
                "assigned_to": {
                    "id": 273,
                    "name": "Maurício  da Silva Souza"
                },
                "tracker": {
                    "id": 10,
                    "name": "Ajuste"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23658",
                "subject": "[Loja] - Erro no cadastro do produto com adicional",
                "status": "Resolvida",
                "id": 23658,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23634",
                "subject": "[app] - Produto não habilitadado aparece na loja",
                "status": "Resolvida",
                "id": 23634,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23635",
                "subject": "[Molde] - Não mostra o modal de confirmação do pedido entregue",
                "status": "Resolvida",
                "id": 23635,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23547",
                "subject": "[Admin/loja] - Lista das avaliações da loja",
                "status": "Resolvida",
                "id": 23547,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 392,
                    "name": "Pede no Bairro"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/22615",
                "subject": "Criar uma notificação nova",
                "status": "Resolvida",
                "id": 22615,
                "assigned_to": {
                    "id": 379,
                    "name": "Wallace Souza"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Normal",
                "project": {
                    "id": 395,
                    "name": "Pidão Delivery"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23003",
                "subject": "[APP] - Autenticação a api via token",
                "status": "Resolvida",
                "id": 23003,
                "assigned_to": {
                    "id": 273,
                    "name": "Maurício  da Silva Souza"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Baixa",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23647",
                "subject": "[App] Notificações de status da entrega não está sendo enviada",
                "status": "Resolvida",
                "id": 23647,
                "assigned_to": {
                    "id": 338,
                    "name": "Lucas Sousa"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 47,
                    "name": "App Marketplace"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23663",
                "subject": "[ADMIN] Erro, é possivel excluir metodos de pagamento",
                "status": "Homologação",
                "id": 23663,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 480,
                    "name": "MariaMaria - Box"
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/22339",
                "subject": "Upload de Receita / Documentos no checkout",
                "status": "Reaberta",
                "id": 22339,
                "assigned_to": {
                    "id": 273,
                    "name": "Maurício  da Silva Souza"
                },
                "tracker": {
                    "id": 2,
                    "name": "Funcionalidade"
                },
                "priority": "Normal",
                "project": {
                    "id": 458,
                    "name": "Medicol "
                }
            },
            {
                "url": "https://redmine.codificar.com.br/issues/23595",
                "subject": "[App] - Load infinito ao adicionar endereço manualmente sem permissão",
                "status": "Reaberta",
                "id": 23595,
                "assigned_to": {
                    "id": 237,
                    "name": "Randler Ferraz Almeida"
                },
                "tracker": {
                    "id": 1,
                    "name": "Defeito"
                },
                "priority": "Normal",
                "project": {
                    "id": 457,
                    "name": "Molde"
                }
            }
        ]

        const trackers = distinctArrayObj({ arrayObj: issues, filter: 'tracker' })
        const assigneds = distinctArrayObj({ arrayObj: issues, filter: 'assigned_to' })
        const projects = distinctArrayObj({ arrayObj: issues, filter: 'project' })
            // console.log(issues.length)
        console.log({
            issues,
            trackers,
            assigneds,
            projects

        })

        res.json({
            issues,
            trackers,
            assigneds,
            projects

        })
    }
}