import { IAppointmentData } from './appointment-data.interface';

export interface ITherapyData {
    therapyName: string,
    completedAppointments: IAppointmentData[],
    plannedAppointments: IAppointmentData[]
}
