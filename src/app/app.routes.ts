import { Route } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';


export const appRoutes: Route[] = [
    {
        path:"students",
        component:StudentsComponent
    }
];
