import { Component } from '@angular/core';
import { Lesson } from '../models/lesson';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  lessons: Lesson[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchLessons();
  }

  fetchLessons() {
    this.apiService.get<Lesson[]>('lessons').subscribe(
      (response) => {
        this.lessons = response;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }
}
