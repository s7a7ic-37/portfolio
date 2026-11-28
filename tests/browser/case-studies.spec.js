import {test, expect} from "@playwright/test";

const evidenceLinks = {
  "schema-rollout-lab": [
    ["Rollout tests ↗", "https://github.com/s7a7ic-37/schema-rollout-lab/blob/986f60c/tests/rollout.test.mjs"],
    ["PostgreSQL CI run ↗", "https://github.com/s7a7ic-37/schema-rollout-lab/actions/runs/46097680505"],
  ],
  "access-review-lab": [
    ["Policy tests ↗", "https://github.com/s7a7ic-37/access-review-lab/blob/e5c30ae/tests/policy.test.js"],
    ["Browser tests ↗", "https://github.com/s7a7ic-37/access-review-lab/blob/e5c30ae/tests/review.spec.js"],
    ["CI run ↗", "https://github.com/s7a7ic-37/access-review-lab/actions/runs/46094804379"],
  ],
  "query-plan-lab": [
    ["Plan and result tests ↗", "https://github.com/s7a7ic-37/query-plan-lab/blob/0461e6d/plan.test.mjs"],
    ["PostgreSQL CI run ↗", "https://github.com/s7a7ic-37/query-plan-lab/actions/runs/46096719510"],
  ],
  "trace-timeline": [
    ["Parser and SDK export tests ↗", "https://github.com/s7a7ic-37/trace-timeline/blob/3469a86/tests/trace.test.mjs"],
    ["SDK-generated sample ↗", "https://github.com/s7a7ic-37/trace-timeline/blob/3469a86/tests/fixtures/sdk-export.json"],
    ["CI run ↗", "https://github.com/s7a7ic-37/trace-timeline/actions/runs/46096045854"],
  ],
  "depot-booking": [
    ["PostgreSQL API tests ↗", "https://github.com/s7a7ic-37/depot-booking/blob/978ec50/tests/booking.test.mjs"],
    ["Mobile booking tests ↗", "https://github.com/s7a7ic-37/depot-booking/blob/978ec50/web/tests/booking.spec.js"],
    ["PostgreSQL browser check ↗", "https://github.com/s7a7ic-37/depot-booking/blob/6ad72bf/web/tests/live-booking.mjs"],
    ["Docker CI run ↗", "https://github.com/s7a7ic-37/depot-booking/actions/runs/46095713716"],
  ],
  "river-data-monitor": [
    ["Import tests ↗", "https://github.com/s7a7ic-37/river-data-monitor/blob/2e5006d/tests/test_monitor.py"],
    ["Report route tests ↗", "https://github.com/s7a7ic-37/river-data-monitor/blob/2e5006d/tests/worker.test.mjs"],
    ["Scheduled refresh run ↗", "https://github.com/s7a7ic-37/river-data-monitor/actions/runs/46078872348"],
  ],
  "webhook-delivery-lab": [
    ["Queue tests ↗", "https://github.com/s7a7ic-37/webhook-delivery-lab/blob/a59d666/tests/queue.test.mjs"],
    ["Storage tests ↗", "https://github.com/s7a7ic-37/webhook-delivery-lab/blob/a59d666/tests/session.test.mjs"],
  ],
  "document-search-lab": [
    ["Python evaluation tests ↗", "https://github.com/s7a7ic-37/document-search-lab/blob/59852d5/tests/test_evaluation.py"],
    ["Browser and Python parity tests ↗", "https://github.com/s7a7ic-37/document-search-lab/blob/59852d5/tests/search.test.mjs"],
  ],
  "release-check": [
    ["Release verdict tests ↗", "https://github.com/s7a7ic-37/release-check/blob/b4d34c3/tests/report.test.mjs"],
    ["Evidence file checks ↗", "https://github.com/s7a7ic-37/release-check/blob/b4d34c3/tests/evidence.mjs"],
    ["CI gate verification ↗", "https://github.com/s7a7ic-37/release-check/actions/runs/46098816571"],
  ],
  "runbook-desk": [
    ["Database retry tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/ac3f6e8/tests/test_creation_retries.py"],
    ["Review and deletion tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/ac3f6e8/tests/test_workflow.py"],
    ["Handoff snapshot tests ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/ac3f6e8/frontend/tests/report.test.ts"],
    ["CI run with Docker build ↗", "https://github.com/s7a7ic-37/runbook-desk/actions/runs/44929722511"],
    ["API routes ↗", "https://github.com/s7a7ic-37/runbook-desk/blob/ac3f6e8/server/main.py"],
  ],
  "pure-news": [
    ["Browser search and browsing tests ↗", "https://github.com/s7a7ic-37/pure-news/blob/d6538ca/tests/browser/browsing.spec.js"],
    ["Saved-story recovery tests ↗", "https://github.com/s7a7ic-37/pure-news/blob/d6538ca/tests/browser/reading-list.spec.js"],
    ["API search and validation tests ↗", "https://github.com/s7a7ic-37/pure-news-api/blob/e6c5273/__tests__/app.test.js"],
    ["API race regression test ↗", "https://github.com/s7a7ic-37/pure-news-api/blob/e3dc588/__tests__/comments.models.test.js"],
    ["Frontend CI run ↗", "https://github.com/s7a7ic-37/pure-news/actions/runs/44930298551"],
    ["API CI run ↗", "https://github.com/s7a7ic-37/pure-news-api/actions/runs/42480464240"],
  ],
  "grid-demand-lab": [
    ["Forecast and time-split tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/9dae547/tests/test_forecast.py"],
    ["Chart interaction tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/9dae547/tests/test_plotting.py"],
    ["Refresh recovery tests ↗", "https://github.com/s7a7ic-37/grid-demand-lab/blob/9dae547/tests/test_refresh.py"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/grid-demand-lab/actions/runs/44928444802"],
  ],
  "travel-planner": [
    ["Plan and transfer tests ↗", "https://github.com/s7a7ic-37/travel-planner/blob/d982b6c/travel-planner-fe/tests/demo.test.mjs"],
    ["Shared itinerary link tests ↗", "https://github.com/s7a7ic-37/travel-planner/blob/d982b6c/travel-planner-fe/tests/itinerary.test.mjs"],
    ["Planner browser regressions ↗", "https://github.com/s7a7ic-37/travel-planner/blob/d982b6c/travel-planner-fe/tests/browser/planner.spec.mjs"],
    ["Green CI run ↗", "https://github.com/s7a7ic-37/travel-planner/actions/runs/44925081929"],
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
    ["Contract parser and limit tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/847f216/public/tools/api-contract-checker/checker.test.js"],
    ["Browser workflow tests ↗", "https://github.com/s7a7ic-37/portfolio/blob/847f216/tests/browser/tool-flows.spec.js"],
  ],
};

for (const [slug, title] of [
  ["runbook-desk", "Runbook Desk"],
  ["pure-news", "Pure News"],
  ["depot-booking", "Depot Booking"],
  ["river-data-monitor", "River Data Monitor"],
  ["access-review-lab", "Access Review Lab"],
  ["webhook-delivery-lab", "Webhook Delivery Lab"],
  ["trace-timeline", "Trace Timeline"],
  ["query-plan-lab", "Query Plan Lab"],
  ["schema-rollout-lab", "Schema Rollout Lab"],
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
    await expect(page.locator("#projects .project-card")).toHaveCount(16);
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
    ["Access Review Lab", "access-review", "access-review-lab", "Open project"],
    ["Depot Booking", "depot", "depot-booking", "Browser demo"],
    ["Webhook Delivery Lab", "webhooks", "webhook-delivery-lab", "Open project"],
    ["Trace Timeline", "traces", "trace-timeline", "Open project"],
    ["Query Plan Lab", "plans", "query-plan-lab", "Open project"],
    ["Schema Rollout Lab", "migrations", "schema-rollout-lab", "Open project"],
    ["Grid Demand Lab", "grid", "grid-demand-lab", "Open project"],
    ["Document Search Lab", "search-lab", "document-search-lab", "Open project"],
    ["Release Check", "release", "release-check", "Open project"],
  ]) {
    const card = page.locator(".project-card").filter({has: page.getByRole("heading", {name, exact: true})});
    const image = card.getByRole("img", {name: name + " interface"});
    await expect(image).toBeVisible();
    await image.scrollIntoViewIfNeeded();
    expect(await image.evaluate(async (preview) => { await preview.decode(); return preview.naturalWidth; })).toBeGreaterThan(0);
    await expect(card.getByRole("link", {name: label + " ↗", exact: true})).toHaveAttribute("href", "https://" + host + ".artemislab.co.uk/");
    await expect(card.getByRole("link", {name: "Source ↗", exact: true})).toHaveAttribute("href", "https://github.com/s7a7ic-37/" + repo);
  }
});

test("project filters keep short lists accessible on a phone", async ({page}) => {
  await page.setViewportSize({width: 320, height: 850});
  await page.goto("/#projects");
  const filters = page.getByRole("group", {name: "Filter projects"});
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(16);
  for (const [filter, count, example] of [
    ["Data", 4, "River Data Monitor"],
    ["Applications", 5, "Depot Booking"],
    ["Developer tools", 7, "Schema Rollout Lab"],
    ["All", 16, "Pure News"],
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

test("a chosen project filter survives refresh and opening a case study", async ({page}) => {
  await page.goto("/#projects");
  const filters = page.getByRole("group", {name: "Filter projects"});
  const tools = filters.getByRole("button", {name: "Developer tools", exact: true});
  const cards = page.locator(".project-card");
  await tools.click();
  await expect(cards).toHaveCount(7);
  expect(new URL(page.url()).searchParams.get("projects")).toBe("Developer tools");
  await page.reload();
  await expect(tools).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(7);

  await cards.filter({has: page.getByRole("heading", {name: "Trace Timeline", exact: true})})
    .getByRole("link", {name: "Case study ↗", exact: true}).click();
  await expect(page.getByRole("heading", {name: "Trace Timeline", exact: true})).toBeVisible();
  await page.goBack();
  await expect(tools).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(7);

  await filters.getByRole("button", {name: "All", exact: true}).click();
  expect(new URL(page.url()).searchParams.has("projects")).toBe(false);
  await expect(cards).toHaveCount(16);
  await page.goto("/?projects=unknown#projects");
  await expect(cards).toHaveCount(16);
});
