/**
 * Mobile Touch Controls
 * On-screen buttons for mobile gameplay
 */

interface TetrisControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onSoftDrop: () => void;
  disabled?: boolean;
}

export function TetrisControls({
  onMoveLeft,
  onMoveRight,
  onSoftDrop,
  disabled = false,
}: TetrisControlsProps) {
  const buttonClass = `
    px-8 py-4 rounded-xl font-bold text-white shadow-lg text-lg
    active:scale-95 transition-transform
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-none select-none
    flex-1 max-w-[150px]
  `;

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 w-full">
      <button
        onClick={onMoveLeft}
        disabled={disabled}
        className={buttonClass}
        style={{ backgroundColor: '#4b0db3' }}
        aria-label="Move Left"
      >
        ⬅️
      </button>
      
      <button
        onClick={onSoftDrop}
        disabled={disabled}
        className={buttonClass}
        style={{ backgroundColor: '#ff3d00' }}
        aria-label="Soft Drop"
      >
        ⬇️
      </button>
      
      <button
        onClick={onMoveRight}
        disabled={disabled}
        className={buttonClass}
        style={{ backgroundColor: '#4b0db3' }}
        aria-label="Move Right"
      >
        ➡️
      </button>
    </div>
  );
}

