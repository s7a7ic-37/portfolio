import {test, expect} from "@playwright/test";

const evidenceLinks = {
  "depot-booking": [
    ["PostgreSQL API tests ↗", "https://github.com/s7a7ic-37/depot-booking/blob/3185bfc/tests/booking.test.mjs"],
    ["Mobile booking tests ↗", "https://github.com/s7a7ic-37/depot-booking/blob/3185bfc/web/tests/booking.spec.js"],
  ],
  "river-data-monitor": [
    ["Import tests ↗", "https://github.com/s7a7ic-37/river-data-monitor/blob/4c753cc/tests/test_monitor.py"],
    ["Report route tests ↗", "https://github.com/s7a7ic-37/river-data-monitor/blob/4c753cc/tests/worker.test.mjs"],
    ["Manual refresh run ↗", "https://github.com/s7a7ic-37/river-data-monitor/actions/runs/44913007482"],
  ],
  "webhook-delivery-lab": [
    ["Queue tests ↗", "https://github.com/s7a7ic-37/webhook-delivery-lab/blob/37f6926/tests/queue.test.mjs"],
    ["Storage tests ↗", "https://github.com/s7a7ic-37/webhook-delivery-lab/blob/37f6926/tests/session.test.mjs"],
  ],
  "document-search-lab": [
    ["Python evaluation tests ↗", "https://github.com/s7a7ic-37/document-search-lab/blob/59852d5/tests/test_evaluation.py"],
    ["Browser and Python parity tests ↗", "https://github.com/s7a7ic-37/document-search-lab/blob/59852d5/tests/search.test.mjs"],
  ],
  "release-check": [
    ["Release verdict tests ↗", "https://github.com/s7a7ic-37/release-check/blob/a284ff1/tests/report.test.mjs"],
    ["CI gate verification ↗", "https://github.com/s7a7ic-37/release-check/blob/a284ff1/.github/workflows/checks.yml"],
  ],
  "runbook-desk": [
    ["Database retry tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/10041c5/tests/test_creation_retries.py"],
    ["Review and deletion tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/10041c5/tests/test_workflow.py"],
    ["Handoff snapshot tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/10041c5/frontend/tests/report.test.ts"],
    ["CI run with Docker build ↗", "https://github.com/s7a7ic-37/runbook-desk/actions/runs/42485780784"],
    ["Live OpenAPI schema ↗", "https://runbook.artemislab.co.uk/api/openapi.json"],
  ],
  "pure-news": [
    ["Browser search and browsing tests ↗", "https://github.com/s7a7ic-37/pure-news/blob/0169cc1/tests/browser/browsing.spec.js"],
    ["Saved-story recovery tests ↗", "https://github.com/s7a7ic-37/pure-news/blob/0169cc1/tests/browser/reading-list.spec.js"],
    ["API search and validation tests ↗", "https://github.com/s7a7ic-37/pure-news-api/blob/e6c5273/__tests__/app.test.js"],
    ["API race regression test ↗", "https://github.com/s7a7ic-37/pure-news-api/blob/e3dc588/__tests__/comments.models.test.js"],
    ["Frontend CI run ↗", "https://github.com/s7a7ic-37/pure-news/actions/runs/42486961132"],
    ["API CI run ↗", "https://github.com/s7a7ic-37/pure-news-api/actions/runs/42480464240"],
  ],
  "grid-demand-lab": [
    ["Forecast and time-split tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/681b10d/tests/test_forecast.py"],
    ["Chart interaction tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/681b10d/tests/test_plotting.py"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/grid-demand-lab/actions/runs/42482666073"],
  ],
  "travel-planner": [
    ["Plan and transfer tests ↗", "https://github.com/s7a7ic-37/travel-planner/blob/3878358/travel-planner-fe/tests/demo.test.mjs"],
    ["Shared itinerary link tests ↗", "https://github.com/s7a7ic-37/travel-planner/blob/3878358/travel-planner-fe/tests/itinerary.test.mjs"],
    ["Planner browser regressions ↗", "https://github.com/s7a7ic-37/travel-planner/blob/3878358/travel-planner-fe/tests/browser/planner.spec.mjs"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/travel-planner/actions/runs/42485443867"],
  ],
  opslens: [
    ["Forecast validation tests ↗", "https://github.com/s7a7ic-37/ops-lens/blob/32a3610/tests/test_pipeline.py"],
    ["Dashboard helper tests ↗", "https://github.com/s7a7ic-37/ops-lens/blob/32a3610/web/helpers.test.mjs"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/ops-lens/actions/runs/42487304219"],
  ],
  "stockroom-reconcile": [
    ["Parser and export tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/92eeef0/public/tools/stockroom-reconciliation/reconcile.test.js"],
    ["Browser workflow tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/92eeef0/tests/browser/tool-flows.spec.js"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/portfolio/actions/runs/42486555076"],
  ],
  "contract-check": [
    ["Contract parser and limit tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/fdd14ed/public/tools/api-contract-checker/checker.test.js"],
    ["Browser workflow tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/fdd14ed/tests/browser/tool-flows.spec.js"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/portfolio/actions/runs/42486162846"],
  ],
};

for (const [slug, title] of [
  ["runbook-desk", "Runbook Desk"],
  ["pure-news", "Pure News"],
  ["depot-booking", "Depot Booking"],
  ["river-data-monitor", "River Data Monitor"],
  ["webhook-delivery-lab", "Webhook Delivery Lab"],
  ["document-search-lab", "Document Search Lab"],
  ["release-check", "Release Check"],
  ["grid-demand-lab", "Grid Demand Lab"],
  ["travel-planner", "Ready, Jet Set, Go!"],
  ["opslens", "OpsLens"],
  ["stockroom-reconcile", "Stockroom Reconcile"],
  ["contract-check", "Contract Check"],
]) {
  test(`${title} case study opens directly and returns to the project list`, async ({page}) => {
    const response = await page.goto(`/case-studies/${slug}/`);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", {name: title, exact: true})).toBeVisible();
    await expect(page).toHaveTitle(`${title} — project case study`);
    await expect(page.getByRole("heading", {name: "Limits and my contribution", exact: true})).toBeVisible();
    const implementations = page.getByRole("link", {name: "View code", exact: false});
    await expect(implementations).toHaveCount(["pure-news", "runbook-desk"].includes(slug) ? 4 : 3);
    for (const link of await implementations.all()) expect(await link.getAttribute("href")).toMatch(/^https:\/\/github\.com\/s7a7ic-37\//);
    for (const [name, href] of evidenceLinks[slug]) await expect(page.getByRole("link", {name, exact: true})).toHaveAttribute("href", href);
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({width, height: 900});
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.getByRole("link", {name: "All projects", exact: false}).first().click();
    await expect(page.locator("#projects .project-card")).toHaveCount(12);
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

test("published project cards link to their demos and source", async ({page}) => {
  await page.goto("/#projects");
  for (const [name, host, repo, label] of [
    ["River Data Monitor", "river", "river-data-monitor", "Open project"],
    ["Depot Booking", "depot", "depot-booking", "Browser demo"],
    ["Webhook Delivery Lab", "webhooks", "webhook-delivery-lab", "Open project"],
    ["Document Search Lab", "search-lab", "document-search-lab", "Open project"],
    ["Release Check", "release", "release-check", "Open project"],
  ]) {
    const card = page.locator(".project-card").filter({has: page.getByRole("heading", {name, exact: true})});
    await expect(card.getByRole("img", {name: name + " interface"})).toBeVisible();
    await expect(card.getByRole("link", {name: label + " ↗", exact: true})).toHaveAttribute("href", "https://" + host + ".artemislab.co.uk/");
    await expect(card.getByRole("link", {name: "Source ↗", exact: true})).toHaveAttribute("href", "https://github.com/s7a7ic-37/" + repo);
  }
});

test("project filters keep short lists accessible on a phone", async ({page}) => {
  await page.setViewportSize({width: 320, height: 850});
  await page.goto("/#projects");
  const filters = page.getByRole("group", {name: "Filter projects"});
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(12);
  for (const [filter, count, example] of [
    ["Data", 4, "River Data Monitor"],
    ["Applications", 5, "Depot Booking"],
    ["Developer tools", 3, "Release Check"],
    ["All", 12, "Pure News"],
  ]) {
    const button = filters.getByRole("button", {name: filter, exact: true});
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(filters.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(cards).toHaveCount(count);
    await expect(cards.getByRole("heading", {name: example, exact: true})).toBeVisible();
    expect(await page.evaluate(() => innerWidth === document.documentElement.scrollWidth)).toBe(true);
    expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
  }
});
