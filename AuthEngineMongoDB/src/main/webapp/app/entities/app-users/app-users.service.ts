import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAppUsers } from 'app/shared/model/app-users.model';

type EntityResponseType = HttpResponse<IAppUsers>;
type EntityArrayResponseType = HttpResponse<IAppUsers[]>;

@Injectable({ providedIn: 'root' })
export class AppUsersService {
    public resourceUrl = SERVER_API_URL + 'api/app-users';

    constructor(protected http: HttpClient) {}

    create(appUsers: IAppUsers): Observable<EntityResponseType> {
        return this.http.post<IAppUsers>(this.resourceUrl, appUsers, { observe: 'response' });
    }

    update(appUsers: IAppUsers): Observable<EntityResponseType> {
        return this.http.put<IAppUsers>(this.resourceUrl, appUsers, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAppUsers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAppUsers[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
