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

@Component({
  selector: 'app-update-files-data',
  standalone: true,
  imports: [DropdownModule,
    TranslateModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './update-files-data.component.html',
  styleUrl: './update-files-data.component.css'
})
export class UpdateFilesDataComponent implements OnInit,OnDestroy {

  fileForm!: FormGroup;
  filesOfAdministration!: [];
  showTable= false;
  dataEntriesOfAgency =  [];
  constructor(
    private _FormBuilder: FormBuilder,
  ){};

  ngOnInit(): void {

    ///Form Builder
    this.fileForm = this._FormBuilder.group({
      start_date : new FormControl('',[RxwebValidators.required()]),
      end_date: new FormControl({ value: '', disabled: false }, [
        RxwebValidators.required(),
        this.dateGreaterThan('start_date') // Custom validator to ensure end_date > start_date
      ]),
      fileName : new FormControl('', [RxwebValidators.required()])
    })
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

  ngOnDestroy(): void {

  }
}
