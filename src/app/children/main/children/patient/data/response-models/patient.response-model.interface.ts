import { ITherapy } from '../interfaces/therapy.interface';
import { IFile } from '../interfaces/file.interface';

export interface IPatientResponseModel {
    email: string;
    password: string;
    id: number;
    photo: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    DOB: string;
    role: string;
    therapy: ITherapy[];
    photos: IFile[];
}
