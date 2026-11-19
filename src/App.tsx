/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BalanceCard } from './components/BalanceCard';
import { IndicatorsBar } from './components/IndicatorsBar';
import { ActionButtons } from './components/ActionButtons';
import { TransactionModal } from './components/TransactionModal';
import { TransactionList } from './components/TransactionList';
import { Transaction, TransactionType, CurrencySymbol } from './types';
import { INITIAL_TRANSACTIONS } from './data/initialData';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  // LocalStorage state initialization
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('mi_dinero_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mi_dinero_dark');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(() => {
    const saved = localStorage.getItem('mi_dinero_mobile_frame');
    return saved ? JSON.parse(saved) : true;
  });

  const [currency, setCurrency] = useState<CurrencySymbol>(() => {
    return (localStorage.getItem('mi_dinero_currency') as CurrencySymbol) || '$';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultType, setModalDefaultType] = useState<TransactionType>('income');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('mi_dinero_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('mi_dinero_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('mi_dinero_mobile_frame', JSON.stringify(isMobileFrame));
  }, [isMobileFrame]);

  useEffect(() => {
    localStorage.setItem('mi_dinero_currency', currency);
  }, [currency]);

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleOpenModal = (type: TransactionType) => {
    setModalDefaultType(type);
    setIsModalOpen(true);
  };

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setTransactions([newTx, ...transactions]);

    // Show success message
    const msg = newTx.type === 'income' 
      ? '¡Ingreso registrado correctamente!' 
      : '¡Gasto registrado correctamente!';
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleResetData = () => {
    if (window.confirm('¿Deseas restablecer los datos de ejemplo predeterminados?')) {
      setTransactions(INITIAL_TRANSACTIONS);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100/70 text-slate-900'} font-sans transition-colors relative`}>
      {/* Toast Success Notification */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center gap-2.5 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Container */}
      <main className="py-6 px-4 sm:px-6 flex justify-center items-start">
        <div className={`w-full transition-all duration-300 ${isMobileFrame ? 'max-w-[440px] bg-white dark:bg-slate-900 sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-700 sm:overflow-hidden sm:my-4' : 'max-w-4xl'}`}>
          
          {/* Mobile frame speaker notch decoration when in mobile frame mode */}
          {isMobileFrame && (
            <div className="hidden sm:block bg-slate-850 dark:bg-slate-700 pt-2 pb-3 px-6 text-center">
              <div className="w-28 h-4 bg-slate-900 dark:bg-slate-900 rounded-full mx-auto mb-1 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          )}

          <div className="p-4 sm:p-6 space-y-6">
            {/* Tarjeta con el saldo disponible */}
            <BalanceCard
              balance={balance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              currency={currency}
            />

            {/* Tres indicadores: ingresos, gastos y saldo */}
            <IndicatorsBar
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              balance={balance}
              currency={currency}
            />

            {/* Dos botones: Registrar ingreso y Registrar gasto */}
            <ActionButtons onOpenModal={handleOpenModal} />

            {/* Historial de transacciones */}
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              currency={currency}
            />

            {/* Reset data helper */}
            <div className="flex items-center justify-between pt-2 pb-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Mi Dinero v1.0
              </span>
              <button
                onClick={handleResetData}
                className="flex items-center gap-1 text-slate-500 hover:text-rose-500 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar datos
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for adding income or expense */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        defaultType={modalDefaultType}
        currency={currency}
      />
    </div>
  );
}
