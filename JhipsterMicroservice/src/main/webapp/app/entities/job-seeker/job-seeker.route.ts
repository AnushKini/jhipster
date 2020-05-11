import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobSeeker } from 'app/shared/model/job-seeker.model';
import { JobSeekerService } from './job-seeker.service';
import { JobSeekerComponent } from './job-seeker.component';
import { JobSeekerDetailComponent } from './job-seeker-detail.component';
import { JobSeekerUpdateComponent } from './job-seeker-update.component';
import { JobSeekerDeletePopupComponent } from './job-seeker-delete-dialog.component';
import { IJobSeeker } from 'app/shared/model/job-seeker.model';

@Injectable({ providedIn: 'root' })
export class JobSeekerResolve implements Resolve<IJobSeeker> {
    constructor(private service: JobSeekerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJobSeeker> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JobSeeker>) => response.ok),
                map((jobSeeker: HttpResponse<JobSeeker>) => jobSeeker.body)
            );
        }
        return of(new JobSeeker());
    }
}

export const jobSeekerRoute: Routes = [
    {
        path: '',
        component: JobSeekerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobSeekers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: JobSeekerDetailComponent,
        resolve: {
            jobSeeker: JobSeekerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobSeekers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: JobSeekerUpdateComponent,
        resolve: {
            jobSeeker: JobSeekerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobSeekers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: JobSeekerUpdateComponent,
        resolve: {
            jobSeeker: JobSeekerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobSeekers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobSeekerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: JobSeekerDeletePopupComponent,
        resolve: {
            jobSeeker: JobSeekerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobSeekers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
