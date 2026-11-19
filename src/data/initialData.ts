import { Transaction } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't-1',
    type: 'income',
    title: 'Salario mensual',
    amount: 2850.00,
    category: 'Salario',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    notes: 'Pago de nómina quincenal'
  },
  {
    id: 't-2',
    type: 'expense',
    title: 'Supermercado semanal',
    amount: 142.50,
    category: 'Comida y Bebida',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    notes: 'Frutas, verduras y artículos de limpieza'
  },
  {
    id: 't-3',
    type: 'expense',
    title: 'Gasolina y transporte',
    amount: 45.00,
    category: 'Transporte',
    date: new Date().toISOString().split('T')[0],
    notes: 'Tanque de combustible'
  },
  {
    id: 't-4',
    type: 'income',
    title: 'Venta de artículo usado',
    amount: 120.00,
    category: 'Regalos',
    date: new Date().toISOString().split('T')[0],
    notes: 'Mueble antiguo'
  },
  {
    id: 't-5',
    type: 'expense',
    title: 'Cena con amigos',
    amount: 68.30,
    category: 'Entretenimiento',
    date: new Date().toISOString().split('T')[0],
    notes: 'Restaurante italiano'
  }
];

export const CATEGORIES_INCOME = [
  'Salario',
  'Inversiones',
  'Regalos',
  'Otros (Ingreso)'
] as const;

export const CATEGORIES_EXPENSE = [
  'Comida y Bebida',
  'Transporte',
  'Vivienda',
  'Entretenimiento',
  'Compras',
  'Salud',
  'Educación',
  'Otros (Gasto)'
] as const;
