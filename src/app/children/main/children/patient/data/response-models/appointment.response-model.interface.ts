export interface IAppointmentResponseModel {
    id: number;
    number: number;
    name: string;
    date: string;
    completed: boolean;
    therapyId: number;
    recommendations?: string;
}
