import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddEditStudentPopupComponent } from './components/add-edit-student-popup/add-edit-student-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { student } from './model/student';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, AddEditStudentPopupComponent, MatDialogModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentService]

})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name','overAllGrade','academicYear','actions'];
  dataSource: MatTableDataSource<student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public studentsList: student[] = [];

  constructor(public dialog: MatDialog, private studentService: StudentService) {
    this.getAllStudents();
    this.dataSource = new MatTableDataSource(this.studentsList);
  }

  getAllStudents() {
    this.studentService.studentsdatagetall().subscribe((x) => {
      this.studentsList = x;
      console.log(this.studentsList);
      // this.studentsList = [l];
      // this.dialog.open(AddEditStudentPopupComponent, {
      //     data: this.studentsList
      // });
    })
  }

  addStudent(){
    this.dialog.open(AddEditStudentPopupComponent, {
      //     data: this.studentsList
      });
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
