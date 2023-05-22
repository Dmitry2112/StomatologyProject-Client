import { IService } from './service.interface';

export interface IAppointmentData {
    numberAppointment: number,
    nameStageTherapy: string,
    dateAppointment: Date | string,
    services: IService[],
    recommendations?: string
}
