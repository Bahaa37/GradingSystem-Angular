import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { student } from '../../model/student';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-edit-student-popup',
  standalone: true,
  imports: [MatDialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-student-popup.component.html',
  styleUrls: ['./add-edit-student-popup.component.scss'],
  providers: [StudentService]
})

export class AddEditStudentPopupComponent {

  AcademicYears = ['Primary 1st', 'Primary 2nd', 'Primary 3rd', 'Primary 4th', 'Primary 5th', 'Primary 6th', 'Junior High School 1st', 'Junior High School 2nd', 'Junior High School 3rd', 'Senior High School 1st', 'Senior High School 2nd', 'Senior High School 3rd'];

  addStudentForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: student, private fb: FormBuilder, private studentService: StudentService, private matDialog: MatDialog) {
    this.addStudentForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      nationalId: [this.data?.nationalId || '', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]],
      academicYear: [this.data?.academicYear || '', [Validators.required]],
    });
    this.addStudentForm.controls['academicYear'].setValue(this.data?.academicYear || '', { onlySelf: true });
  }

  onSubmit() {
    const name: any = this.addStudentForm.value.name;
    const nationalId: any = this.addStudentForm.value.nationalId;
    const academicYear: any = this.addStudentForm.value.academicYear;
    if (this.data?.id) {
      this.studentService.editStudent(this.data.id, name.toString(), nationalId.toString(), academicYear.toString()).subscribe((response: any) => {
        this.matDialog.closeAll();
      });
    }
    else {
      this.studentService.AddStudent(name.toString(), nationalId.toString(), academicYear.toString()).subscribe((response: any) => {
        this.matDialog.closeAll();
      });
    }
  }
}
