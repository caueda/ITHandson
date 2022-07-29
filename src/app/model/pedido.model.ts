import { Produto } from './Produto.model'

export interface Pedido {
    id?:number,
    pessoa: Pedido,
    produto: Produto,
    quantidade: number,
    dataPedido: Date
  }