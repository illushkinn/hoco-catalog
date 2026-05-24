/**
 * Utilidades para manejo de precios
 * Principios DRY: Funciones reutilizables para cálculos de precios
 */

// Tipo de cambio dólar blue (actualizar según necesidad)
export const BLUE_EXCHANGE_RATE = 1350; // 1 USD = 1350 ARS (aproximado)

/**
 * Redondea un precio hacia abajo al múltiplo más cercano
 * @param price - Precio a redondear
 * @param roundTo - Múltiplo para redondear (default: 1000)
 * @returns Precio redondeado hacia abajo
 */
export const roundPriceDown = (price: number, roundTo: number = 1000): number => {
  return Math.floor(price / roundTo) * roundTo;
};

/**
 * Convierte USD a ARS y redondea hacia abajo
 * @param usd - Cantidad en USD
 * @returns Precio en ARS redondeado hacia abajo
 */
export const convertUSDToARS = (usd: number): number => {
  const ars = usd * BLUE_EXCHANGE_RATE;
  return roundPriceDown(ars);
};

/**
 * Suma un monto a un precio y redondea hacia abajo
 * @param basePrice - Precio base
 * @param addAmount - Cantidad a sumar
 * @returns Precio total redondeado hacia abajo
 */
export const addAndRound = (basePrice: number, addAmount: number): number => {
  return roundPriceDown(basePrice + addAmount);
};

/**
 * Formatea un precio en ARS con símbolo de moneda
 * @param price - Precio en ARS
 * @returns Precio formateado (ej: "$ 9.425")
 */
export const formatPriceARS = (price: number): string => {
  return `$ ${price.toLocaleString('es-AR')}`;
};

/**
 * Calcula el total de un carrito
 * @param items - Array de items con cantidad y precio
 * @returns Total redondeado hacia abajo
 */
export const calculateCartTotal = (
  items: Array<{ price_ars: number; quantity: number }>
): number => {
  const total = items.reduce((sum, item) => sum + item.price_ars * item.quantity, 0);
  return roundPriceDown(total);
};
