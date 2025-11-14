"use client";

import React from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-lg rounded-lg border bg-background p-6 shadow-xl ${className ?? ''}`}>
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        <div>{children}</div>
        {footer && (
          <div className="mt-6 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
