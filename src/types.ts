export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Salario'
  | 'Inversiones'
  | 'Regalos'
  | 'Otros (Ingreso)'
  | 'Comida y Bebida'
  | 'Transporte'
  | 'Vivienda'
  | 'Entretenimiento'
  | 'Compras'
  | 'Salud'
  | 'Educación'
  | 'Otros (Gasto)';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
  notes?: string;
}

export type CurrencySymbol = '$' | '€' | '£' | '$ (COP)' | '$ (MXN)' | '$ (ARS)';

export type FilterTab = 'all' | 'income' | 'expense';
