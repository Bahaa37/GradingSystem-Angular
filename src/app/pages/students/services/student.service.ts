import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { student } from '../model/student';


@Injectable()
export class StudentService {

  constructor(private httpClient: HttpClient) {  }

  HostPort = 5241;
  baseUrl = 'http://localhost:'+this.HostPort+'/api/student/getAll/';
  studentsdatagetall(){
    return this.httpClient.get<student[]>(this.baseUrl);
  }
  studentGetById(Id:number){
    return this.httpClient.get<student>(this.baseUrl+Id);
  }
  AddStudent(Name:string,NattionalId:string,AcademicYear:string){
     return this.httpClient.post<student>(this.baseUrl,{Name,NattionalId,AcademicYear});
  }
   DeleteStudent(Id:number){
    return this.httpClient.post<student>(this.baseUrl,Id);
  }
}
