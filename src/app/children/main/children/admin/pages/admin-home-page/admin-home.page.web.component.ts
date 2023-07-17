import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminModel } from '../../data/models/admin.model';
import { AdminViewModel } from '../../view-models/admin.view-model';
import { AdminDataService } from '../../data/services/admin-data.service';
import { IAdminResponseModel } from '../../data/response-models/admin.response-model.interface';

@Component({
    selector: 'admin-home-page',
    templateUrl: './admin-home.page.web.component.html',
    styleUrls: ['./styles/admin-home.page.web.component.scss']
})
export class AdminHomePageWebComponent implements OnInit {
    public adminModel: AdminModel = new AdminModel();
    public adminViewModel: AdminViewModel = new AdminViewModel();

    constructor(
        private _ref: ChangeDetectorRef,
        private _adminDataService: AdminDataService,
    ) {
    }

    public ngOnInit(): void {
        this._adminDataService.getAdminData(Number(localStorage.getItem('userId')))
            .subscribe((data: IAdminResponseModel) => {
                this.adminModel.fromDto(data);
                this.adminViewModel.fromModel(this.adminModel);

                this._ref.detectChanges();
            });
    }
}
