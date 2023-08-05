import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { student } from '../../model/student';

@Component({
  selector: 'app-view-students-grades',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './view-students-grades.component.html',
  styleUrls: ['./view-students-grades.component.scss'],
})
export class ViewStudentsGradesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: student,private matDialog:MatDialog) {
    
  }
  
  closePopUp(){
    this.matDialog.closeAll();
  }
}
