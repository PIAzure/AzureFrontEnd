export interface IEscala{
    data:string
    qtdeVoluntarios:number;
    comeco:string;
    fim:string
}

export interface IEvento{
    nome:string,
    data:string,
    descricao:string,
    localizacao:string,
    banner:string,
    duracao:string,
    escala:IEscala[]
}