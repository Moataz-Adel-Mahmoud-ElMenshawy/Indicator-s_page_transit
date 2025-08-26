import { Routes } from '@angular/router';
import { LayoutUploadComponent } from './control/layout-upload/layout-upload.component';
import { UploadFoldersComponent } from './control/upload-folders/upload-folders.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { UpdateFilesDataComponent } from './control/update-files-data/update-files-data.component';
import { LoginComponent } from './control/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutUploadComponent,
    children: [
      {
        path: 'upload-folders',
        component: UploadFoldersComponent,
        title:'upload page'
      },
      {
        path: 'log-in-page',
        component: LoginPageComponent,
        title:'Log in'
      },
      {
        path: 'update-folders',
        component: UpdateFilesDataComponent,
        title: 'update-table'
      },
      {
        path: '', redirectTo: 'upload-folders', pathMatch: 'full'
      }
    ]
  },
  {path: 'login', component: LoginComponent, title: "Login Page"},
  {path:'**', redirectTo:'wildCard',pathMatch:'full'},
];
