import { IAdminCardData } from '../data/interfaces/admin-card-field.interface';
import { AdminModel } from '../data/models/admin.model';

export class AdminViewModel {
    public adminCardData!: IAdminCardData;

    public toModel(): AdminModel {
        //TODO: Возвращает объект PatientModel
        return new AdminModel();
    }

    public fromModel(model: AdminModel): void {
        this.adminCardData = {
            photo: model.photo,
            adminCardFields: [
                {
                    label: 'ФИО:',
                    data: `${model.lastName} ${model.firstName} ${model.patronymic}`
                },
                {
                    label: 'Роль:',
                    data: model.role
                }
            ]
        };
    }
}
