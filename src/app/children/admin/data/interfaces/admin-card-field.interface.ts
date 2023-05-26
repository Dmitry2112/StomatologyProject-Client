import { IAdminCardField } from './admin-card-data.interface';

export interface IAdminCardData {
    photo?: string,
    adminCardFields: IAdminCardField[]
}
