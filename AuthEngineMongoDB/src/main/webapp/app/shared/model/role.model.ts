import { IPrivilege } from 'app/shared/model/privilege.model';
import { IAppUsers } from 'app/shared/model/app-users.model';

export interface IRole {
    id?: string;
    roleName?: string;
    privilege?: IPrivilege;
    appUsers?: IAppUsers;
}

export class Role implements IRole {
    constructor(public id?: string, public roleName?: string, public privilege?: IPrivilege, public appUsers?: IAppUsers) {}
}
