import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { TransactionType } from '../types';

interface ActionButtonsProps {
  onOpenModal: (type: TransactionType) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onOpenModal }) => {
  return (
    <div className="grid grid-cols-2 gap-3.5">
      <button
        onClick={() => onOpenModal('income')}
        className="group flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <PlusCircle className="w-4 h-4 text-white" />
        </div>
        <span>Registrar ingreso</span>
      </button>

      <button
        onClick={() => onOpenModal('expense')}
        className="group flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-rose-600/20 transition-all cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <MinusCircle className="w-4 h-4 text-white" />
        </div>
        <span>Registrar gasto</span>
      </button>
    </div>
  );
};
