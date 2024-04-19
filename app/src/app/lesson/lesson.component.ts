import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../models/lesson';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {
  
  lessons: Lesson[] = [];
  selectedLesson: Lesson | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const lessonId = params['id'];
      if (lessonId) {
        this.fetchLesson(lessonId);
      } else {
        this.fetchLessons();
      }
    });
  }

  fetchLessons() {
    this.apiService.get<Lesson[]>('Lessons').subscribe(
      (response) => {
        this.lessons = response;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  fetchLesson(lessonId: number) {
    this.apiService.get<Lesson>(`Lessons/${lessonId}`).subscribe(
      (response) => {
        this.selectedLesson = response;
      },
      (error) => {
        console.error('Error fetching lesson:', error);
      }
    );
  }

}
