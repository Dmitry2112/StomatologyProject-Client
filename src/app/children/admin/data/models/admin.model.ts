import { IAdminResponseModel } from '../response-models/admin.response-model.interface';

export class AdminModel {
    public photo?: string;
    public firstName!: string;
    public lastName!: string;
    public patronymic!: string;
    public role!: string;

    public toDto(): any {
        //TODO: будет формировать объект для запроса на сервер
    }

    public fromDto(dto: IAdminResponseModel): void {
        this.photo = dto.photo;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.patronymic = dto.patronymic;
        this.role = dto.role;
    }
}
