import type { CaseStudyKey } from "./studyData";

export const caseStudies: Record<string, `/case-studies/${CaseStudyKey}/`> = {
  "Depot Booking": "/case-studies/depot-booking/",
  "River Data Monitor": "/case-studies/river-data-monitor/",
  "Webhook Delivery Lab": "/case-studies/webhook-delivery-lab/",
  "Document Search Lab": "/case-studies/document-search-lab/",
  "Release Check": "/case-studies/release-check/",
  "Trace Timeline": "/case-studies/trace-timeline/",
  "Runbook Desk": "/case-studies/runbook-desk/",
  "Pure News": "/case-studies/pure-news/",
  "Grid Demand Lab": "/case-studies/grid-demand-lab/",
  "Ready, Jet Set, Go!": "/case-studies/travel-planner/",
  OpsLens: "/case-studies/opslens/",
  "Stockroom Reconcile": "/case-studies/stockroom-reconcile/",
  "Contract Check": "/case-studies/contract-check/",
};

export function isCaseStudyKey(key: string): key is CaseStudyKey {
  return Object.values(caseStudies).some(path => path === `/case-studies/${key}/`);
}
