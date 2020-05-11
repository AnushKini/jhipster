import { IRole } from 'app/shared/model/role.model';

export interface IAppUsers {
    id?: string;
    usersName?: string;
    roles?: IRole[];
}

export class AppUsers implements IAppUsers {
    constructor(public id?: string, public usersName?: string, public roles?: IRole[]) {}
}
