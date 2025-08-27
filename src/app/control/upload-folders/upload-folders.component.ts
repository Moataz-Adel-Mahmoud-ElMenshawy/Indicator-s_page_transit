import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,
        FormControl, FormGroup,
        FormsModule, ReactiveFormsModule,
        ValidationErrors,
        ValidatorFn} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FileUploadEvent } from 'primeng/fileupload';
import { FileUploadService } from '../../core/services/fileUpload/file-upload.service';
import { administrations, GetExcelNameForEntity } from '../../core/interfaces/upload-page';
import { HttpHeaders } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

interface pdfNames
{
    Id: number;
    Name: number;
    Description: string;
    Code: number;
    TableName: string;
    SearchByNameColumn: string;
    TableHeaders: string;
}

@Component({
  selector: 'app-upload-folders',
  standalone: true,
  imports: [DropdownModule,
            TranslateModule,
            FileUploadModule,
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './upload-folders.component.html',
  styleUrl: './upload-folders.component.css'
})
export class UploadFoldersComponent implements OnInit, OnDestroy {

  @ViewChild ('fileuploadID')fileupload!: FileUpload;

  ///Page assists
  fileForm!: FormGroup;
  uploadFile!: any;
  selectAdministration!: string;
  administrationAndCode!: administrations[];
  filesAndAdministration!:GetExcelNameForEntity[];
  filesOfAdministration!: any[];
  CodeOfSelectedAdmin!:number;

  errormessage: string = '';
  successmessage: string ='';
  file: any
  isMSG = false;
  isButtonControls = false;
  confirmationDialogPosition: string = 'bottom';


  //Table control
  headers: string[] = [];
  rows: any[] = [];

  constructor(
    private Formbuild: FormBuilder,
    private _IDSCServices: FileUploadService,
    private _ConfirmationService: ConfirmationService
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
      start_date: new FormControl('', RxwebValidators.required()),
      end_date: new FormControl({ value: '', disabled: true }, [
        RxwebValidators.required(),
        this.dateGreaterThan('start_date') // Custom validator to ensure end_date > start_date
      ]),
    });

    // Enable/disable end_date based on start_date value
    this.fileForm.get('start_date')?.valueChanges.subscribe((value) => {
      if (value) {
        this.fileForm.get('end_date')?.enable(); // Enable end_date when start_date is set
      } else {
        this.fileForm.get('end_date')?.setValue('');
        this.fileForm.get('end_date')?.disable(); // Disable end_date if start_date is empty
      }
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
  async onUpload() {
    this.isMSG =false;
    this.errormessage = '';
    this.successmessage ='';
    const adminName: any = this.fileForm.get('administration')?.value;
    const fileAdminName: any = this.fileForm.get('fileName')?.value;
    const startDate: string = this.fileForm.get('start_date')?.value;
    const endDate: string = this.fileForm.get('end_date')?.value;

    try{
      //Try and get data selected
      if(adminName && fileAdminName && startDate && endDate){
        //Body of request
        const formData = new FormData();
        formData.append('file', this.file);

        //Header of request
        console.log(adminName.Id);
        console.log(fileAdminName.Id);
        const httpHeader = new HttpHeaders({
          'entityId': adminName.Id,
          'excelId': fileAdminName.Id,
          'fromDate': startDate,
          'toDate': endDate,
        })

        //WITHOUT ANY VALIDATIONS --BACKEND REQUEST--
        this.pushFileandCodetoBackEnd(formData, httpHeader);

      }
    }catch(error: any){
      console.error("Error Message " + error);
      this.errormessage = "Error during file upload"
    }

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

    };

  };

  onSelect(event: FileUploadEvent | any){
    if(event){
      this.isMSG = false;
      this.isButtonControls = true;
      this.file = event.files[0];
    }
  }

  onCancel(){
    this._ConfirmationService.confirm({
      message:"Unselect folder",
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-text",
      accept:()=>{
        this.resetMSGandButton()
      },
      reject:()=>{

      }
    })
  }

  ShowCodeOfSelectedAdmin(data:any){
    console.log(data.value.Id)
    //repeat the data again
    this.getAdministrationFilesFrom(data.value.Id);
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

  getAdministrationFilesFrom(Id: number){
    this._IDSCServices.getApiAdminfiles(Id).subscribe({
      next:(res:any)=>{
        ///get Files from Administration
        this.filesAndAdministration = res.pdfNames;
      },
      complete:()=>{
        //get Data fromlast row
        console.log(this.filesAndAdministration);
        this.filesOfAdministration = this.filesAndAdministration.map(item => item);
      }
    })
  };

  pushFileandCodetoBackEnd(formData: FormData, headers: any){
    this._IDSCServices.postApiData(formData, headers).subscribe({
      next:()=>{
        this.isMSG = true;
        console.log("Succ")
        this.successmessage = "File upload success"
      },
      error:(error :any)=>{
        this.isMSG = true
        console.log(error.message);
        this.errormessage = "File upload failed"
      }
    })
  }

  /*
  Reset message
  */
  resetMSGandButton(){
    this.isMSG = false;
    this.isButtonControls = false;
    this.fileupload.clear();
    this.file = undefined;
  }

  ngOnDestroy(): void {

  };


}
