import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobApplication} from '../shared/models';
import {environment} from '../../environments/environment';

@Injectable()
export class JobService {

  private readonly url = '/job/application';

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  sendJobApplication(applicationData: FormData) {
    return this.http.post<JobApplication>(`${environment.apiUrl}${this.url}/`, applicationData);
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      motivation: ['', Validators.required],
      resume: [null, Validators.required],
      protfolio: null,
      photo: null,
      sendCopy: false,
    });
  }
}
