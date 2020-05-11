import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppUsers } from 'app/shared/model/app-users.model';
import { AppUsersService } from './app-users.service';
import { AppUsersComponent } from './app-users.component';
import { AppUsersDetailComponent } from './app-users-detail.component';
import { AppUsersUpdateComponent } from './app-users-update.component';
import { AppUsersDeletePopupComponent } from './app-users-delete-dialog.component';
import { IAppUsers } from 'app/shared/model/app-users.model';

@Injectable({ providedIn: 'root' })
export class AppUsersResolve implements Resolve<IAppUsers> {
    constructor(private service: AppUsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppUsers> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AppUsers>) => response.ok),
                map((appUsers: HttpResponse<AppUsers>) => appUsers.body)
            );
        }
        return of(new AppUsers());
    }
}

export const appUsersRoute: Routes = [
    {
        path: '',
        component: AppUsersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AppUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AppUsersDetailComponent,
        resolve: {
            appUsers: AppUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AppUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AppUsersUpdateComponent,
        resolve: {
            appUsers: AppUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AppUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AppUsersUpdateComponent,
        resolve: {
            appUsers: AppUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AppUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appUsersPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AppUsersDeletePopupComponent,
        resolve: {
            appUsers: AppUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AppUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
