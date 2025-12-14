export function Dialog({ children, open, onOpenChange }) {
  return open ? (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      {children}
    </div>
  ) : null;
}

export function DialogContent({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
