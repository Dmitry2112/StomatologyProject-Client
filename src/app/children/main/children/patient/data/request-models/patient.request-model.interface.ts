import { ITherapyData } from '../interfaces/therapy-data.interface';

export interface IPatientRequestModel {
    email: string,
    password: string,
    id: number,
    photo: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    birthDate: string,
    role: string,
    therapyList: ITherapyData[],
    photoDocuments: any[]
}
