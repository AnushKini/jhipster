import { IPrivilege } from 'app/shared/model/privilege.model';

export interface IFeature {
    id?: string;
    description?: string;
    type?: string;
    isCritical?: string;
    privileges?: IPrivilege[];
}

export class Feature implements IFeature {
    constructor(
        public id?: string,
        public description?: string,
        public type?: string,
        public isCritical?: string,
        public privileges?: IPrivilege[]
    ) {}
}
