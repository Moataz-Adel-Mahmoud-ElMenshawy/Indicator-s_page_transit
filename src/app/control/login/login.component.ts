import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
    TranslateModule,
    PasswordModule,
    ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  constructor(
    private _formBuilder: FormBuilder
  ){};

  ngOnInit(): void {

    const formgroup = this._formBuilder.group({
      username: new FormControl('',[RxwebValidators.maxLength({value: 50}),
        RxwebValidators.required(),
        RxwebValidators.pattern({expression: {letters:/^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9 _@]+$/}
      })]),

      password: new FormControl('',[RxwebValidators.required(),
        RxwebValidators.password({}),
        RxwebValidators.maxLength({value:16})])
    });

  }

  ngOnDestroy(): void {

  }
}
