import { UnitPrice } from "./unit-price";

export class Product {
  code!: string;
  group!: string;
  title!: string;
  order!: number;
  key!: string;
  img!: string;
  submetric!: string;
  names!: string;
  brand!: string;
  metric!: string;
  status?: string;
  units?:  UnitPrice[];
  userId!: string;
  flag!:boolean;
}
