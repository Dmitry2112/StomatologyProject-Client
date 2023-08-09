import { IPatientResponseModel } from '../response-models/patient.response-model.interface';

export class PatientModel {
    public photo?: string;
    public firstName!: string;
    public lastName!: string;
    public patronymic!: string;
    public birthDate!: string;

    public toDto(): any {
        //TODO: будет формировать объект для запроса на сервер
    }

    public fromDto(dto: IPatientResponseModel): void {
        this.photo = dto.photo;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.patronymic = dto.patronymic;
        this.birthDate = new Date(dto.DOB).toLocaleDateString();
    }
}
