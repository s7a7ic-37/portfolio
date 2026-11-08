import {test, expect} from "@playwright/test";

const evidenceLinks = {
  "runbook-desk": [
    ["Database retry tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/c984692/tests/test_creation_retries.py"],
    ["CI run with Docker build ↗", "https://github.com/s7a7ic-37/runbook-desk/actions/runs/42433452124"],
  ],
  "pure-news": [
    ["Browser search and browsing tests ↗", "https://github.com/s7a7ic-37/pure-news/blob/236b0f1/tests/browser/browsing.spec.js"],
    ["API search and validation tests ↗", "https://github.com/s7a7ic-37/pure-news-api/blob/2e3e12b/__tests__/app.test.js"],
    ["API race regression test ↗", "https://github.com/s7a7ic-37/pure-news-api/blob/e3dc588/__tests__/comments.models.test.js"],
    ["Frontend CI run ↗", "https://github.com/s7a7ic-37/pure-news/actions/runs/42469313012"],
    ["API CI run ↗", "https://github.com/s7a7ic-37/pure-news-api/actions/runs/42469060995"],
  ],
  "grid-demand-lab": [
    ["Forecast and time-split tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/12d1126/tests/test_forecast.py"],
    ["Chart interaction tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/12d1126/tests/test_plotting.py"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/grid-demand-lab/actions/runs/42434684384"],
  ],
  "travel-planner": [
    ["Plan and transfer tests ↗", "https://github.com/s7a7ic-37/travel-planner/blob/22454bf/travel-planner-fe/tests/demo.test.mjs"],
    ["Shared itinerary link tests ↗", "https://github.com/s7a7ic-37/travel-planner/blob/22454bf/travel-planner-fe/tests/itinerary.test.mjs"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/travel-planner/actions/runs/42416623963"],
  ],
  opslens: [
    ["Forecast validation tests ↗", "https://github.com/s7a7ic-37/ops-lens/blob/04feeda/tests/test_pipeline.py"],
    ["Dashboard helper tests ↗", "https://github.com/s7a7ic-37/ops-lens/blob/04feeda/web/helpers.test.mjs"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/ops-lens/actions/runs/42465716125"],
  ],
  "stockroom-reconcile": [
    ["Parser and export tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/bf35c92/public/tools/stockroom-reconciliation/reconcile.test.js"],
    ["Browser workflow tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/bf35c92/tests/browser/tool-flows.spec.js"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/portfolio/actions/runs/42466718145"],
  ],
  "contract-check": [
    ["Contract parser and limit tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/3b7d47c/public/tools/api-contract-checker/checker.test.js"],
    ["Browser workflow tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/3b7d47c/tests/browser/tool-flows.spec.js"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/portfolio/actions/runs/42473574995"],
  ],
};

for (const [slug, title] of [["runbook-desk", "Runbook Desk"], ["pure-news", "Pure News"], ["grid-demand-lab", "Grid Demand Lab"], ["travel-planner", "Ready, Jet Set, Go!"], ["opslens", "OpsLens"], ["stockroom-reconcile", "Stockroom Reconcile"], ["contract-check", "Contract Check"]]) {
  test(`${title} case study opens directly and returns to the project list`, async ({page}) => {
    const response = await page.goto(`/case-studies/${slug}/`);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", {name: title, exact: true})).toBeVisible();
    await expect(page).toHaveTitle(`${title} — project case study`);
    await expect(page.getByRole("heading", {name: "Boundaries and contribution", exact: true})).toBeVisible();
    const implementations = page.getByRole("link", {name: "Inspect the implementation", exact: false});
    await expect(implementations).toHaveCount(slug === "pure-news" ? 4 : 3);
    for (const link of await implementations.all()) expect(await link.getAttribute("href")).toMatch(/^https:\/\/github\.com\/s7a7ic-37\//);
    for (const [name, href] of evidenceLinks[slug]) await expect(page.getByRole("link", {name, exact: true})).toHaveAttribute("href", href);
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({width, height: 900});
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
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
