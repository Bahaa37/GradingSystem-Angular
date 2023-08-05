import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddEditStudentPopupComponent } from './components/add-edit-student-popup/add-edit-student-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { student } from './model/student';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewStudentsGradesComponent } from './components/viewStudentsGrades/view-students-grades.component';



@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, AddEditStudentPopupComponent, MatDialogModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, ViewStudentsGradesComponent],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentService]

})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'overAllGrade', 'academicYear', 'actions'];
  dataSource: MatTableDataSource<student> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public studentsList: student[] = [];

  constructor(public dialog: MatDialog, private studentService: StudentService) {
    this.getAllStudents();
    this.dialog.afterAllClosed.subscribe((x) => {
      this.getAllStudents();
    })
  }

  getAllStudents() {
    this.studentService.studentsdatagetall().subscribe((x) => {
      this.studentsList = x;
      this.dataSource = new MatTableDataSource(this.studentsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addStudent() {
    this.dialog.open(AddEditStudentPopupComponent, {
      //     data: this.studentsList
    });
  }

  viewGrades(student: student) {
    this.dialog.open(ViewStudentsGradesComponent, {
      data: student
    });
  }

  editStudent(student: student) {
    this.dialog.open(AddEditStudentPopupComponent, {
      data: student
    });
  }

  deleteStudent(student: student) {
    this.studentService.DeleteStudent(student.id).subscribe((x) => {
      this.getAllStudents();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
