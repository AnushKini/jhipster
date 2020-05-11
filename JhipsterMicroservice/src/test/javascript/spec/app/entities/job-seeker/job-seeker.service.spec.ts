/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { JobSeekerService } from 'app/entities/job-seeker/job-seeker.service';
import { IJobSeeker, JobSeeker, Gender } from 'app/shared/model/job-seeker.model';

describe('Service Tests', () => {
    describe('JobSeeker Service', () => {
        let injector: TestBed;
        let service: JobSeekerService;
        let httpMock: HttpTestingController;
        let elemDefault: IJobSeeker;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(JobSeekerService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new JobSeeker('ID', 'AAAAAAA', 0, Gender.MALE, 0, 0, 0, 'image/png', 'AAAAAAA', 'image/png', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a JobSeeker', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new JobSeeker(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a JobSeeker', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        age: 1,
                        gender: 'BBBBBB',
                        experience: 1,
                        ctc: 1,
                        expCtc: 1,
                        photo: 'BBBBBB',
                        resume: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of JobSeeker', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        age: 1,
                        gender: 'BBBBBB',
                        experience: 1,
                        ctc: 1,
                        expCtc: 1,
                        photo: 'BBBBBB',
                        resume: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a JobSeeker', async () => {
                const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
