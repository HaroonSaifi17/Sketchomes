import { Component } from '@angular/core';

@Component({
  selector: 'app-project-type',
  standalone: true,
  imports: [],
  templateUrl: './project-type.component.html',
  styleUrl: './project-type.component.css',
})
export class ProjectTypeComponent {
  projects = [
    {
      title: 'Project 1',
      image: 'assets/images/project1.jpg',
      url: 'project1',
    },
    {
      title: 'Project 2',
      image: 'assets/images/project2.jpg',
      url: 'project2',
    },
    {
      title: 'Project 3',
      image: 'assets/images/project3.jpg',
      url: 'project3',
    },
    {
      title: 'Project 4',
      image: 'assets/images/project4.jpg',
      url: 'project4',
    },
    {
      title: 'Project 5',
      image: 'assets/images/project5.jpg',
      url: 'project5',
    },
    {
      title: 'Project 6',
      image: 'assets/images/project6.jpg',
      url: 'project6',
    },
    {
      title: 'Project 7',
      image: 'assets/images/project7.jpg',
      url: 'project7',
    },
  ];
}
