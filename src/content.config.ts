// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const artigos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/artigos" }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    autor: z.string(),
    capa: z.string().optional(),
    slug_personalizado: z.string().optional(),
    link_referencia: z.array(z.string()).optional(),
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/noticias" }),
  schema: z.object({
    titulo: z.string(),
    data: z.date(), // O Tina envia como data, o Astro converte
    resumo: z.string(),
    link_externo: z.string().optional(),
    link_referencia: z.array(z.string()).optional(),
  }),
});

const equipe = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/equipe" }),
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    foto: z.string().optional(),
    resumo: z.string(),
    textos: z.array(z.string()), // Define como uma lista de strings
    ordem: z.number().default(99),
  }),
});

const contatos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/contatos" }),
  schema: z.object({
    titulo: z.string(),
    telefone_principal: z.string(),
    label_whatsapp: z.string(),
    telefones_oficiais: z.array(
      z.object({
        nome: z.string(),
        numero: z.string(),
      })
    ),
  }),
});

export const collections = { artigos, noticias, equipe, contatos };
