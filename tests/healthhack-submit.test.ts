import { describe, expect, test } from "bun:test";

const SUBMIT_ROUTE = "app/routes/hospital.app.submit.tsx";
const RETIRED_BREAKDOWN = "app/components/hospital/First100RowsTable.tsx";

describe("HealthHack submission feedback", () => {
  test("keeps the useful analytics without rendering the first 100 rows breakdown", async () => {
    const source = await Bun.file(SUBMIT_ROUTE).text();

    expect(source).toContain("ClinicalMetricsPanel");
    expect(source).toContain("MissedCrisesAlert");
    expect(source).toContain("ClassAccuracyBars");
    expect(source).toContain("ConfusionMatrixHeatmap");
    expect(source).not.toContain("First100RowsTable");
    expect(source).not.toContain("first_100_public");
    expect(await Bun.file(RETIRED_BREAKDOWN).exists()).toBe(false);
  });
});
