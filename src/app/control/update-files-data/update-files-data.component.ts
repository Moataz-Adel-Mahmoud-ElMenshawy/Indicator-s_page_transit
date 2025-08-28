import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { administrations, GetExcelNameForEntity } from '../../core/interfaces/upload-page';
import { UpdateExcelService } from '../../core/services/updateExcel/update-excel.service';
import { FileUploadService } from '../../core/services/fileUpload/file-upload.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-files-data',
  standalone: true,
  imports: [DropdownModule,
    TranslateModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule, ButtonModule],
  templateUrl: './update-files-data.component.html',
  styleUrl: './update-files-data.component.css'
})
export class UpdateFilesDataComponent implements OnInit {

  fileForm!: FormGroup;
  filesOfAdministration!: any[];
  uploadFile!: any;
  selectAdministration!: string;
  administrationAndCode!: administrations[];
  filesAndAdministration!:GetExcelNameForEntity[];
  fileDescription!: string;
  fileHeaders!:string[];
  showTable= false;
  fileRows!:any[];
  errormessage!:string;

  constructor(
    private _FormBuilder: FormBuilder,
    private _UpdateExcelService:UpdateExcelService,
    private _IDSCServices: FileUploadService
  ){};

  ngOnInit(): void {
    // Get Data
    this.getAdministrationsFromServer();

    // Form build
    this.fileForm = this._FormBuilder.group({
      administration: new FormControl('',[]),
      fileName: new FormControl('',[]),
      start_date: new FormControl('', RxwebValidators.required()),
      end_date: new FormControl({ value: '', disabled: true }, [
        RxwebValidators.required(),
        this.dateGreaterThan('start_date') // Custom validator to ensure end_date > start_date
      ]),
    });

    // Subscribe to form changes
    this.fileForm.valueChanges.subscribe(() => {
      this.checkAndFetchData();
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

  getDataFromTable(){
    const datefrom = this.fileForm.get('start_date');
    const dateto = this.fileForm.get('end_date');
    const filename = this.fileForm.get('fileName');

    if(datefrom?.valid && dateto?.valid && filename?.valid){

    }
  }

  ShowCodeOfSelectedAdmin(data:any){
    console.log(data.value.Id)
    console.log(data.value.TableName)
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
        this.filesOfAdministration = this.filesAndAdministration.map(item=>item)
      }
    })
  };

  /////

  fileHeaderCatch(data:any){
    this.filesAndAdministration.forEach((item:any)=>{
      // console.log(data.value.Description);
      // console.log(item.Description);
      // console.log(typeof data.value);
      // console.log(typeof item.Description);
      ///Loop over Items
      if(item.Name === data.value.Name){
        console.log(data.value);
        console.log(item.Name);
        ///Headers gotthem
         this.fileHeaders = JSON.parse(item.TableHeaders.trim());
      }
    })

  };

  pushFileandCodetoBackEnd(formData: FormData, headers: any){
    this._IDSCServices.postApiData(formData, headers).subscribe({
      next:()=>{
      },
      error:(error :any)=>{
      }
    })
  };

  getDataFromExcel(header:any){
    this._UpdateExcelService.getExcelData(header).subscribe({
      next:(item:any[])=>{
        const ObjRows = item;
        console.log(ObjRows)
        this.fileRows = ObjRows.map((rowObj:any)=>{
          console.log(rowObj);
          const {Id, ...rest} = rowObj;
          return Object.values(rest);
        });
        this.showTable = true
        console.log("Data Form server");
        console.log(this.fileRows);
      },
      error:(error:any)=>{
        this.resetMSGandButton();
        this.errormessage = "Data retrieve failed"
      }
    })
  };

  checkAndFetchData() {
  // Only trigger if the form is valid
    if (this.fileForm.valid) {
      this.showTable = false;
      this.fileDescription = '';
      this.errormessage = '';
      // Make sure all controls have values (not just valid)
      const hasAllValues = Object.values(this.fileForm.getRawValue()).every(v => v !== '' && v !== null);

      const adminName: any = this.fileForm.get('administration')?.value;
      const fileAdminName: any = this.fileForm.get('fileName')?.value;
      const startDate: string = this.fileForm.get('start_date')?.value;
      const endDate: string = this.fileForm.get('end_date')?.value;

      console.log(adminName.Id);
      console.log(fileAdminName.Id);
      console.log(startDate);
      console.log(endDate);

      this.fileDescription = fileAdminName.Description;

      const httpHeader = new HttpHeaders({
        'entityId': adminName.Id,
        'excelId': fileAdminName.Id,
        'fromDate': startDate,
        'toDate': endDate,
      })

      if (hasAllValues) {
        this.getDataFromExcel(httpHeader);
        this.showTable = true
      }
    }else{
      this.resetMSGandButton();
    }
  };

  resetMSGandButton(){
    this.showTable = false;
    this.fileRows = [];
    this.fileDescription = '';
  }

}
