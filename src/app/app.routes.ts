import { Route } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { GradesComponent } from './pages/Grades/grades.component';


export const appRoutes: Route[] = [
    {
        path: "students",
        component: StudentsComponent
    },
    {
        path: "grades",
        component: GradesComponent
    }
];
