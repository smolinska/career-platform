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
  resumeErrors: string[] = ['empty'];
  portfolioErrors: string[] = ['empty'];
  photoErrors: string[] = ['empty'];
  docExtensions: string[] = ['DOC', 'DOCX', 'PDF', 'RTF', 'TXT'];
  imgExtensions: string[] = ['JPG', 'JPEG', 'GIF', 'PNG'];
  sendMessage: string = null;
  public resume: JobApplication['resume'] = null;
  public portfolio: JobApplication['protfolio'] = null;
  public photo: JobApplication['resume'] = null;
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

    if (this.resume) {
      formData.append(this.fileTypes.Resume, this.resume);
    }

    if (this.portfolio) {
      formData.append(this.fileTypes.Portfolio, this.portfolio);
    }

    if (this.photo) {
      formData.append(this.fileTypes.Photo, this.photo);
    }

    this.service.sendJobApplication(formData).subscribe(
      () => {
        this.form.reset();
        this.sendMessage = 'Thank you for applying!';
      },
      () => {
        this.sendMessage = 'Something went wrong. Please, try again.';
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
      this.resume = null;
      this.resumeErrors[0] = `Invalid file extension!`;
    }

    if (type === this.fileTypes.Portfolio && this.docExtensions.indexOf(fileExtension) > -1) {
      this.portfolio = event.target.files.item(0);
      this.portfolioErrors = [];
    } else if (type === this.fileTypes.Portfolio) {
      this.portfolio = null;
      this.portfolioErrors[0] = `Invalid file extension!`;
    }

    if (type === this.fileTypes.Photo && this.imgExtensions.indexOf(fileExtension) > -1) {
      this.photo = event.target.files.item(0);
      this.photoErrors = [];
    } else if (type === this.fileTypes.Photo) {
      this.photo = null;
      this.photoErrors[0] = `Invalid file extension!`;
    }
  }

}
