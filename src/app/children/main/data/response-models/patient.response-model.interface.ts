export interface IPatientResponseModel {
    email: string,
    password: string,
    id: number,
    photo: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    birthDate: string,
    role: string,
    completedAppointments: any[],
    plannedAppointment: any[],
    photoDocuments: any[]
}
