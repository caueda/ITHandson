export interface Oferta {
    id?:string,
    produtoId: number,
    pedidoUrl: string,
    imageProdutoUrl: string,
    desconto: number,
    mensagem: string,
    situacao: string
  }