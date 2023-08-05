import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { student } from '../model/student';



@Injectable()
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  HostPort = 5241;
  baseUrl = 'http://localhost:' + this.HostPort + '/api/student/';

  studentsdatagetall() {
    return this.httpClient.get<student[]>(this.baseUrl + 'getAll/');
  }
  studentGetById(Id: number) {
    return this.httpClient.get<student>(this.baseUrl + 'GetStudent/' + Id);
  }
  AddStudent(Name: string, NationalId: string, AcademicYear: string) {
    const dataNew = {'Name':Name,'NationalId':NationalId,'AcademicYear':AcademicYear};
    return this.httpClient.post(this.baseUrl + 'AddStudent',{},{params:dataNew})
  }
  editStudent(Id:number,Name: string, NationalId: string, AcademicYear: string) {
    const dataNew = {'Name':Name,'NationalId':NationalId,'AcademicYear':AcademicYear};
    return this.httpClient.post(this.baseUrl + 'EditStudent/'+Id,{},{params:dataNew})
  }
  DeleteStudent(Id: number) {
    return this.httpClient.post(this.baseUrl + 'DeleteStudent/', Id);
  }
}
