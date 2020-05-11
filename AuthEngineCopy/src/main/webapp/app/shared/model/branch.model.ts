export interface IBranch {
    id?: string;
    branchName?: string;
    location?: string;
}

export class Branch implements IBranch {
    constructor(public id?: string, public branchName?: string, public location?: string) {}
}
