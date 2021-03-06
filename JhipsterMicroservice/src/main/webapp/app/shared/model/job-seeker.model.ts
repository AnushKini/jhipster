export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface IJobSeeker {
    id?: string;
    name?: string;
    age?: number;
    gender?: Gender;
    experience?: number;
    ctc?: number;
    expCtc?: number;
    photoContentType?: string;
    photo?: any;
    resumeContentType?: string;
    resume?: any;
}

export class JobSeeker implements IJobSeeker {
    constructor(
        public id?: string,
        public name?: string,
        public age?: number,
        public gender?: Gender,
        public experience?: number,
        public ctc?: number,
        public expCtc?: number,
        public photoContentType?: string,
        public photo?: any,
        public resumeContentType?: string,
        public resume?: any
    ) {}
}
