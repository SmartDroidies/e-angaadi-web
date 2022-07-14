
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
  synced!:boolean;
  key!: string;
  group!:string;

  constructor(code: string, selectedUnit: number, quantity: number, title: string, submetric: string, synced:boolean, userId:string,key:string,group:string) {
    this.code = code;
    this.unit = selectedUnit;
    this.quantity = quantity;
    this.title = title;
    this.submetric = submetric;
    this.synced = synced;
    this.userId=userId;
    this.key=key;
    this.group=group;
  }
}
