import { IService } from './service.interface';

export interface IAppointmentData {
    id: number;
    numberAppointment: number;
    nameStageTherapy: string;
    dateAppointment: Date | string;
    services: IService[];
    recommendations?: string;
}
