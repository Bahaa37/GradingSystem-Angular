import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { student } from '../../students/model/student';

@Injectable()
export class GradeService {

  constructor(private httpClient: HttpClient) { }
  HostPort = 5241;
  baseUrl = 'http://localhost:' + this.HostPort;

  getAllStudentsGrades() {
    return this.httpClient.get<student[]>(this.baseUrl + '/api/student/getAll/');
  }

  updateStudentGrade(StudentId: number, SubjectId: number, Semester1: number, Semester2: number) {
    const data = { 'StudentId': StudentId, 'SubjectId': SubjectId, 'Semester1': Semester1, 'Semester2': Semester2 };

    return this.httpClient.post(this.baseUrl + '/api/Grade/EditGrade', {}, { params: data });
  }

  
}
