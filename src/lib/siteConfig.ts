import { getEntry } from "astro:content";

export interface TelefoneOficial {
  nome: string;
  numero: string;
}

export interface SiteContact {
  whatsappLink: string;
  whatsappLabel: string;
  telefonesOficiais: TelefoneOficial[];
  linkInstagram: string;
  linkFacebook: string;
  linkLinkedin: string;
}

export async function getSiteContact(): Promise<SiteContact> {
  try {
    const contatoData = await getEntry("contatos", "contato");
    if (contatoData && contatoData.data) {
      const { 
        telefone_principal, 
        label_whatsapp, 
        telefones_oficiais,
        link_instagram,
        link_facebook,
        link_linkedin
      } = contatoData.data;
      const cleanPhone = telefone_principal.replace(/\D/g, "");
      return {
        whatsappLink: `https://wa.me/${cleanPhone}`,
        whatsappLabel: label_whatsapp,
        telefonesOficiais: telefones_oficiais || [],
        linkInstagram: link_instagram || "https://www.instagram.com/jkadvogados/",
        linkFacebook: link_facebook || "https://www.facebook.com/JulioSantAnnaAdvogados",
        linkLinkedin: link_linkedin || "#",
      };
    }
  } catch (e) {
    console.error("Erro ao carregar configurações de contato:", e);
  }
  
  // Valores padrão de backup (fallback) se a coleção ainda não estiver gerada ou falhar
  return {
    whatsappLink: "https://wa.me/5551991177031",
    whatsappLabel: "(51) 99117-7031",
    telefonesOficiais: [
      { nome: "Dr. Júlio", numero: "(51) 99117-7031" },
      { nome: "Dra. Kassiane", numero: "(51) 99652-7575" },
      { nome: "WhatsApp Escritório", numero: "(51) 9439-5639" },
      { nome: "Telefone Fixo", numero: "(51) 3662-7032" }
    ],
    linkInstagram: "https://www.instagram.com/jkadvogados/",
    linkFacebook: "https://www.facebook.com/JulioSantAnnaAdvogados",
    linkLinkedin: "#",
  };
}
