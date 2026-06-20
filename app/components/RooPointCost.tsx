import { ImageWithFallback } from "./ImageWithFallback";

export const ROO_POINTS_COIN_URL = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Robotics%20%26%20AI%20For%20Everyone%20(9)%20(1)%20(1).png?alt=media&token=a43ec994-1637-410c-b3ea-a39bb45f3cd3";
export const ROO_POINTS_ANIMATED_GIF_URL = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/RoboticsAIForEveryone-ezgif.com-resize.gif?alt=media&token=1dfcdf90-5385-4552-92e1-0b7d0c139cf0";

const ROO_POINTS_FALLBACK_URL = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI-Logo.png?alt=media&token=9d844530-e3b5-4944-a1c7-5be3112d5d84";

function classNames(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function RooCoinImage({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <ImageWithFallback
      src={ROO_POINTS_COIN_URL}
      fallbackSrc={ROO_POINTS_FALLBACK_URL}
      alt=""
      aria-hidden="true"
      width={18}
      height={18}
      className={classNames("shrink-0 rounded-full object-cover", className)}
    />
  );
}

export function RooPointCost({
  points,
  className,
  coinClassName = "h-4 w-4",
}: {
  points: number;
  className?: string;
  coinClassName?: string;
}) {
  const absolutePoints = Math.abs(points);
  const visibleCost = `${points < 0 ? "-" : ""}${absolutePoints}`;
  const pointLabel = absolutePoints === 1 ? "Point" : "Points";
  const screenReaderLabel = points < 0
    ? `Costs ${absolutePoints} Roo ${pointLabel}`
    : `${absolutePoints} Roo ${pointLabel}`;

  return (
    <span className={classNames("inline-flex items-center gap-1 whitespace-nowrap", className)}>
      <span aria-hidden="true">{visibleCost}</span>
      <RooCoinImage className={coinClassName} />
      <span className="sr-only">{screenReaderLabel}</span>
    </span>
  );
}
