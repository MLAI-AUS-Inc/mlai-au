import { useEffect, useId, useRef, type ReactNode } from "react";

/** Native modal semantics keep keyboard focus in the confirmation and restore it on close. */
export default function UpdateDialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    ref.current?.showModal();
    return () => ref.current?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="update-dialog"
      aria-labelledby={id}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="update-dialog-inner">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
