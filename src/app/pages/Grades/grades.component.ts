import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeService } from './service/grade.service';
import { student } from '../students/model/student';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule,HttpClientModule, MatDialogModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  providers: [GradeService]
})
export class GradesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'academicYear', 'subjects', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public studentGradesList: student[] = [];

  constructor(private gradeService: GradeService, public dialog: MatDialog) {
    this.getAllStudentGrades();
    this.dialog.afterAllClosed.subscribe((x) => {
      this.getAllStudentGrades();
    })
  }

  getAllStudentGrades(){
    this.gradeService.getAllStudentsGrades().subscribe((students)=>{
      this.studentGradesList = students;
      this.dataSource = new MatTableDataSource(this.studentGradesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
