export interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    dataNascimento: Date;
    label?: string
  }