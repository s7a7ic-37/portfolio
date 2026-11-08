import {test, expect} from "@playwright/test";

for (const [slug, title] of [["runbook-desk", "Runbook Desk"], ["pure-news", "Pure News"]]) {
  test(`${title} case study opens directly and returns to the project list`, async ({page}) => {
    const response = await page.goto(`/case-studies/${slug}/`);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", {name: title, exact: true})).toBeVisible();
    await expect(page).toHaveTitle(`${title} — project case study`);
    await expect(page.getByRole("heading", {name: "Boundaries and contribution", exact: true})).toBeVisible();
    const implementations = page.getByRole("link", {name: "Inspect the implementation", exact: false});
    await expect(implementations).toHaveCount(3);
    for (const link of await implementations.all()) expect(await link.getAttribute("href")).toMatch(/^https:\/\/github\.com\/s7a7ic-37\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("link", {name: "All projects", exact: false}).first().click();
    await expect(page.locator("#projects .project-card")).toHaveCount(7);
    await expect(page.locator(`a[href="/case-studies/${slug}/"]`)).toBeVisible();
  });
  test(`${title} skip link reaches the main content with a keyboard`, async ({page, browserName}) => {
    test.skip(browserName === "webkit" && process.platform === "win32", "Windows headless WebKit remains unfocused and ignores Tab even in a plain HTML control.");
    await page.goto(`/case-studies/${slug}/`);
    await expect(page.getByRole("heading", {name: title, exact: true})).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", {name: "Skip to case study", exact: true})).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#case-content")).toBeFocused();
  });
}
