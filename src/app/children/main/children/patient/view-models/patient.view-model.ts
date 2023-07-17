import { PatientModel } from '../data/models/patient.model';
import { IPatientCardData } from '../data/interfaces/patient-card-data.interface';

export class PatientViewModel {
    public patientCardData!: IPatientCardData;

    public toModel(): PatientModel {
        //TODO: Возвращает объект PatientModel
        return new PatientModel();
    }

    public fromModel(model: PatientModel): void {
        this.patientCardData = {
            photo: model.photo,
            patientCardFields: [
                {
                    label: 'ФИО:',
                    data: `${model.lastName} ${model.firstName} ${model.patronymic}`
                },
                {
                    label: 'Возраст:',
                    data: model.birthDate
                }
            ]
        };
    }
}
