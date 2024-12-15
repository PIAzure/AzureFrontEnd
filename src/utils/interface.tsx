export interface IEscala {
    data: string
    qtdeVoluntarios: number;
    comeco: string;
    fim: string
}

export interface IEvent {
    description: string;
    location: string;
    begin: string; // Pode ser do tipo Date ou string, dependendo de como você deseja manipulá-lo,
    end:string,
    max_particpant:string,
    max_voluntary_per_horary:string,
    banner: string;
    organizator: string;
    bscale:string,
    escale:string,
    id: number;
}

interface User {
  email: string;
  name: string;
  password: string;
  isadmin: boolean;
  imagefield: string;
  isactive: boolean;
}

interface UserObject {
  id: number;
  user: User;
}


// Interface para o horário (horary)
export interface IHorary {
    id: number;
    datetime: string;  // Pode ser do tipo string, considerando que a data está no formato ISO 8601
    voluntarys: UserObject[];  // Uma vez que os voluntários são uma lista vazia, você pode especificar o tipo exato se necessário
    max_voluntary_scale: number;  // Número máximo de voluntários para esse horário
  }
  
  // Interface para o evento
  export interface IEventWithHorary {
    id: number;  // Identificador do evento
    event: number;  // ID do evento, conforme está no JSON
    horarys: IHorary[];  // Lista de horários associados a esse evento
  }
  