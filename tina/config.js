import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "src/assets",
      publicFolder: "public",
    },
  },
  publicFolder: "public",
  basePath: "Site-Instucional-Advocacia-JK",
  schema: {
    collections: [
      {
        name: "artigos",
        label: "Artigos",
        path: "src/content/artigos",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            isTitle: true,
            required: true,
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
          { type: "rich-text", name: "body", label: "Conteúdo", isBody: true },
        ],
      },
      {
        name: "noticias",
        label: "Notícias",
        path: "src/content/noticias",
        format: "md",
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
              // Isso preenche o campo com a data atual automaticamente no painel
              defaultValue: new Date().toISOString(),
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
            label: "Link da Notícia (Opcional)",
          },
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
    ],
  },
});
  