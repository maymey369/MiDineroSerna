import React from 'react';
import { Wallet, Moon, Sun, Smartphone, Monitor, Globe } from 'lucide-react';
import { CurrencySymbol } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  currency: CurrencySymbol;
  setCurrency: (val: CurrencySymbol) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  isMobileFrame,
  setIsMobileFrame,
  currency,
  setCurrency,
}) => {

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
            Mi Dinero
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Control de Finanzas
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Currency selector */}
        <div className="relative flex items-center">
          <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencySymbol)}
            aria-label="Seleccionar moneda"
            className="pl-8 pr-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
          >
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="$ (COP)">COP ($)</option>
            <option value="$ (MXN)">MXN ($)</option>
            <option value="$ (ARS)">ARS ($)</option>
          </select>
        </div>

        {/* Mobile Frame Toggle (useful for desktop preview) */}
        <button
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          title={isMobileFrame ? "Cambiar a vista expandida" : "Simular pantalla de celular"}
          className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
        >
          {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
