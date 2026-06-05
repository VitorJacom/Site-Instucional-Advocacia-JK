import { describe, it, expect, vi, beforeEach } from "vitest";
import { getSiteContact } from "./siteConfig";
import { getEntry } from "astro:content";

// Mock the astro:content module
vi.mock("astro:content", () => {
  return {
    getEntry: vi.fn(),
  };
});

describe("getSiteContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return dynamic values when content is loaded successfully", async () => {
    // Mock getEntry to resolve with custom contact data
    vi.mocked(getEntry).mockResolvedValue({
      id: "contato",
      collection: "contatos",
      data: {
        titulo: "Test Contato",
        telefone_principal: "5551988887777",
        label_whatsapp: "(51) 98888-7777",
        telefones_oficiais: [
          { nome: "Official 1", numero: "(51) 1111-2222" }
        ],
        link_instagram: "https://instagram.com/test",
        link_facebook: "https://facebook.com/test",
        link_linkedin: "https://linkedin.com/test",
      }
    } as any);

    const result = await getSiteContact();

    expect(getEntry).toHaveBeenCalledWith("contatos", "contato");
    expect(result.whatsappLink).toBe("https://wa.me/5551988887777");
    expect(result.whatsappLabel).toBe("(51) 98888-7777");
    expect(result.telefonesOficiais).toEqual([
      { nome: "Official 1", numero: "(51) 1111-2222" }
    ]);
    expect(result.linkInstagram).toBe("https://instagram.com/test");
    expect(result.linkFacebook).toBe("https://facebook.com/test");
    expect(result.linkLinkedin).toBe("https://linkedin.com/test");
  });

  it("should fall back to default configurations when getEntry fails or throws", async () => {
    // Mock getEntry to reject (simulate an error)
    vi.mocked(getEntry).mockRejectedValue(new Error("Database offline"));

    const result = await getSiteContact();

    expect(getEntry).toHaveBeenCalledWith("contatos", "contato");
    expect(result.whatsappLink).toBe("https://wa.me/5551991177031");
    expect(result.whatsappLabel).toBe("(51) 99117-7031");
    expect(result.telefonesOficiais).toHaveLength(4);
    expect(result.linkInstagram).toBe("https://www.instagram.com/jkadvogados/");
    expect(result.linkFacebook).toBe("https://www.facebook.com/JulioSantAnnaAdvogados");
    expect(result.linkLinkedin).toBe("#");
  });

  it("should fall back to defaults when getEntry returns null/undefined data", async () => {
    vi.mocked(getEntry).mockResolvedValue(null as any);

    const result = await getSiteContact();

    expect(result.whatsappLink).toBe("https://wa.me/5551991177031");
    expect(result.linkFacebook).toBe("https://www.facebook.com/JulioSantAnnaAdvogados");
  });
});
