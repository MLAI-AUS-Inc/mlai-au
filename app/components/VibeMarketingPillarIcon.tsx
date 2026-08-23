import type { LucideIcon, LucideProps } from "lucide-react";
import {
  BarChart3,
  Brain,
  Globe,
  Leaf,
  Rocket,
  Shield,
  Sparkles,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

// Mirrors ISLAND_ICON_KEYS in mlai-backend `content_factory/content_islands.py`, which is
// the source of truth. Anything outside the set falls back to Sparkles — a generated key
// must never be able to crash the dashboard.
const PILLAR_ICONS: Record<string, LucideIcon> = {
  brain: Brain,
  community: UsersRound,
  rocket: Rocket,
  tools: Wrench,
  chart: BarChart3,
  globe: Globe,
  shield: Shield,
  leaf: Leaf,
  bolt: Zap,
  default: Sparkles,
};

export function PillarIcon({
  iconKey,
  ...props
}: LucideProps & { iconKey: string | null | undefined }) {
  const Icon = (iconKey ? PILLAR_ICONS[iconKey] : undefined) ?? Sparkles;
  return <Icon {...props} />;
}

export default PillarIcon;
