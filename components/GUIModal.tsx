"use client";

interface GUIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GUIModal({ isOpen, onClose }: GUIModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] border-2 border-cyan-500 rounded-lg p-8 max-w-md w-full font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-cyan-400 mb-4 text-center text-xl">
          Traditional portfolio? No thanks.
        </div>
        <div className="text-green-400 text-center mb-6">
          You&apos;re already in the best portfolio experience!
        </div>
        <button
          onClick={onClose}
          className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500 rounded px-4 py-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

