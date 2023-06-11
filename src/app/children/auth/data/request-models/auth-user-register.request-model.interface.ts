import { ITherapyData } from '../../../main/data/interfaces/therapy-data.interface';

export interface IAuthUserRegisterRequestModel {
    lastName: string;
    firstName: string;
    patronymic: string;
    birthDate: string;
    photo?: string;
    email: string;
    password: string;
    role: string;
    therapyList?: ITherapyData[];
    photoDocuments?: any[];
}
