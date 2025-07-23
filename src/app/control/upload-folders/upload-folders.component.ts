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
import { HttpHeaders } from '@angular/common/http';

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
  async onSelect(event: FileUploadEvent | any) {
    const file = event.files[0]; //.[0];
    const adminiName: any = this.fileForm.get('administration')?.value;
    const fileAdminName: string = this.fileForm.get('fileName')?.value;
    const startDate: string = this.fileForm.get('start_date')?.value;
    const endDate: string = this.fileForm.get('end_date')?.value;

    // const fileBinaryString = await convertFileToBinaryString(file);

    console.log(file);
    console.log(typeof file);
    console.log(adminiName.Code);
    console.log(fileAdminName);
    console.log(startDate.toString());
    console.log(endDate.toString());

    //Body
    const formData = new FormData();
    formData.append('file', file);

    //headers
    const httpHeader = new HttpHeaders({
      'entityId': adminiName.Code.toString(),
      'fromDate': startDate,
      'toDate': endDate,
    })

    ////WITHOUT ANY VALIDATIONS --BACKEND REQUEST--
    this.pushFileandCodetoBackEnd(formData, httpHeader);

    // Functions
    function convertFileToBinaryString(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate input
    if (!file || !(file instanceof File || file instanceof Blob)) {
      reject(new Error('Invalid file: not a File or Blob object'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(reader.error || new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });

}
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
  };

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
  };

  pushFileandCodetoBackEnd(formData: FormData, headers: any){
    this._IDSCServices.postApiData(formData, headers).subscribe({
      error:()=>{
        console.log('HUGE FAIL !!!!!!!!!!!')
      },
      complete:()=>{
        console.log('HUGE SUCCESS')
      }
    })
  }
  ngOnDestroy(): void {

  };


}
