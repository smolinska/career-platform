import {ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {JobService} from '../../services/job.service';
import {JobApplication} from '../../shared/models';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  resume: JobApplication['resume'];

  constructor(private service: JobService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.form = this.service.createForm();
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => formData.append(key, value));

    this.service.sendJobApplication(formData).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  onFileChange(event) {
    this.resume = event.target.files.item(0);
    console.log(event);
  }

}
