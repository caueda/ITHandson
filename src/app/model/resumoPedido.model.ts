import { Produto } from './Produto.model'

export interface ResumoPedido {
    produto: string,
    quantidadeTotal: number,
    precoTotal: number
  }