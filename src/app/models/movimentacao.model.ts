import { Base } from "./base.model";
import { Produto } from "./produto.model";

export class Movimentacao extends Base{
    tipo: string;
    quantidade: number;
    produtoId: string;
    dataMovimentacao:Date;
    produtos?:Produto;    
}