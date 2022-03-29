import { UnitPrice } from './unit-price';

export class ProductPrice {
  brand!: string;
  code!: string;
  prices!: UnitPrice[];
  type!: string;
}