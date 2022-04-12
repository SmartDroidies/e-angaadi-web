export class CartItem {
  code!: string;
  unit!: number;
  imgUrl!: string;
  title!: string;
  submetric!: string;
  quantity!: number;
  price!: number;

  constructor(code: string, selectedUnit: number, quantity: number) {
    this.code = code;
    this.unit = selectedUnit;
    this.quantity = quantity;
  }
}
