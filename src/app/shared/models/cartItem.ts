import { Directionality } from "@angular/cdk/bidi";

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
  flag!:boolean;

  constructor(code: string, selectedUnit: number, quantity: number, title: string, submetric: string, flag:boolean, userId:string) {
    this.code = code;
    this.unit = selectedUnit;
    this.quantity = quantity;
    this.title = title;
    this.submetric = submetric;
    this.flag = flag;
    this.userId=userId;
  }
}
