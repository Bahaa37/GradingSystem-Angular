import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { student } from '../../model/student';


@Component({
  selector: 'app-add-edit-student-popup',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './add-edit-student-popup.component.html',
  styleUrls: ['./add-edit-student-popup.component.scss'],
})
export class AddEditStudentPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: student) {
    console.log(data);
  }
  
}
