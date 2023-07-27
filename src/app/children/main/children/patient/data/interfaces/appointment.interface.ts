import { IService } from './service.interface';

export interface IAppointment {
    id: number;
    number: number;
    name: string;
    date: string;
    completed: boolean;
    therapyId: number;
    services: IService[];
    recommendations?: string;
}
