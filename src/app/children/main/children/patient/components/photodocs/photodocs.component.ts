import { Component, Input, OnInit, Self } from '@angular/core';
import { DestroyService } from '../../../../../../data/services/destroy.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FileDataService } from '../../data/services/file-data.service';
import { takeUntil } from 'rxjs';
import { IFileResponseModel } from '../../data/response-models/file.response-model.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFileRequestModel } from '../../data/request-models/file.request-model.interface';
import { UpdateDataService } from '../../../../services/update-data.service';

@Component({
    selector: 'photodocs',
    templateUrl: './photodocs.component.html',
    styleUrls: ['./styles/photodocs.component.scss'],
    providers: [DestroyService]
})
export class PhotodocsComponent implements OnInit {
    @Input()
    public canEdit: boolean = false;

    public files: IFileResponseModel[] = [];

    public showPhotodocForm: boolean = false;

    public addPhotodocForm: FormGroup = new FormGroup({
        date: new FormControl('', [
            Validators.required
        ]),
        type: new FormControl('', [
            Validators.required
        ]),
        file: new FormControl('', [
            Validators.required
        ]),
    });

    private _patientId!: number;

    private _file!: File;

    constructor(
        @Self()
        private readonly _destroy$: DestroyService,
        private _route: ActivatedRoute,
        private _fileDataService: FileDataService,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getFiles();
            }
        });
    }

    public ngOnInit(): void {
        this._route.params
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe((params: Params) => {
                this._patientId = params['patientId'];
            });

        this.getFiles();
    }

    public getFiles(): void {
        this._fileDataService.getPatientFiles(this._patientId)
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe((files: IFileResponseModel[]) => {
                this.files = files;
            });
    }

    public addPhotodoc(): void {
        this.showPhotodocForm = true;
    }

    public cancelPhotodoc(): void {
        this.showPhotodocForm = false;
    }

    public onFileSelected(event: any): void {
        this._file = event.target.files[0];
    }

    public onSubmit(): void {
        if (this.addPhotodocForm.invalid) {
            this.addPhotodocForm.markAllAsTouched();

            return;
        }

        this.showPhotodocForm = false;
        const newFile: IFileRequestModel = new FormData();
        newFile.append('date', this.addPhotodocForm.value.date);
        newFile.append('type', this.addPhotodocForm.value.type);
        newFile.append('fileName', '');
        newFile.append('userId', this._patientId.toString());
        newFile.append('file', this._file);

        this._fileDataService.addFile(newFile)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
}
