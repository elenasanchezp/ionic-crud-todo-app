import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/task.interface';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  tasks: ITask[] = [];

  constructor(private service: TasksService) {}

  ngOnInit(): void {
    this.service.getTasks()?.subscribe((res: any)  => {
      console.log(res);
      this.tasks = res;
    })
  }

  onAdd(){

  }
}
