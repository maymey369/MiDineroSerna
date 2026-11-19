import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { CurrencySymbol } from '../types';

interface IndicatorsBarProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  currency: CurrencySymbol;
}

export const IndicatorsBar: React.FC<IndicatorsBarProps> = ({
  totalIncome,
  totalExpense,
  balance,
  currency,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.includes('EUR') || currency === '€' ? 'EUR' : 'USD',
      maximumFractionDigits: 0,
    }).format(val).replace('USD', currency).replace('EUR', '€');
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Ingresos Indicator */}
      <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ingresos
          </span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(totalIncome)}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Entradas netas
          </span>
        </div>
      </div>

      {/* Gastos Indicator */}
      <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Gastos
          </span>
          <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center">
            <TrendingDown className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(totalExpense)}
          </p>
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
            Salidas totales
          </span>
        </div>
      </div>

      {/* Saldo Indicator */}
      <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saldo
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className={`text-base sm:text-lg font-bold tabular-nums ${balance < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
            {formatCurrency(balance)}
          </p>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            Balance actual
          </span>
        </div>
      </div>
    </div>
  );
};
