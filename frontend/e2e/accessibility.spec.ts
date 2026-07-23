import { test, expect } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

const PUBLIC_PAGES = ["/en", "/en/notifications"];

test.describe("accessibility audit", () => {
  for (const path of PUBLIC_PAGES) {
    test(`${path} has no detectable axe violations`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
      await injectAxe(page);
      await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
    });
  }
});