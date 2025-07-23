import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,
        FormsModule, ReactiveFormsModule,
        ValidationErrors,
        ValidatorFn} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import * as XLSX from 'xlsx';
import { FileUploadService } from '../../services/file-upload.service';
import { administrations, fileAdministration } from '../../interfaces/upload-page';

@Component({
  selector: 'app-upload-folders',
  standalone: true,
  imports: [DropdownModule, ToastModule, FileUploadModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './upload-folders.component.html',
  styleUrl: './upload-folders.component.css'
})
export class UploadFoldersComponent implements OnInit, OnDestroy {

  ///Page assists
  fileForm!: FormGroup;
  uploadFile!: any;
  selectAdministration!: string;
  administrationAndCode!: administrations[];
  filesAndAdministration!:fileAdministration[];
  filesOfAdministration!: string[];
  CodeOfSelectedAdmin!:number;

  //Table control
  headers: string[] = [];
  rows: any[] = [];
  a7a = true;

  constructor(
    private Formbuild: FormBuilder,
    private _IDSCServices: FileUploadService,
  ){}

  ngOnInit(): void {
    this.Initialize();
  }

  /*
  * On page initialization
  */
  Initialize(){

    ///Get Administration data from server
    this.getAdministrationsFromServer();

    // Form build
    this.fileForm = this.Formbuild.group({
      administration: new FormControl('',[]),
      fileName: new FormControl('',[]),
      start_date: new FormControl('', [RxwebValidators.required()]),
      end_date: new FormControl({ value: '', disabled: false }, [
        RxwebValidators.required(),
        this.dateGreaterThan('start_date') // Custom validator to ensure end_date > start_date
      ]),
    });

  };

  /*
  *  Upload folder
  */
  submitFile(){
    if(this.fileForm.valid){
      //Upload file to API
    }else{
      //Trigger Error Message
    }
  };

  /*
  *  Validation function
  */

  // Custom validator to ensure end_date is greater than start_date
  dateGreaterThan(startDateField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control?.parent?.get(startDateField)?.value;
      const endDate = control?.value;

      // Skip validation if any field is empty
      if (!startDate || !endDate) return null;

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Return error if end_date is before start_date
      return end > start ? null : { dateInvalid: "End date can't pre Start date"};
    };
  }

  /*
  *  On file Uplaod function
  */
  onSelect(event: FileUploadEvent | any) {
    const FileName: string = event.files?.[0].name;
    const AdminiFileName: string = this.fileForm.get('fileName')?.value;
  };

  ShowCodeOfSelectedAdmin(data:any){
    //repeat the data again
    this.getAdministrationFilesFrom(data.value.Code);
  };

  /*
  *  Api data functions
  */

  getAdministrationsFromServer(){
    this._IDSCServices.getApiAdministrations().subscribe({
      next:(res:any)=>{
        //get data of administration
        this.administrationAndCode = [...res];
      }
    })
  }

  getAdministrationFilesFrom(Code: number){
    this._IDSCServices.getApiAdminfiles(Code).subscribe({
      next:(res:any)=>{
        ///get Files from Administration
        this.filesAndAdministration = [...res];
      },
      complete:()=>{
        //get Data fromlast row
        this.filesOfAdministration = this.filesAndAdministration[0].UploadExcel;
      }
    })
  }
  ngOnDestroy(): void {

  };


}
