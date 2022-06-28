export class CartItem {
  code!: string;
  unit!: number;
  imgUrl!: string;
  title!: string;
  submetric!: string;
  quantity!: number;
  price!: number;
  userId!:string;
  id!:any;

  constructor(code: string, selectedUnit: number, quantity: number, title: string, submetric: string) {
    this.code = code;
    this.unit = selectedUnit;
    this.quantity = quantity;
    this.title = title;
    this.submetric = submetric;
  }
}
