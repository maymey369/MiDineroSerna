import React from 'react';
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CurrencySymbol } from '../types';

interface BalanceCardProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  currency: CurrencySymbol;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  totalIncome,
  totalExpense,
  currency,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.includes('EUR') || currency === '€' ? 'EUR' : 'USD',
      minimumFractionDigits: 2,
    }).format(val).replace('USD', currency).replace('EUR', '€');
  };

  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100)) : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 text-white p-6 shadow-xl shadow-slate-900/10 border border-slate-800">
      {/* Decorative background glow */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Saldo Disponible
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
              <ShieldCheck className="w-3 h-3" /> Al día
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${balance < 0 ? 'text-rose-400' : 'text-white'}`}>
            {formatCurrency(balance)}
          </h2>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase font-medium text-slate-400">Ingresos</p>
              <p className="text-sm font-bold text-emerald-300 tabular-nums">
                +{formatCurrency(totalIncome)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
              <ArrowDownRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase font-medium text-slate-400">Gastos</p>
              <p className="text-sm font-bold text-rose-300 tabular-nums">
                -{formatCurrency(totalExpense)}
              </p>
            </div>
          </div>
        </div>

        {totalIncome > 0 && (
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Tasa de ahorro:
            </span>
            <span className="font-semibold text-emerald-400 tabular-nums">{savingsRate}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
