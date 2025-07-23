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

  //Table control
  headers: string[] = [];
  rows: any[] = [];
  a7a = true;

  constructor(
    private Formbuild: FormBuilder,
  ){}

  ministryAdministrationList!: string[];
  administrationFileName!: string[];

  ngOnInit(): void {
    this.Initialize();
  }

  /*
  * On page initialization
  */
  Initialize(){

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

    this.ministryAdministrationList = ["Administration 1",
      "Administration 2",
      "Administration 3",
      "Administration 4"
    ];

    this.administrationFileName = [
      "ثالثا إيرادات قطاع النقل - إجمالى إيرادات وزارة النقل والجهات التابعة",
      "مؤشرات الدولة - وزارة النقل 9-7-2025",
      "وزارة النقل - رابعا مؤشرات النقل النهرى عنصر بيان رقم 20-21-23-25",
      "وزارة النقل - لوحة السكة الحديد ومترو الأنفاق - أولا مترو الأنفاق عنصر بيان 2 قيمة الدعم المقدم",
      "وزارة النقل - لوحة السكة الحديد ومترو الأنفاق - أولا مترو الأنفاق عنصر بيان 4 قيمة ايرادات مترو الانفاق",
      "وزارة النقل - لوحة السكة الحديد ومترو الأنفاق -أولا مترو الأنفاق عنصر بيان 1 عدد المستفيدين من الدعم المقدم",
      "وزارة النقل - لوحة السكة الحديد ومترو الأنفاق -أولا مترو الأنفاق عنصر بيان 3 عدد الركاب",
      "وزارة النقل- لوحة السكة الحديد ومترو الانفاق -ثالثاً تقييم كفاءة الخدمة - عنصر بيان رقم 23",
      "وزارة النقل -لوحة النقل البحرى",
      "وزارة النقل -لوحة النقل البرى والنهرى - أولا مؤشرات النقل البرى عنصر بيان رقم 3-4-5-12-13",
      "وزارةالنقل - ثالثا مؤشرات الطرق والكبارى - عنصر رقم 17 الطرق المرصوفة التابعة لوزارة النقل",
      "وزارةالنقل - ثانيا الإنفاق والإستثمار - عنصر رقم 5 الانفاق الحكومى",
    ];

    this.headers = ["Soluman Grundy", "Born on a Monday", "Christened on Tuesday", "Can\'t remember the rest"]
    this.rows = ["Hello", "Kitten", 18, "Wanker"]

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
  *   On file Uplaod function
  */
  onSelect(event: FileUploadEvent | any) {
    const FileName: string = event.files?.[0].name;
    const AdminiFileName: string = this.fileForm.get('fileName')?.value;


  };

  // cleanUploadFileName(filename: string){

  // }

  ngOnDestroy(): void {

  };


}
