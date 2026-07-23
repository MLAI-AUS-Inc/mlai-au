import { describe, expect, test } from "bun:test";

import {
  getMonthlyUpdateReminderCompanyId,
  removeReminderCompanySelector,
  resolveMonthlyUpdateReminderCompany,
} from "../app/lib/monthly-update-reminder-link";

const user = {
  activeCompanyId: "company-a",
  companies: [
    { id: "company-a", name: "Alpha", registered: true },
    { id: "company-b", name: "Beta", registered: true },
  ],
};

describe("monthly-update reminder company links", () => {
  test("allows an owned company and reports whether it needs switching", () => {
    expect(resolveMonthlyUpdateReminderCompany(user, "company-b")).toEqual({
      status: "valid",
      company: user.companies[1],
      needsSwitch: true,
    });
    expect(resolveMonthlyUpdateReminderCompany(user, "company-a")).toEqual({
      status: "valid",
      company: user.companies[0],
      needsSwitch: false,
    });
  });

  test("rejects a company the signed-in founder does not own", () => {
    expect(resolveMonthlyUpdateReminderCompany(user, "someone-elses-company")).toEqual({
      status: "invalid",
    });
  });

  test("removes only the one-use company selector after resolution", () => {
    const url = new URL(
      "https://mlai.au/founder-tools/updates/create?companyId=company-b&source=monthly-update-reminder&reminder=seven_day",
    );

    expect(removeReminderCompanySelector(url)).toBe(
      "/founder-tools/updates/create?source=monthly-update-reminder&reminder=seven_day",
    );
  });

  test("only treats companyId as a selector on a reminder link", () => {
    expect(
      getMonthlyUpdateReminderCompanyId(
        new URL("https://mlai.au/founder-tools/updates/create?companyId=company-b"),
      ),
    ).toBeNull();
    expect(
      getMonthlyUpdateReminderCompanyId(
        new URL(
          "https://mlai.au/founder-tools/updates/create?companyId=company-b&source=monthly-update-reminder",
        ),
      ),
    ).toBe("company-b");
  });
});
