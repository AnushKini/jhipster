import { IRole } from 'app/shared/model/role.model';

export interface IAppUsers {
    id?: number;
    usersName?: string;
    roles?: IRole[];
}

export class AppUsers implements IAppUsers {
    constructor(public id?: number, public usersName?: string, public roles?: IRole[]) {}
}
