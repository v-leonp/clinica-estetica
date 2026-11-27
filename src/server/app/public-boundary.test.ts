import { describe, expect, it } from "vitest";

import robots from "~/app/robots";
import sitemap from "~/app/sitemap";
import { nav } from "~/data/content";

describe("el sitio público no anuncia el área interna", () => {
  it("el menú no enlaza /app", () => {
    expect(nav.some((item) => item.href.startsWith("/app"))).toBe(false);
  });

  it("robots oculta /app y el sitemap no la publica", () => {
    const rules = robots().rules;
    const list = Array.isArray(rules) ? rules : [rules];
    const disallow = list.flatMap((rule) =>
      Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : [],
    );
    expect(disallow).toContain("/app/");
    expect(sitemap().every((entry) => !entry.url.includes("/app"))).toBe(true);
  });
});