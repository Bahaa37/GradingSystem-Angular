import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GradeService } from '../../service/grade.service';
import { grade } from '../../model/grade';

@Component({
  selector: 'app-edit-student-grade',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './edit-student-grade.component.html',
  styleUrls: ['./edit-student-grade.component.scss'],
})
export class EditStudentGradeComponent {
  editGradeForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: grade, private fb: FormBuilder, private gradeService: GradeService, private matDialog: MatDialog) {
    this.editGradeForm = this.fb.group({
      semester1: [this.data?.semester1 || '', Validators.required],
      semester2: [this.data?.semester2 || '', [Validators.required]],
    });
  }
  onSubmit() {
    const id: any = this.editGradeForm.value.id;
    const subjectId: any = this.editGradeForm.value.subjectId;
    const semster1: any = this.editGradeForm.value.semster1;
    const semster2: any = this.editGradeForm.value.semster2;
    if (this.data) {
      this.gradeService.updateStudentGrade(id, subjectId, semster1, semster2).subscribe((response: any) => {
        this.matDialog.closeAll();
      });
    }
  }
}
