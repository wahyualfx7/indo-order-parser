export type PaymentMethod = 'cod' | 'bank_transfer' | 'ewallet' | 'qris' | 'cash' | 'unknown';
export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number | null;
  subtotal: number | null;
}
export interface ParsedOrder {
  customer: {
    name: string | null;
    phone: string | null;
    address: string | null;
  };
  items: OrderItem[];
  payment: {
    method: PaymentMethod;
    provider: string | null;
  };
  note: string | null;
  currency: 'IDR';
  itemsSubtotal: number | null;
  declaredTotal: number | null;
  warnings: string[];
  unparsedSegments: string[];
}
export declare function parseOrder(text: string): ParsedOrder;
export declare function parseOrders(texts: string[]): ParsedOrder[];
export declare function parseRupiah(value: string | number): number | null;
export declare function normalizePhone(value: string): string | null;
declare const api: {
  parseOrder: typeof parseOrder;
  parseOrders: typeof parseOrders;
  parseRupiah: typeof parseRupiah;
  normalizePhone: typeof normalizePhone;
};
export default api;
