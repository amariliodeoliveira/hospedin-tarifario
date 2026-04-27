interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-bottom" open>
      <div className="modal-box mx-auto w-auto max-w-none rounded-b-none rounded-t-2xl p-4">
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
