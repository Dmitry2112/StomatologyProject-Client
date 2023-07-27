import { IPatientResponseModel } from '../response-models/patient.response-model.interface';
import { ITherapy } from '../interfaces/therapy.interface';

export class TherapyListModel {
    public therapyList!: ITherapy[];

    public toDto(): any {
        //TODO: будет формировать объект для запроса на сервер
    }

    public fromDto(dto: IPatientResponseModel): void {
        this.therapyList = dto.therapy;
    }
}
