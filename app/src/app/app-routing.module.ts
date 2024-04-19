import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { authGuard } from './auth.guard'; 
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'lessons', component: LessonComponent },
  { path: 'lesson/:id', component: LessonComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
