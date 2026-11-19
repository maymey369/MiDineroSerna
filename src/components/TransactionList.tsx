import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Trash2, 
  Search, 
  Receipt, 
  ShoppingBag, 
  Car, 
  Home, 
  Film, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Gift, 
  HelpCircle 
} from 'lucide-react';
import { Transaction, FilterTab, Category, CurrencySymbol } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  currency: CurrencySymbol;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  currency,
}) => {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'Salario':
        return <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Inversiones':
        return <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Regalos':
        return <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Comida y Bebida':
        return <ShoppingBag className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
      case 'Transporte':
        return <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Vivienda':
        return <Home className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'Entretenimiento':
        return <Film className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Salud':
        return <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'Educación':
        return <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const filteredTransactions = sortedTransactions.filter((t) => {
    if (filter === 'income' && t.type !== 'income') return false;
    if (filter === 'expense' && t.type !== 'expense') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchCategory = t.category.toLowerCase().includes(q);
      const matchNotes = t.notes?.toLowerCase().includes(q) || false;
      return matchTitle || matchCategory || matchNotes;
    }
    return true;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.includes('EUR') || currency === '€' ? 'EUR' : 'USD',
      minimumFractionDigits: 2,
    }).format(val).replace('USD', currency).replace('EUR', '€');
  };

  return (
    <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header & Tabs */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-500" />
              Historial de Transacciones
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {transactions.length} registros en total
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${filter === 'income' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setFilter('expense')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${filter === 'expense' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Gastos
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por concepto o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750 rounded-2xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[420px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Receipt className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No se encontraron transacciones
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Intenta cambiar el filtro o registra una nueva operación.
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="group flex items-center justify-between p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${tx.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'bg-rose-50 dark:bg-rose-950/40'}`}>
                  {getCategoryIcon(tx.category)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {tx.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="font-medium text-slate-600 dark:text-slate-300">{tx.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(tx.date + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                    {tx.notes && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-[150px]">{tx.notes}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className={`text-sm font-extrabold tabular-nums block ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">
                    {tx.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </span>
                </div>

                <button
                  onClick={() => onDeleteTransaction(tx.id)}
                  title="Eliminar transacción"
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
