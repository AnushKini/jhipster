import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrivilege } from 'app/shared/model/privilege.model';

type EntityResponseType = HttpResponse<IPrivilege>;
type EntityArrayResponseType = HttpResponse<IPrivilege[]>;

@Injectable({ providedIn: 'root' })
export class PrivilegeService {
    public resourceUrl = SERVER_API_URL + 'api/privileges';

    constructor(protected http: HttpClient) {}

    create(privilege: IPrivilege): Observable<EntityResponseType> {
        return this.http.post<IPrivilege>(this.resourceUrl, privilege, { observe: 'response' });
    }

    update(privilege: IPrivilege): Observable<EntityResponseType> {
        return this.http.put<IPrivilege>(this.resourceUrl, privilege, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IPrivilege>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrivilege[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
