import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../Navbar/header/header.component';

@Component({
  selector: 'app-layout-upload',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './layout-upload.component.html',
  styleUrl: './layout-upload.component.css'
})
export class LayoutUploadComponent {

}
