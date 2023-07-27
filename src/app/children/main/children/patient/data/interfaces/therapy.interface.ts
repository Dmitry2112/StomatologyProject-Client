import { IAppointment } from './appointment.interface';

export interface ITherapy {
    id: number;
    userId: number;
    name: string;
    appointments: IAppointment[];
}
