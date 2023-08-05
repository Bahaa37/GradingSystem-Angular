import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private httpClient: HttpClient) { }
  HostPort = 5241;

  UpdateStudententGrade(StudentId:number,SubjectId:number,Semester1:number,Semester2:number){
    return this.httpClient.post('http://localhost:'+this.HostPort+'/api/Grade/EditGrade',{StudentId,SubjectId,Semester1,Semester2});
  }
}
