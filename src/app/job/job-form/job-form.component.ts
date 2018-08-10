import {ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {JobService} from '../../services/job.service';
import {FileTypes, JobApplication} from '../../shared/models';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, OnChanges {
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  resume: JobApplication['resume'];
  portfolio: JobApplication['protfolio'];
  photo: JobApplication['resume'];
  resumeErrors: string[] = ['empty'];
  portfolioErrors: string[] = ['empty'];
  photoErrors: string[] = ['empty'];
  docExtensions: string[] = ['DOC', 'DOCX', 'PDF', 'RTF', 'TXT'];
  imgExtensions: string[] = ['JPG', 'JPEG', 'GIF', 'PNG'];
  public fileTypes = FileTypes;

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

  onFileChange(event, type) {
    const selectedFile = event.target.files.item(0);
    const fileExtension = selectedFile.name.toUpperCase().split('.').pop();

    if (type === this.fileTypes.Resume && this.docExtensions.indexOf(fileExtension) > -1) {
      this.resume = event.target.files.item(0);
      this.resumeErrors = [];
    } else if (type === this.fileTypes.Resume) {
      this.resumeErrors[0] = `Invalid file extension!`;
    }

    if (type === this.fileTypes.Portfolio && this.docExtensions.indexOf(fileExtension) > -1) {
      this.portfolio = event.target.files.item(0);
      this.portfolioErrors = [];
    } else if (type === this.fileTypes.Portfolio) {
      this.portfolioErrors[0] = `Invalid file extension!`;
    }

    if (type === this.fileTypes.Photo && this.imgExtensions.indexOf(fileExtension) > -1) {
      this.photo = event.target.files.item(0);
      this.photoErrors = [];
    } else if (type === this.fileTypes.Photo) {
      this.photoErrors[0] = `Invalid file extension!`;
    }
  }

}
