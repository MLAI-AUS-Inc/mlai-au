import type { User } from "~/types/user";

export type VibeRaisingRole = "founder" | "investor";

export interface VibeRaisingCompany {
  id: string;
  name: string;
  domain?: string | null;
  abn?: string | null;
  registered: boolean;
}

export interface VibeRaisingProfile {
  role: VibeRaisingRole;
  organizationName?: string | null;
  companies: VibeRaisingCompany[];
  activeCompanyId?: string | null;
}

export interface VibeRaisingAppUser {
  authUser: User;
  profile: VibeRaisingProfile;
  fullName: string;
  email: string;
  role: VibeRaisingRole;
  organizationName?: string | null;
  companies: VibeRaisingCompany[];
  activeCompanyId?: string | null;
  companyName: string;
  domain?: string | null;
  abn?: string | null;
  companyRegistered: boolean;
}
