import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';

@Component({
    selector: 'jhi-branch-update',
    templateUrl: './branch-update.component.html'
})
export class BranchUpdateComponent implements OnInit {
    branch: IBranch;
    isSaving: boolean;

    constructor(protected branchService: BranchService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ branch }) => {
            this.branch = branch;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.branch.id !== undefined) {
            this.subscribeToSaveResponse(this.branchService.update(this.branch));
        } else {
            this.subscribeToSaveResponse(this.branchService.create(this.branch));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranch>>) {
        result.subscribe((res: HttpResponse<IBranch>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
