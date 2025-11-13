export interface Bill {
  items: BillItem[];
}

export interface BillItem {
  name: string;
  price: number;
}