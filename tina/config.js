import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "Site-Instucional-Advocacia-JK",
  },
  media: {
    tina: {
      mediaRoot: "src/assets",
      publicFolder: "public",
    },
  },
  publicFolder: "public",
  schema: {
    collections: [
      {
        name: "artigos",
        label: "Artigos",
        path: "src/content/artigos",
        format: "md",
        defaultItem: () => {
          return {
            data: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "data",
            label: "Data de Publicação",
            required: true,
            ui: {
              dateFormat: "DD MMM YYYY",
            },
          },
          { type: "image", name: "capa", label: "Imagem de Capa" }, // Novo campo de imagem
          {
            type: "string",
            name: "slug_personalizado",
            label: "URL do Botão (Ex: meu-artigo-novo)",
          }, // Novo campo de URL
          {
            type: "string",
            name: "resumo",
            label: "Resumo",
            ui: { component: "textarea" },
          },
          { type: "string", name: "autor", label: "Autor" },
          {
            type: "string",
            name: "link_referencia",
            label: "Links de Referência / Fontes (Opcional)",
            description: "Lista de links/URLs utilizados como fonte ou referência para este artigo (ajuda a evitar problemas de plágio).",
            list: true,
          },
          { type: "rich-text", name: "body", label: "Conteúdo", isBody: true },
        ],
      },
      {
        name: "noticias",
        label: "Notícias",
        path: "src/content/noticias",
        format: "md",
        defaultItem: () => {
          return {
            data: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "data",
            label: "Data da Notícia",
            required: true, // Torna obrigatório para forçar o preenchimento
            ui: {
              dateFormat: "DD MMM YYYY",
            },
          },
          {
            type: "string",
            name: "resumo",
            label: "Resumo",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "link_externo",
            label: "Redirecionamento para Link Externo (Opcional)",
            description: "ATENÇÃO: Se preenchido, o botão levará DIRETAMENTE para este link externo (ex: site externo da OAB, TJ, etc) e NÃO será gerada uma página interna no site JK.",
          },
          {
            type: "string",
            name: "link_referencia",
            label: "Links de Referência / Fontes (Opcional)",
            description: "Lista de links/URLs de fontes utilizadas para esta notícia. Serão mostrados no rodapé da página interna da notícia.",
            list: true,
          },
          { type: "rich-text", name: "body", label: "Conteúdo", isBody: true },
        ],
      },
      {
        name: "equipe",
        label: "Equipe",
        path: "src/content/equipe",
        format: "md",
        fields: [
          {
            type: "string",
            name: "nome",
            label: "Nome Completo",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "cargo", label: "Cargo e OAB" },
          { type: "image", name: "foto", label: "Foto de Perfil" },
          {
            type: "string",
            name: "resumo",
            label: "Resumo (para a lista)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "textos",
            label: "Bio Completa (Parágrafos)",
            list: true, // Permite adicionar vários parágrafos individualmente
          },
          { type: "number", name: "ordem", label: "Ordem de Exibição" },
        ],
      },
      {
        name: "contatos",
        label: "Configurações de Contato",
        path: "src/content/contatos",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "telefone_principal",
            label: "WhatsApp Principal - Apenas Números (Ex: 5551991177031)",
            description: "Este número será usado para gerar automaticamente o link da API do WhatsApp do site (wa.me/número).",
            required: true,
          },
          {
            type: "string",
            name: "label_whatsapp",
            label: "Texto de Exibição do WhatsApp (Ex: (51) 99117-7031)",
            description: "Texto que aparecerá como rótulo ou número visível do WhatsApp principal.",
            required: true,
          },
          {
            type: "object",
            name: "telefones_oficiais",
            label: "Lista de Telefones Oficiais (Para aviso de golpe e rodapé)",
            description: "Adicione todos os telefones oficiais do escritório para exibir no modal de segurança contra golpe e no rodapé.",
            list: true,
            fields: [
              { type: "string", name: "nome", label: "Identificação (Ex: WhatsApp Dr. Júlio, Fixo)" },
              { type: "string", name: "numero", label: "Número Formatado (Ex: (51) 99117-7031)" },
            ],
          },
          {
            type: "object",
            name: "escritorios",
            label: "Nossos Escritórios",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.nome || "Novo Escritório" }
              },
            },
            fields: [
              { type: "string", name: "nome", label: "Nome do Escritório", required: true },
              { type: "image", name: "imagem", label: "Foto do Escritório" },
              { type: "string", name: "endereco", label: "Endereço Completo", ui: { component: "textarea" } },
              { type: "string", name: "horario", label: "Horário de Funcionamento" },
              { type: "string", name: "link_maps", label: "Link do Google Maps" },
            ],
          },
          {
            type: "string",
            name: "demais_locais",
            label: "Atendimento em Demais Locais (Tags)",
            list: true,
          },
          {
            type: "string",
            name: "link_instagram",
            label: "Link do Instagram",
          },
          {
            type: "string",
            name: "link_facebook",
            label: "Link do Facebook",
          },
          {
            type: "string",
            name: "link_linkedin",
            label: "Link do LinkedIn",
          },
        ],
      },
    ],
  },
});
  