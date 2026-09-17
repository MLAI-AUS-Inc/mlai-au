import { describe, test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { parseCustomerSuggestions } from "../app/lib/customer-profile-suggestions";
import { normalizeWrittenTopic } from "../app/lib/vibe-marketing";
import { catalogEditFromForm, type EditorialCatalog } from "../app/lib/editorial-catalog";
import ArticleAudienceDetails from "../app/components/ArticleAudienceDetails";

const empty: EditorialCatalog={audience_options:[],cta_options:[],editorial_catalog_version:0,review_entries:[]};
const form=(values:Record<string,string>)=>{const f=new FormData();for(const [k,v] of Object.entries(values))f.set(k,v);return f;};

describe("customer profiles",()=>{
 test("manual profile preserves rich inputs behind a stable ID",()=>{
  const payload=catalogEditFromForm(form({expectedEditorialCatalogVersion:"0",kind:"audience",entryId:"icp-1",entryVersion:"0",readerTask:"Reduce chasing",profileName:"Firm owners",profileDescription:"Owner with a small team",painPoints:"Chasing documents\nSlow handoffs",desiredOutcomes:"Faster turnaround",knowledgeLevel:"beginner"}),empty);
  expect(payload.audience_options[0]).toMatchObject({id:"icp-1",name:"Firm owners",catalog_schema_version:2,status:"draft",approved_by:null,pain_points:["Chasing documents","Slow handoffs"]});
 });
 test("a suggestion cannot transfer to a second company domain",()=>{
  const raw={schemaVersion:1,domain:"example.com",researchRunId:"scan-1",profiles:[{id:"one",name:"Owners",description:"Small firm",reader_task:"Choose",source_urls:["https://example.com/","javascript:alert(1)"]}]};
  expect(parseCustomerSuggestions(raw,"other.example")).toBeNull();
  expect(parseCustomerSuggestions(raw,"https://example.com")?.profiles[0].source_urls).toEqual(["https://example.com/"]);
 });
 test("saved article uses historical profile and action without consulting catalogue",()=>{
  const snapshot={schema_version:1,writing_run_id:"writing-1",recorded_at:"2026-09-16",provenance_status:"recorded",brief:{audience_id:"owner",audience_version:2,offer_id:"demo",offer_version:1,conversion_intent:"offer",country:"AU",reader_task:"Compare workflows",distinct_contribution:"Worked comparison"},admission:{audience:{name:"Original owners",description:"Original reader"},offer:{title:"Demo",button_href:"/original-demo",action_description:"Book a demo"}}};
  const article=normalizeWrittenTopic({title:"Workflow",keyword:"workflow",audience_id:"owner",editorial_snapshot:snapshot});
  expect(article?.editorialSnapshot?.writing_run_id).toBe("writing-1");
  const html=renderToStaticMarkup(<ArticleAudienceDetails snapshot={article?.editorialSnapshot}/>);
  expect(html).toContain("Original owners");expect(html).toContain("/original-demo");expect(html).toContain("Profile v2");
 });
 test("missing historical decision remains visibly unknown",()=>{
  expect(renderToStaticMarkup(<ArticleAudienceDetails />)).toContain("not recorded");
 });
});
