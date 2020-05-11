import { IRole } from 'app/shared/model/role.model';
import { IFeature } from 'app/shared/model/feature.model';

export interface IPrivilege {
    id?: string;
    permission?: number;
    role?: IRole;
    features?: IFeature[];
}

export class Privilege implements IPrivilege {
    constructor(public id?: string, public permission?: number, public role?: IRole, public features?: IFeature[]) {}
}
