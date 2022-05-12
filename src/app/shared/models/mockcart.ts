export interface Cart {
  title: string;
  price: number;
  quantity: number;
  total: number;
}

const CART_ITEM: Cart[] = [
  { title: 'carrot', price: 150, quantity: 1.0079, total: 500 },
  { title: 'beetroot', price: 150, quantity: 4.0026, total: 500 },
  { title: 'banana', price: 150, quantity: 6.941, total: 500 },
];
