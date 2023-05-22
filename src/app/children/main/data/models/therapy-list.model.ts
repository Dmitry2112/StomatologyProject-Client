import { IPatientResponseModel } from '../response-models/patient.response-model.interface';
import { ITherapyData } from '../interfaces/therapy-data.interface';

export class TherapyListModel {
    public therapyList!: ITherapyData[];

    public toDto(): any {
        //TODO: будет формировать объект для запроса на сервер
    }

    public fromDto(dto: IPatientResponseModel): void {
        this.therapyList = dto.therapyList;
    }
}
