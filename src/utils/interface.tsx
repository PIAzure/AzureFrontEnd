export interface IEscala {
    data: string
    qtdeVoluntarios: number;
    comeco: string;
    fim: string
}

export interface IEvent {
    description: string;
    location: string;
    timeDate: string; // Pode ser do tipo Date ou string, dependendo de como você deseja manipulá-lo
    banner: string;
    organizator: string;
    id: number;
}
